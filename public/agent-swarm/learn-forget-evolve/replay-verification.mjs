/** Strict by default. The optional portable mode admits only observed evaluation-rounding paths. */
export const EVALUATION_ROUNDING = Object.freeze({absolute:2*Number.EPSILON,relative:32*Number.EPSILON});
const evaluationMetric='(?:heldoutReward|heldoutA|heldoutB|heldoutC|heldoutReturn|retentionLoss|firstAReward|afterCReward)';
const continuousStat='(?:mean|sd|min|max|ci95\\[[01]\\])';
const evaluationPatterns=[
 new RegExp('^\\$\\.runs\\[\\d+\\]\\.arms\\[\\d+\\]\\.summary\\.'+evaluationMetric+'$'),
 new RegExp('^\\$\\.aggregates\\[\\d+\\]\\.arms\\[\\d+\\]\\.metrics\\.'+evaluationMetric+'\\.'+continuousStat+'$'),
 new RegExp('^\\$\\.aggregates\\[\\d+\\]\\.paired\\.mutationVsRandomHeldout\\.'+continuousStat+'$'),
 /^\$\.runs\[\d+\]\.lineage\.(fixed|memory|mutation|random)\[\d+\]\.(fit|gate|incumbentGate|retentionLoss)$/,
 /^\$\.runs\[\d+\]\.evaluationHistory\.(fixed|memory|mutation|random)\[\d+\]\.scores\[[0-3]\]$/
];
const evaluationPath=path=>evaluationPatterns.some(pattern=>pattern.test(path));
export function assertExactReplay(saved, actual, {portableEvaluationRounding=false}={}) {
  if (saved === actual) return {mode:'exact',tolerated:0};
  const expected=JSON.parse(saved),observed=JSON.parse(actual);
  const differences=[];let count=0,numericCount=0,integerCount=0,maxAbsolute=0,maxRelative=0,tolerated=0,maxToleratedAbsolute=0,maxToleratedRelative=0;
  const integerExamples=[];
  function mismatch(a,b,path) {
    const item={path,expected:a,actual:b};
    if(typeof a==='number'&&typeof b==='number') {
      const absoluteError=Math.abs(a-b),relativeError=absoluteError/Math.max(Math.abs(a),Math.abs(b),Number.MIN_VALUE);
      if(portableEvaluationRounding&&evaluationPath(path)&&Number.isFinite(a)&&Number.isFinite(b)&&!Number.isInteger(a)&&!Number.isInteger(b)&&absoluteError<=EVALUATION_ROUNDING.absolute&&relativeError<=EVALUATION_ROUNDING.relative) {
        tolerated++;maxToleratedAbsolute=Math.max(maxToleratedAbsolute,absoluteError);maxToleratedRelative=Math.max(maxToleratedRelative,relativeError);return;
      }
      numericCount++;item.absoluteError=absoluteError;item.relativeError=relativeError;maxAbsolute=Math.max(maxAbsolute,absoluteError);maxRelative=Math.max(maxRelative,relativeError);
      if(Number.isInteger(a)&&Number.isInteger(b)){integerCount++;if(integerExamples.length<6)integerExamples.push(item);}
    }
    count++;if(differences.length<12)differences.push(item);
  }
  function visit(a,b,path) {
    if(Object.is(a,b))return;
    if(a&&b&&typeof a==='object'&&typeof b==='object'&&Array.isArray(a)===Array.isArray(b)) {
      const ak=Object.keys(a),bk=Object.keys(b);
      if(JSON.stringify(ak)!==JSON.stringify(bk))mismatch(ak,bk,path+'{keys}');
      for(const key of new Set([...ak,...bk]))visit(a[key],b[key],Array.isArray(a)?`${path}[${key}]`:`${path}.${key}`);
      return;
    }
    mismatch(a,b,path);
  }
  visit(expected,observed,'$');
  if(count===0&&tolerated>0)return{mode:'portable evaluation rounding',tolerated,maxToleratedAbsolute,maxToleratedRelative};
  throw Error('Saved batch differs from declared replay precision\n'+JSON.stringify({runtime:{node:process.version,v8:process.versions.v8,icu:process.versions.icu,platform:process.platform,arch:process.arch},count,numericCount,integerCount,maxAbsolute,maxRelative,integerExamples,differences,tolerated,maxToleratedAbsolute,maxToleratedRelative,serializationOnly:count===0},null,2));
}
