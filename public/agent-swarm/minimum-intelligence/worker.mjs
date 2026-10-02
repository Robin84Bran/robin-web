self.onmessage=async({data})=>{try{const mod=await import(data.base+'model.mjs');self.postMessage({run:mod.simulate(data.options)});}catch(e){self.postMessage({error:e.message});}};
