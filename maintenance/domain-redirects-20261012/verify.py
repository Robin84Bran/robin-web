"""Read-only public redirect/DNS verification. Never disables TLS validation."""
import concurrent.futures
import datetime
import json
import pathlib
import subprocess
import sys
from urllib.parse import urlsplit

ROOT = pathlib.Path(__file__).resolve().parent
FRESH_DNS = '--fresh-dns' in sys.argv
RESOLVED = {}


def curl(*args):
    p = subprocess.run(['curl', '-sS', '--connect-timeout', '5', '--max-time', '20', *args], capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr.strip()


def redirect(url):
    expected = 'https://iamrobin.ai/' + url.split('/', 3)[3]
    host = urlsplit(url).hostname
    options = []
    if FRESH_DNS:
        address = RESOLVED.get(host)
        if not address:
            return dict(url=url, passed=False, status=None, error='Fresh public A lookup unavailable; no guessed address used')
        options = ['--resolve', f'{host}:80:{address}', '--resolve', f'{host}:443:{address}']
    code, headers, error = curl(*options, '-I', url)
    lines = headers.splitlines()
    status = next((line.split()[1] for line in lines if line.startswith('HTTP/')), None)
    location = next((line.split(':', 1)[1].strip() for line in lines if line.lower().startswith('location:')), None)
    rc, follow, follow_error = curl(*options, '-L', '-o', '/dev/null', '-w', '%{http_code}\n%{url_effective}\n%{num_redirects}\n%{ssl_verify_result}', url)
    parts = follow.splitlines()
    passed = code == 0 and status == '301' and location == expected and rc == 0 and parts == ['200', expected, '1', '0']
    return dict(url=url, expected=expected, status=status, location=location, curlExit=code, error=error, followed=parts, followExit=rc, followError=follow_error, passed=passed)


def dns(domain, kind):
    rc, data, error = curl('https://dns.google/resolve?name=' + domain + '&type=' + kind)
    try:
        result = json.loads(data)
    except ValueError:
        result = None
    return dict(domain=domain, type=kind, result=result, curlExit=rc, error=error)


if __name__ == '__main__':
    if FRESH_DNS:
        for host in ('iamrobin.net', 'www.iamrobin.net', 'iamrobin.xyz', 'www.iamrobin.xyz'):
            lookup = dns(host, 'A')
            answers = (lookup['result'] or {}).get('Answer', [])
            RESOLVED[host] = next((a['data'] for a in answers if a['type'] == 1), None)
    urls = [scheme + '://' + host + path for scheme in ('http', 'https') for host in ('iamrobin.net', 'www.iamrobin.net', 'iamrobin.xyz', 'www.iamrobin.xyz') for path in ('/', '/about/?redirect_check=20261012')]
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        redirects = list(pool.map(redirect, urls))
        futures = [pool.submit(dns, domain, kind) for domain in ('iamrobin.net', 'iamrobin.xyz', 'iamrobin.ai') for kind in ('NS', 'A', 'MX', 'TXT')]
        records = [f.result() for f in futures]
    now = datetime.datetime.now(datetime.timezone.utc)
    dns_checks = []
    for domain in ('iamrobin.net', 'iamrobin.xyz'):
        for kind, expected in [('NS', {'jerome.ns.cloudflare.com.', 'sue.ns.cloudflare.com.'}), ('MX', {'0 .'}), ('TXT', {'v=spf1 -all'})]:
            row = next(r for r in records if r['domain'] == domain and r['type'] == kind)
            answers = {a['data'].strip('"') for a in (row['result'] or {}).get('Answer', [])}
            dns_checks.append(dict(domain=domain, type=kind, expected=sorted(expected), observed=sorted(answers), passed=row['curlExit'] == 0 and answers == expected))
    receipt = dict(checkedAt=now.isoformat(), tlsVerificationDisabled=False, resolver='fresh Google DNS-over-HTTPS A addresses supplied to curl --resolve; normal hostname/certificate validation; NOT proof of local cache expiry' if FRESH_DNS else 'ordinary system DNS for HTTP checks; Google DNS-over-HTTPS for DNS evidence', resolvedAddresses=RESOLVED, passed=all(r['passed'] for r in redirects) and all(r['passed'] for r in dns_checks), redirects=redirects, dns=records, dnsChecks=dns_checks)
    output = ROOT / (('fresh-dns-' if FRESH_DNS else 'verification-') + now.strftime('%Y%m%dT%H%M%SZ') + '.json')
    output.write_text(json.dumps(receipt, indent=2) + '\n')
    print(json.dumps(dict(receipt=str(output), passed=receipt['passed'], checks=[dict(url=r['url'], passed=r['passed'], status=r['status'], error=r['error']) for r in redirects], dnsChecks=dns_checks), indent=2))
