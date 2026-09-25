import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root='src/content/binary-stories';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const scalar=(s,k)=>{const v=s.match(new RegExp('^'+k+':\\s*(.+)$','m'))?.[1]?.trim();return v?.replace(/^['"]|['"]$/g,'');};
const assert=(ok,message)=>{if(!ok)throw Error(message);};
const hashes=new Set();let checked=0;
for(const folder of readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory())){
 const dir=join(root,folder.name),en=readFileSync(join(dir,'article.md'),'utf8');
 if(scalar(en,'draft')==='true')continue;
 const sourceHash=scalar(en,'sourceArtifactSha256');
 assert(!hashes.has(sourceHash),`${folder.name}: duplicate source Special`);hashes.add(sourceHash);
 const src=new URL(scalar(en,'sourceSpecial'));
 assert(src.origin==='https://iamrobin.ai',`${folder.name}: source must be the canonical site`);
 const match=src.pathname.match(/^\/ouroboros\/\d{6}\/(\d{8})\/special\/(?:([a-z0-9-]+)\/)?$/);
 assert(match,`${folder.name}: source must be a published English Special`);
 const artifact=join('public/daily-special',match[1],match[2]??'','artifact.md');
 assert(existsSync(artifact)&&sha(readFileSync(artifact))===sourceHash,`${folder.name}: source artifact hash mismatch`);
 const slug=scalar(en,'storySlug'),pdf=scalar(en,'carouselPdf'),caption=scalar(en,'carouselCaption');
 assert(/^\/carousels\/[a-z0-9-]+\.pdf$/.test(pdf),`${folder.name}: unsafe PDF path`);
 assert(/^\/carousels\/[a-z0-9-]+\.txt$/.test(caption),`${folder.name}: unsafe caption path`);
 const bytes=readFileSync(join('public',pdf));
 assert(bytes.subarray(0,5).toString()==='%PDF-',`${folder.name}: PDF signature missing`);
 const pages=[...bytes.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length;
 assert(pages>=6&&pages<=12&&pages===Number(scalar(en,'carouselPages')),`${folder.name}: actual PDF page count mismatch`);
 assert(readFileSync(join('public',caption),'utf8').trim().length>50,`${folder.name}: empty caption`);
 const bodies=[];
 for(const [file,locale,suffix] of [['article.md','en',''],['zh-hans.md','zh-Hans','zh-hans/'],['zh-hant.md','zh-Hant','zh-hant/'],['ja.md','ja','ja/']]){
  const text=readFileSync(join(dir,file),'utf8');
  assert(scalar(text,'inLanguage')===locale&&scalar(text,'translationReview')==='PASS',`${folder.name}/${file}: language/review missing`);
  assert(scalar(text,'storySlug')===slug&&scalar(text,'canonical')===`https://iamrobin.ai/binary/stories/${slug}/${suffix}`,`${folder.name}/${file}: canonical mismatch`);
  for(const key of ['lane','sourceSpecial','sourceArtifactSha256','carouselPdf','carouselCaption','carouselPages'])assert(scalar(text,key)===scalar(en,key),`${folder.name}/${file}: ${key} drift`);
  const body=text.split(/^---\s*$/m).slice(2).join('---').trim();assert(body.length>300,`${folder.name}/${file}: empty story`);bodies.push(body);
 }
 assert(new Set(bodies).size===4,`${folder.name}: duplicated language bodies`);checked++;
}
console.log(`Binary stories: ${checked} four-language stories, pinned Special sources, real 6–12-page PDFs and captions checked.`);
