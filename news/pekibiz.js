// Planck News · Peki Biz? (haftalık rapordan sonra: bilim dallarına göre etki + ne yapabiliriz): node quant/zincir.js <spec.json> <çıktı klasörü>
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
const SP = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3];
const N = SP.slides || 6, pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK · PEKİ BİZ?</span><span>${SP.date}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.NEWS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const pct = p => `<span style="font-family:ML,MX,monospace;font-weight:500">%${p}</span>`;
const item = (q, n) => { const [lv, b] = band(q.p); return `<div style="border-top:2px solid ${DIM};padding:30px 0 34px">
<div style="display:flex;justify-content:space-between;align-items:baseline;gap:24px"><p style="margin:0;font-size:34px;line-height:44px;font-weight:700">${q.q}</p>
<div style="font-family:ML,MX,monospace;font-weight:500;font-size:96px;line-height:1;letter-spacing:-.04em;color:${BLUE}"><small style="font-size:.42em;vertical-align:.95em;opacity:.7">%</small>${q.p}</div></div>
<div style="display:flex;align-items:center;gap:18px;margin-top:16px">${meter(lv,40,10)}<span class="mono" style="font-size:19px;color:${BLUE}">${b}</span><span class="mono" style="font-size:19px;color:${MUT}">${q.lab}</span></div>
<p style="margin:16px 0 0;font-size:25px;line-height:36px;color:#c9d0db">${q.why}</p></div>`; };
const S = [];
S.push(frame(`<div class="eb mono">${SP.eyebrow}<b></b></div><h1 style="margin-top:40px;font-size:100px">${SP.title}</h1>
<p class="b" style="margin-top:36px;font-size:34px;line-height:48px">${SP.lede}</p>
<div style="margin-top:auto">${SP.rings.map((r,k)=>`<div style="display:flex;justify-content:space-between;align-items:baseline;border-top:2px solid ${k?DIM:BLUE};padding:18px 0"><span class="mono" style="font-size:22px;color:${k?MUT:BLUE}">${r.name}</span><span style="font-size:30px;color:#eef1f6">${r.items.map(i=>pct(i.p)).join(' · ')}</span></div>`).join('')}</div>`, 1));
S.push(frame(`<div class="eb mono">Olay<b></b></div><h2 style="margin-top:28px">${SP.factsTitle}</h2>
<div style="margin-top:40px">${SP.facts.map(f=>`<div style="border-top:2px solid ${DIM};padding:22px 0;display:grid;grid-template-columns:230px 1fr;gap:24px"><span class="mono" style="font-size:24px;color:${BLUE}">${f[0]}</span><span style="font-size:29px;line-height:40px;color:#c9d0db">${f[1]}</span></div>`).join('')}</div>
<p class="b" style="margin-top:auto;font-size:27px;line-height:38px;color:${MUT}">${SP.factsNote}</p>`, 2));
SP.rings.forEach((r,k)=>S.push(frame(`<div class="eb mono">${r.name}<b></b></div><h2 style="margin-top:28px;font-size:66px">${r.title}</h2>
<div style="margin-top:28px">${r.items.map(item).join('')}</div>${r.note?`<p class="b" style="margin-top:auto;font-size:26px;line-height:37px;color:${MUT}">${r.note}</p>`:''}`, 3+k)));
S.push(frame(`<div class="eb mono">${SP.watchEyebrow||"İzlenecek"}<b></b></div><h2 style="margin-top:28px;font-size:66px">${SP.watchTitle}</h2>
<div style="margin-top:30px">${SP.watch.map(w=>`<div style="border-top:2px solid ${DIM};padding:22px 0;display:grid;grid-template-columns:230px 1fr;gap:24px"><span class="mono" style="font-size:24px;color:${BLUE}">${w[0]}</span><span style="font-size:29px;line-height:40px;color:#c9d0db">${w[1]}</span></div>`).join('')}</div>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:30px"><p style="margin:0;font-size:38px;line-height:48px;font-weight:700">${SP.question}</p>
<p class="mono" style="margin:18px 0 0;font-size:17px;line-height:26px;color:${MUT};letter-spacing:.04em">Her tahmin son tarihinde kapatılır ve karnede puanlanır. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`, N));
(async () => { const br = await chromium.launch(); fs.mkdirSync(OUT, { recursive: true });
  for (let i = 0; i < S.length; i++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${S[i]}</body></html>`); await p.waitForTimeout(300);
    const over = await p.evaluate(() => { const i = document.querySelector('.in'); return i.scrollHeight > i.clientHeight + 2; }); if (over) console.log('TAŞMA sayfa', i+1);
    await p.screenshot({ path: path.join(OUT, `${String(i+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log('ok', S.length); })();
