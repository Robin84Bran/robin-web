/** Strict by default. The optional portable mode admits only observed forecast-rounding paths. */
export const FORECAST_ROUNDING = Object.freeze({absolute:Number.EPSILON/2,relative:8*Number.EPSILON});
const forecastPath = path => /^\$\.runs\[\d+\]\.arms\[\d+\]\.summary\.(brier|forecastRMSE|calibrationError)$/.test(path)
  || /^\$\.aggregates\[\d+\]\.arms\[\d+\]\.metrics\.(brier|forecastRMSE|calibrationError)\.(mean|sd|min|max|ci95\[[01]\])$/.test(path)
  || /^\$\.aggregates\[\d+\]\.paired\.sourceVsEchoBrier\.(mean|sd|min|max|ci95\[[01]\])$/.test(path);
export function assertExactReplay(saved, actual, {portableForecastRounding=false}={}) {
  if (saved === actual) return {mode:'exact',tolerated:0};
  const expected=JSON.parse(saved),observed=JSON.parse(actual);
  const differences=[];let count=0,numericCount=0,integerCount=0,maxAbsolute=0,maxRelative=0,tolerated=0,maxToleratedAbsolute=0,maxToleratedRelative=0;
  const integerExamples=[];
  function mismatch(a,b,path) {
    const item={path,expected:a,actual:b};
    if(typeof a==='number'&&typeof b==='number') {
      const absoluteError=Math.abs(a-b),relativeError=absoluteError/Math.max(Math.abs(a),Math.abs(b),Number.MIN_VALUE);
      if(portableForecastRounding&&forecastPath(path)&&Number.isFinite(a)&&Number.isFinite(b)&&!Number.isInteger(a)&&!Number.isInteger(b)&&absoluteError<=FORECAST_ROUNDING.absolute&&relativeError<=FORECAST_ROUNDING.relative) {
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
  if(count===0&&tolerated>0)return{mode:'portable forecast rounding',tolerated,maxToleratedAbsolute,maxToleratedRelative};
  throw Error('Saved batch differs from declared replay precision\n'+JSON.stringify({runtime:{node:process.version,v8:process.versions.v8,icu:process.versions.icu,platform:process.platform,arch:process.arch},count,numericCount,integerCount,maxAbsolute,maxRelative,integerExamples,differences,tolerated,maxToleratedAbsolute,maxToleratedRelative,serializationOnly:count===0},null,2));
}
