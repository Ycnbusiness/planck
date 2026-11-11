const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..'); 
const b64 = f => fs.readFileSync(path.join(ROOT, 'brand', f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const mark = 'data:image/svg+xml;base64,' + b64('logos/planck-mark-reversed.svg');
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const BLUE='#6b93ff', AMB='#f2a93b', MUT='#9aa3b2', DIM='#262d3d', VOID='#0a0d13';
const band = p => p>=80?[5,'Çok yüksek']:p>=60?[4,'Yüksek']:p>=45?[3,'Orta-yüksek']:p>=25?[2,'Orta']:[1,'Düşük'];
const meter = (lv, w=44, h=12) => `<span style="display:inline-grid;grid-template-columns:repeat(5,${w}px);gap:6px">${[1,2,3,4,5].map(k=>`<i style="display:block;height:${h}px;background:${k<=lv?BLUE:DIM}"></i>`).join('')}</span>`;
const css = `${fonts}*{box-sizing:border-box}body{margin:0;background:${VOID}}
.s{width:1080px;height:1350px;background:${VOID};color:#eef1f6;font-family:AL,AX,sans-serif;position:relative;overflow:hidden}
.in{position:absolute;inset:0;padding:130px 96px 120px;display:flex;flex-direction:column}
.hud{position:absolute;inset:44px}.hud i{position:absolute;width:44px;height:44px;border:0 solid ${MUT}}
.hud i:nth-child(1){left:0;top:0;border-left-width:3px;border-top-width:3px}.hud i:nth-child(2){right:0;top:0;border-right-width:3px;border-top-width:3px}.hud i:nth-child(3){left:0;bottom:0;border-left-width:3px;border-bottom-width:3px}.hud i:nth-child(4){right:0;bottom:0;border-right-width:3px;border-bottom-width:3px}
.mono{font-family:ML,MX,monospace;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.hl,.hb{position:absolute;left:64px;right:64px;display:flex;justify-content:space-between;font-size:20px;color:${MUT}}.hl{top:64px}.hb{bottom:62px}
.scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0 2px,transparent 2px 6px)}
.eb{font-size:26px;color:${MUT};display:flex;align-items:center;gap:14px}.eb b{width:16px;height:28px;background:${BLUE}}
h1{font-size:120px;line-height:.95;font-weight:700;letter-spacing:-.04em;margin:0}
h2{font-size:76px;line-height:1;font-weight:700;letter-spacing:-.03em;margin:0;text-wrap:balance}
.b{font-size:32px;line-height:46px;color:#c9d0db;margin:0}
.ql{display:inline-flex;align-items:center;gap:22px}.ql img{height:56px}.ql span{width:2px;height:52px;background:${MUT}}.ql em{font-style:normal;font-family:AL,AX,sans-serif;font-weight:700;letter-spacing:.01em;color:#9aa3b2}`;
// Planck · Günün Dosyası: node news/dosya.js spec.json çıktı/
// spec: {date, items:[{tag, title, text, risk, from, to, pq, pp}], question}
const SP = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3];
const S = []; let N = SP.items.length + 2; const pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK · GÜNÜN DOSYASI</span><span>${SP.date}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.NEWS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const dl = (a,b) => b>a?`<span style="color:${BLUE}">▲ ${b-a}</span>`:b<a?`<span>▼ ${a-b}</span>`:`<span style="color:${MUT}">= 0</span>`;
S.push(frame(`<div class="eb mono">Günün Dosyası<b></b></div><h1 style="margin-top:40px;font-size:110px">Bugün ${SP.items.length} Gelişme</h1>
<p class="b" style="margin-top:36px;font-size:34px;line-height:48px">${SP.lede||'Günün öne çıkan gelişmeleri, olasılığa etkisi ve bize ne anlama geldiği. Her sayfada bir olay, bir cevap.'}</p>
<div style="margin-top:auto">${SP.items.map((it,k)=>`<div style="display:flex;justify-content:space-between;gap:20px;border-top:2px solid ${k?DIM:BLUE};padding:16px 0"><span style="font-size:27px;line-height:34px;color:#eef1f6">${it.title}</span><span class="mono" style="font-size:20px;white-space:nowrap;color:${MUT}">${it.tag}</span></div>`).join('')}</div>`,1));
SP.items.forEach((it,k)=>{ const [lv,b]=band(it.to); S.push(frame(`<div class="eb mono">${it.tag} · ${k+1}/${SP.items.length}<b></b></div>
<h2 style="margin-top:28px;font-size:64px;line-height:70px">${it.title}</h2>
<p class="b" style="margin-top:26px;font-size:30px;line-height:43px">${it.text}</p>
<div style="border-top:2px solid ${DIM};margin-top:34px;padding-top:26px"><span class="mono" style="font-size:20px;color:${MUT}">ETKİLENEN RİSK</span>
<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:10px"><span style="font-size:32px;font-weight:700">${it.risk}</span><span style="font-family:ML,MX,monospace;font-size:56px;color:${BLUE}">%${it.to}</span></div>
<div style="display:flex;gap:16px;align-items:center;margin-top:10px">${meter(lv,36,9)}<span class="mono" style="font-size:18px;color:${BLUE}">${b}</span><span class="mono" style="font-size:18px">%${it.from} → %${it.to} · ${dl(it.from,it.to)}</span></div></div>
${it.pq?`<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:26px"><span class="mono" style="font-size:20px;color:${BLUE}">PEKİ BİZ?</span>
<div style="display:flex;justify-content:space-between;gap:24px;align-items:baseline;margin-top:12px"><p style="margin:0;font-size:30px;line-height:40px;font-weight:700">${it.pq}</p><span style="font-family:ML,MX,monospace;font-size:64px;color:${BLUE}">%${it.pp}</span></div>
${it.pdo?`<p style="margin:14px 0 0;font-size:25px;line-height:35px;color:#c9d0db">${it.pdo}</p>`:''}</div>`
:`<div style="margin-top:auto;border-top:2px solid ${DIM};padding-top:26px"><span class="mono" style="font-size:20px;color:${MUT}">NEDEN ÖNEMLİ?</span>
${it.pdo?`<p style="margin:14px 0 0;font-size:27px;line-height:38px;color:#c9d0db">${it.pdo}</p>`:''}</div>`}</div>`,k+2)); });
S.push(frame(`<div class="eb mono">Kapanış<b></b></div><h2 style="margin-top:28px;font-size:72px">${SP.question}</h2>
<p class="mono" style="margin-top:auto;font-size:19px;line-height:30px;color:${MUT}">HER TAHMİN SON TARİHİNDE KAPATILIR VE KARNEDE PUANLANIR. OLASILIKLAR CLAUDE'UN TAHMİNİDİR, KESİN BİLGİ DEĞİLDİR.</p>
<img src="${lock}" style="height:62px;margin-top:34px">`,N));
(async () => { const br = await chromium.launch(); fs.mkdirSync(OUT, { recursive: true });
  for (let i = 0; i < S.length; i++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${S[i]}</body></html>`); await p.waitForTimeout(300);
    const over = await p.evaluate(() => { const i = document.querySelector('.in'); return i.scrollHeight > i.clientHeight + 2; }); if (over) console.log('TAŞMA sayfa', i+1);
    await p.screenshot({ path: path.join(OUT, `${String(i+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log('ok', S.length); })();
