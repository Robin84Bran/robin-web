#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const live = args.includes('--live');
const valueFor = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const base = (valueFor('--base') ?? 'https://iamrobin.ai').replace(/\/$/, '');
const receiptPath = valueFor('--write-receipt');
const ledger = JSON.parse(readFileSync(new URL('../src/data/action-execution-ledger.json', import.meta.url), 'utf8'));
const flowDir = new URL('../src/data/action-flows/', import.meta.url);
const flows = readdirSync(flowDir).filter((file) => /^20\d{6}\.json$/.test(file)).sort().map((file) => JSON.parse(readFileSync(new URL(file, flowDir), 'utf8')));
const actions = flows.flatMap((flow) => flow.actions.map((action) => ({ ...action, date: flow.date, actionItemPath: flow.actionItemPath })));
const expected = { COMPLETE: 63, WATCHING: 42, BLOCKED: 4, SUPERSEDED: 18 };
const problems = [];
const ids = new Set(actions.map((action) => action.execution?.id));
const counts = actions.reduce((result, action) => {
  result[action.status] = (result[action.status] ?? 0) + 1;
  return result;
}, {});

if (actions.length !== 127 || ids.size !== 127 || ledger.actions.length !== 127) problems.push('Expected 127 unique action records in both source flows and ledger.');
if (actions.some((action) => action.status === 'READY') || ledger.actions.some((action) => action.status === 'READY')) problems.push('READY remains in the reconciled data.');
for (const [status, count] of Object.entries(expected)) {
  if (counts[status] !== count || ledger.summary.statuses[status] !== count) problems.push(`${status} count mismatch.`);
}
for (const action of actions) {
  const receipt = ledger.actions.find((item) => item.id === action.execution?.id);
  if (!receipt || receipt.status !== action.status) problems.push(`${action.execution?.id ?? 'UNKNOWN'} is missing or differs from the ledger.`);
  if (!action.execution?.artifact?.href || !action.execution?.sourceCommit?.sha || !action.execution?.verificationReceipt?.commit) problems.push(`${action.execution?.id}: artifact, commit, or receipt missing.`);
  if (action.status === 'SUPERSEDED' && (!action.execution.supersededBy || !ids.has(action.execution.supersededBy))) problems.push(`${action.execution.id}: supersession target missing.`);
  if ((action.status === 'WATCHING' || action.status === 'BLOCKED') && action.execution.evidenceStatus !== 'UNKNOWN') problems.push(`${action.execution.id}: unresolved evidence must remain UNKNOWN.`);
}
for (const date of ['20260826', '20260827', '20260828', '20260829', '20260830']) {
  if (actions.find((action) => action.execution.id === `${date}-05`)?.status !== 'COMPLETE') problems.push(`${date}-05 is not COMPLETE.`);
}
if (ledger.actions.filter((action) => action.workstream === 'AI_INFRASTRUCTURE').length !== 16) problems.push('Signal 06 coverage is not 16/16.');
const publicBytes = JSON.stringify(ledger);
for (const forbidden of ['/Users/', 'Documents/Codex', 'sourceThread', 'source_thread']) {
  if (publicBytes.includes(forbidden)) problems.push(`Public ledger contains forbidden private marker: ${forbidden}`);
}

const routeResults = [];
if (live && problems.length === 0) {
  const languageSuffixes = ['', 'zh-hans/', 'zh-hant/', 'ja/'];
  const routes = ['/ouroboros/execution-ledger/'];
  for (const flow of flows) {
    const compact = flow.date.replaceAll('-', '');
    const flowBase = `/ouroboros/${compact.slice(0, 6)}/${compact}/actions/`;
    for (const suffix of languageSuffixes) {
      routes.push(`${flowBase}${suffix}`);
      routes.push(`${flow.actionItemPath}${suffix}`);
    }
  }
  const uniqueRoutes = [...new Set(routes)];
  const worker = async (route) => {
    try {
      const response = await fetch(`${base}${route}`, { redirect: 'follow', headers: { 'user-agent': 'OuroborosBacklogVerifier/1.0' } });
      const html = await response.text();
      const canonical = `${base}${route}`;
      const canonicalPass = html.includes(canonical) && html.includes('rel="canonical"');
      const ledgerPass = route !== '/ouroboros/execution-ledger/' || (html.includes('127 actions') && html.includes('Zero READY'));
      const actionIdPass = !route.includes('/actions/') || html.includes(`${route.match(/\/(20\d{6})\/actions\//)?.[1]}-01`);
      return { route, status: response.status, finalUrl: response.url, canonicalPass, ledgerPass, actionIdPass, pass: response.status === 200 && canonicalPass && ledgerPass && actionIdPass };
    } catch (error) {
      return { route, status: null, error: error.message, pass: false };
    }
  };
  for (let index = 0; index < uniqueRoutes.length; index += 12) {
    routeResults.push(...await Promise.all(uniqueRoutes.slice(index, index + 12).map(worker)));
  }
  for (const result of routeResults.filter((item) => !item.pass)) problems.push(`Public route failed: ${result.route}`);
}

const output = {
  schemaVersion: 1,
  checkedAt: new Date().toISOString(),
  mode: live ? 'LIVE_PUBLIC' : 'LOCAL_DATA',
  base: live ? base : null,
  result: problems.length ? 'FAIL' : 'PASS',
  actions: actions.length,
  statuses: counts,
  ready: counts.READY ?? 0,
  signal05Correction: actions.filter((action) => /202608(26|27|28|29|30)-05/.test(action.execution.id)).every((action) => action.status === 'COMPLETE') ? 'PASS' : 'FAIL',
  signal06Coverage: ledger.actions.filter((action) => action.workstream === 'AI_INFRASTRUCTURE').length,
  publicRoutes: live ? { checked: routeResults.length, passed: routeResults.filter((item) => item.pass).length, results: routeResults } : null,
  problems,
};

if (receiptPath) writeFileSync(receiptPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));
if (problems.length) process.exit(1);
