import fs from 'node:fs/promises';
import path from 'node:path';
import {FileBlob, SpreadsheetFile} from '@oai/artifact-tool';
import {appendDerivatives} from './derivative-planning.mjs';

// Narrow update: import existing workbooks, retain all owner rows/manual inputs,
// and append/update only hash-keyed Special derivatives from the manifest.
const arg = name => process.argv.includes(name) ? process.argv[process.argv.indexOf(name)+1] : null;
const output = arg('--output');
if (!output || !arg('--manifest')) throw Error('Supply --output and --manifest for the existing private workbooks.');
const manifest = JSON.parse(await fs.readFile(arg('--manifest'), 'utf8'));
appendDerivatives([], manifest, '0000-01-01', '9999-12-31', 'calendar'); // common validation
const derivatives = manifest.derivatives ?? [];
if (!derivatives.length) { console.log('No derivatives; existing workbooks untouched.'); process.exit(0); }
const keyOf = value => typeof value === 'number'
  ? new Date(Date.UTC(1899,11,30) + value*86400000).toISOString().slice(0,10)
  : value instanceof Date ? `${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,'0')}-${String(value.getDate()).padStart(2,'0')}` : String(value).slice(0,10);

for (const spec of [
  {file:'Blog_Calendar.xlsx',sheet:'Plan',calendar:'Calendar',first:5,cols:9,urlCol:5,monthTops:[5,14,23,32,41],lastMonth:11},
  {file:'Ouroboros_track.xlsx',sheet:'Binary Blog Track',calendar:'Visual Calendar',first:9,cols:10,urlCol:4,monthTops:[4,14,24,34],lastMonth:10},
]) {
  const file = path.join(output,spec.file);
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = wb.worksheets.getItem(spec.sheet), cal = wb.worksheets.getItem(spec.calendar);
  const existing = sheet.getUsedRange().values;
  const originalOwnerRows = existing.slice(spec.first-1).filter(row => !derivatives.some(d => d.canonicalUrl === row[spec.urlCol]));
  const table = sheet.tables.items[0];
  for (const d of derivatives) {
    const date = new Date(`${d.date}T12:00:00`);
    if (date.getFullYear() !== 2026 || date.getMonth()<7 || date.getMonth()>spec.lastMonth) throw Error('Extend existing calendar horizon before adding this date; no silent omission.');
    const values = sheet.getUsedRange().values;
    const index = values.findIndex((r,i) => i>=spec.first-1 && r[spec.urlCol]===d.canonicalUrl);
    let row = index+1;
    if (index<0) {
      row = values.length+1;
      table.rows.add(null,[Array(spec.cols).fill(null)]);
      sheet.getRange(`A${row}:${spec.cols===9?'I':'J'}${row}`).copyFrom(sheet.getRange(`A${row-1}:${spec.cols===9?'I':'J'}${row-1}`),'all');
    }
    const live = d.status==='PUBLISHED' && d.archiveStatus==='PRESENT';
    if(spec.cols===9) {
      sheet.getRange(`A${row}:I${row}`).values=[[date,['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()],d.lane,d.title,live?'LIVE':'PLANNED',d.canonicalUrl,d.mediumUrl??null,d.linkedinUrl??null,'Additional Daily Special story; social publication not inferred']];
    } else {
      const metric=index<0?null:values[index][7];
      sheet.getRange(`A${row}:J${row}`).values=[[date,['Su','M','Tu','W','Th','F','Sa'][date.getDay()],d.lane[0]+d.lane.slice(1).toLowerCase(),d.title,d.canonicalUrl,d.mediumUrl??null,d.linkedinUrl??null,metric,null,live?'PRESENT':'PIPELINE']];
      sheet.getRange(`I${row}`).formulas=[[`=DATE(YEAR(A${row}),MONTH(A${row})+3,DAY(A${row}))`]];
      sheet.getRange(`B${row}`).dataValidation={rule:{type:'list',values:['M','Tu','W','Th','F','Sa','Su']}};
    }
    sheet.getRange(`A${row}`).format.numberFormat='yyyy-mm-dd';
  }
  const values=sheet.getUsedRange().values;
  const afterOwnerRows=values.slice(spec.first-1).filter(row=>!derivatives.some(d=>d.canonicalUrl===row[spec.urlCol]));
  if(JSON.stringify(originalOwnerRows)!==JSON.stringify(afterOwnerRows)) throw Error('Owner rows changed; refusing export');
  for(const day of new Set(derivatives.map(d=>d.date))) {
    const date=new Date(`${day}T12:00:00`), monthIndex=date.getMonth()-7;
    const first=new Date(date.getFullYear(),date.getMonth(),1);
    const week=Math.floor(((first.getDay()+6)%7+date.getDate()-1)/7);
    const row=spec.monthTops[monthIndex]+2+week;
    const col=(date.getDay()+6)%7;
    const rows=values.map((v,i)=>[v,i+1]).filter(([v,r])=>r>=spec.first&&keyOf(v[0])===day).map(([,r])=>r);
    const titleCol=spec.cols===9?'D':'D', stateCol=spec.cols===9?'E':'J';
    cal.getCell(row-1,col).formulas=[[`=${date.getDate()}`+rows.map(r=>`&CHAR(10)&UPPER('${spec.sheet}'!C${r})&" · "&'${spec.sheet}'!${titleCol}${r}&" · "&'${spec.sheet}'!${stateCol}${r}`).join('')]];
    cal.getCell(row-1,col).format.wrapText=true;
    cal.getRange(`${row}:${row}`).format.rowHeight=Math.max(spec.cols===9?78:52,rows.length*48);
  }
  if(spec.cols===10) {
    const last=values.length;
    sheet.getRange('A5').formulas=[[`=COUNTA(A9:A${last})`]];
    sheet.getRange('C5').formulas=[[`=COUNTIF(J9:J${last},"PRESENT")+COUNTIF(J9:J${last},"PIPELINE")`]];
    sheet.getRange('E5').formulas=[[`=COUNTIF(J9:J${last},"TO DO")+COUNTIF(J9:J${last},"TBD")`]];
    sheet.getRange('I5').formulas=[[`=COUNT(H9:H${last})`]];
  }
  wb.recalculate();
  const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',options:{useRegex:true,maxResults:50},summary:'derivative sync formula errors'});
  if(/#REF!|#DIV\/0!|#VALUE!|#NAME\?|#N\/A/.test(errors.ndjson)) throw Error('Formula error; refusing export');
  const preview=await wb.render({sheetName:spec.calendar,range:spec.cols===9?'A14:G21':'A14:G21',scale:1,format:'png'});
  await fs.writeFile(path.join(output,spec.file+'.derivatives.png'),new Uint8Array(await preview.arrayBuffer()));
  const backupDay=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Hong_Kong',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('-','');
  const backup=path.join(output,`autonomy-backup-${backupDay}`);
  await fs.mkdir(backup,{recursive:true});
  try {await fs.copyFile(file,path.join(backup,spec.file),1);} catch(e) {if(e.code!=='EEXIST')throw e;}
  await (await SpreadsheetFile.exportXlsx(wb)).save(file);
  console.log(JSON.stringify({file,derivatives:derivatives.length,ownerRowsPreserved:originalOwnerRows.length,errors:errors.ndjson}));
}
