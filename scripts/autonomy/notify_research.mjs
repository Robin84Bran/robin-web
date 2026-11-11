// Reuse the existing publisher's owner-only Telegram configuration and send-once journal.
import {readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const arg=name=>process.argv[process.argv.indexOf(name)+1];
try {
  const website=resolve(arg('--website')),key=arg('--key');
  const jobs=JSON.parse(readFileSync(join(website,'autonomy/runtime/jobs.json'),'utf8')).jobs;
  const job=jobs[key],parent=jobs[job?.sourceJobId];
  if(job?.kind!=='research'||parent?.kind!=='intelligence'||parent?.status!=='COMPLETE'||!/^\/intelligence\/[a-z0-9-]+\/$/.test(job.playableRoute))throw Error('Unverified source');
  if(!parent.receipt?.routes?.includes(job.playableRoute)||parent.receipt.commit!==job.sourceCommit||!['tests','seo','mobile','githubVerify','cloudflare'].every(k=>parent.receipt.gates?.[k]===true))throw Error('Source verification mismatch');
  const config=JSON.parse(readFileSync(join(website,'daily_briefing/publisher.config.json'),'utf8'));
  const readEnv=file=>!file||!existsSync(file)?{}:Object.fromEntries(readFileSync(file,'utf8').split(/\r?\n/).flatMap(line=>{const clean=line.trim(),i=clean.indexOf('=');return !clean||clean.startsWith('#')||i<1?[]:[[clean.slice(0,i).trim(),clean.slice(i+1).trim().replace(/^(['"])(.*)\1$/,'$2')]]}));
  const env={...readEnv(config.telegramEnvFile),...readEnv(join(website,'daily_briefing/.env')),...process.env};
  if(!env.TELEGRAM_BOT_TOKEN||!env.TELEGRAM_CHAT_ID||(env.TELEGRAM_BOT_NAME??env.BOT_NAME)!==config.telegramBotName)throw Error('Authorized owner channel unavailable');
  const {sendOnce}=await import(pathToFileURL(join(website,'daily_briefing/bin/delivery-once.mjs')));
  const folder=join(website,'autonomy/runtime',createHash('sha256').update(key).digest('hex').slice(0,20));
  const message=`Your new weekly experiment is ready to play.\nhttps://iamrobin.ai${job.playableRoute}\n\nThe Research kickoff is queued. Join me to choose the deeper question, challenge the assumptions, or propose a study. No empirical study has run from this handoff.`;
  const result=await sendOnce({receiptFile:join(folder,'telegram-notice.json'),payloadHash:createHash('sha256').update(JSON.stringify([env.TELEGRAM_CHAT_ID,message])).digest('hex'),send:async()=>{
    const response=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text:message,disable_web_page_preview:false})});
    const data=await response.json();if(!response.ok||!data.ok)throw Error('Delivery unconfirmed');return {messageId:data.result?.message_id};
  }});
  console.log(JSON.stringify({status:result.status,messageId:result.messageId,reused:result.reused??false}));
} catch {console.log(JSON.stringify({status:'UNKNOWN',reason:'Owner notification unconfirmed; reconcile the private send-once receipt before retrying.'}));process.exitCode=1;}
