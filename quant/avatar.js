const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const R=path.join(__dirname,'..','brand'); const b64=f=>fs.readFileSync(path.join(R,f)).toString('base64');
const ff=(n,f,w)=>`@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/'+f)}) format('woff2');font-weight:${w}}`;
const fonts=ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-700-normal.woff2',700);
const mark='data:image/svg+xml;base64,'+b64('logos/planck-mark-reversed.svg');
const lock='data:image/svg+xml;base64,'+b64('logos/planck-lockup-reversed.svg');
const BLUE='#6b93ff',DIM='#2c3447',VOID='#0a0d13';
const meter=(w,h,g)=>`<div style="display:grid;grid-template-columns:repeat(5,${w}px);gap:${g}px">${[1,2,3,4,5].map(k=>`<i style="display:block;height:${h}px;background:${k<=3?BLUE:DIM}"></i>`).join('')}</div>`;
const avatar=`<div style="width:1080px;height:1080px;background:${VOID};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:64px;padding-top:20px">
<img src="${mark}" style="width:540px;height:540px">${meter(118,64,22)}</div>`;
// Lockup: QUANT, PLANCK harfleriyle aynı yükseklik ve ağırlıkta (Helvetica/Arimo Bold), ikincil gri
const lockup=`<div style="width:1600px;height:400px;background:${VOID};display:flex;align-items:center;justify-content:center;gap:34px">
<img src="${lock}" style="height:120px"><span style="width:4px;height:84px;background:#3a4357;margin-top:6px"></span>
<span style="font-family:AL,AX,sans-serif;font-weight:700;font-size:74px;line-height:1;letter-spacing:.01em;color:#9aa3b2;margin-top:8px">QUANT</span></div>`;
(async()=>{const b=await chromium.launch();
const shot=async(h,w,H,f)=>{const p=await b.newPage({viewport:{width:w,height:H}});await p.setContent(`<html><head><style>${fonts}body{margin:0}</style></head><body>${h}</body></html>`);await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,'out',f)});await p.close();};
await shot(avatar,1080,1080,'planck-quant-profil.png');await shot(lockup,1600,400,'planck-quant-logo.png');await b.close();})();
