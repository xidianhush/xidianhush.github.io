const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const src=html.match(/<script>([\s\S]*)<\/script>/)[1];
function el(){return{innerHTML:'',textContent:'',value:'',disabled:false,onclick:null,onchange:null,dataset:{},click(){}};}
const els={};
const document={getElementById(id){if(!els[id])els[id]=el();return els[id];},querySelectorAll(){return[];},createElement(){return el();}};
const ctx=vm.createContext({document,console,Math,JSON,parseFloat,parseInt,isNaN,isFinite});
vm.runInContext(src,ctx);
const get=n=>vm.runInContext(n,ctx);
const T=get('buildTopo("csdeg",params)');
const dev=get('makeDevice(params)');
console.log('G',T.G,'b',T.b);
let v=[0.6,0.6];
for(let it=0;it<15;it++){
  const g=T.devices.map(d=>{const w=d.B.map((row,r)=>row.reduce((s,c,j)=>s+c*v[j],0)+d.c[r]);return dev.grad(w);});
  const J=get('assembleJFull')(T,g);
  const F=get('Fval')(T,dev,v,0);
  const dv=get('solve')(J,F.map(x=>-x));
  console.log(it,'v',v.map(x=>+x.toFixed(4)),'F',F.map(x=>+x.toExponential(2)),'dv',dv&&dv.map(x=>+x.toFixed(4)));
  if(!dv)break;
  let step=1;const norm=Math.max(...dv.map(Math.abs));if(norm>0.5)step=0.5/norm;
  v=v.map((x,i)=>x+step*dv[i]);
}
