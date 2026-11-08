const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const R=path.join(__dirname,'..','brand'); const b64=f=>fs.readFileSync(path.join(R,f)).toString('base64');
const ff=(n,f,w)=>`@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/'+f)}) format('woff2');font-weight:${w}}`;
const fonts=ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-700-normal.woff2',700);
const lock='data:image/svg+xml;base64,'+b64('logos/planck-lockup-reversed.svg');
const VOID='#0a0d13', INK='#eef1f6', BLUE='#6b93ff';
// T işareti: ħ ile aynı geometri — 9 birim kalın beyaz gövde, 7 birim cherenkov üst çubuk (mola işareti)
const T=(s)=>`<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 13V60" stroke="${INK}" stroke-width="11" fill="none"/><rect x="8" y="6" width="48" height="10" fill="${BLUE}"/></svg>`;
const avatar=`<div style="width:1080px;height:1080px;background:${VOID};display:flex;align-items:center;justify-content:center">${T(600)}</div>`;
const lockup=`<div style="width:1600px;height:400px;background:${VOID};display:flex;align-items:center;justify-content:center;gap:34px">
<img src="${lock}" style="height:120px"><span style="width:4px;height:84px;background:#3a4357;margin-top:6px"></span><span style="display:block;margin-top:6px">${T(118)}</span></div>`;
(async()=>{const b=await chromium.launch();
const shot=async(h,w,H,f)=>{const p=await b.newPage({viewport:{width:w,height:H}});await p.setContent(`<html><head><style>${fonts}body{margin:0}</style></head><body>${h}</body></html>`);await p.waitForTimeout(200);await p.screenshot({path:path.join(__dirname,'out',f)});await p.close();};
await shot(avatar,1080,1080,'planck-t-profil.png');await shot(lockup,1600,400,'planck-t-logo.png');await b.close();console.log('ok')})();
