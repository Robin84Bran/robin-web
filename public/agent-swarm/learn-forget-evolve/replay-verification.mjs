/** Exact replay diagnostics. No normalization or numerical tolerance. */
export function assertExactReplay(saved, actual) {
  if (saved === actual) return;
  const expected = JSON.parse(saved), observed = JSON.parse(actual);
  const differences = []; let count = 0, numericCount = 0, integerCount = 0, maxAbsolute = 0, maxRelative = 0;
  const integerExamples = [];
  function visit(a,b,path) {
    if (Object.is(a,b)) return;
    if (a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b)) {
      const keys = new Set([...Object.keys(a),...Object.keys(b)]);
      for (const key of keys) visit(a[key],b[key],Array.isArray(a)?`${path}[${key}]`:`${path}.${key}`);
      return;
    }
    count++; const item = {path,expected:a,actual:b};
    if (typeof a === 'number' && typeof b === 'number') {
      numericCount++; item.absoluteError=Math.abs(a-b); item.relativeError=Math.abs(a-b)/Math.max(Math.abs(a),Math.abs(b),Number.MIN_VALUE);
      maxAbsolute=Math.max(maxAbsolute,item.absoluteError); maxRelative=Math.max(maxRelative,item.relativeError);
      if (Number.isInteger(a) && Number.isInteger(b)) { integerCount++; if(integerExamples.length<6)integerExamples.push(item); }
    }
    if(differences.length<12) differences.push(item);
  }
  visit(expected,observed,'$');
  throw Error('Saved batch differs from exact replay\n'+JSON.stringify({runtime:{node:process.version,v8:process.versions.v8,icu:process.versions.icu,platform:process.platform,arch:process.arch},count,numericCount,integerCount,maxAbsolute,maxRelative,integerExamples,differences,serializationOnly:count===0},null,2));
}
