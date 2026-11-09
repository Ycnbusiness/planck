// Planck News haftalık rapor carousel: node news/haftalik.js spec.json çıktı/
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
const S = []; let N = 0; const pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK · ${SP.week}</span><span>${SP.date} · ${SP.time}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.NEWS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const dl = d => d===null?`<span style="color:${AMB}">YENİ</span>`:d>0?`<span style="color:${BLUE}">▲ ${d}</span>`:d<0?`<span style="color:#eef1f6">▼ ${-d}</span>`:`<span style="color:${MUT}">= 0</span>`;
const R = SP.risks;
const P = [];
P.push(()=>`<div class="eb mono">Tahmin Haritası · Hafta ${SP.n}<b></b></div><h1 style="margin-top:40px;font-size:104px">Önümüzdeki 3–5 Yılda Beklenen Küresel Riskler</h1>
<p class="b" style="margin-top:40px;font-size:36px;line-height:50px">${SP.lede}</p>
<div style="margin-top:auto"><p style="margin:0;font-size:34px;color:#eef1f6">Uydurma değil. Duygusal değil.</p><p style="margin:14px 0 0;font-size:34px;color:${BLUE}">Gerçeğe en yakın olasılık.</p></div>`);
P.push(()=>`<div class="eb mono">Bu hafta ne değişti<b></b></div><h2 style="margin-top:28px;font-size:70px">9 Risk, Tek Bakışta</h2>
<div style="margin-top:36px">${R.map(r=>{const [lv,b]=band(r.p);return `<div style="display:grid;grid-template-columns:1fr 150px 110px;align-items:center;gap:18px;border-top:2px solid ${DIM};padding:17px 0"><span style="font-size:28px;line-height:34px">${r.name}</span><span style="font-family:ML,MX,monospace;font-weight:500;font-size:40px;color:${BLUE};text-align:right">%${r.p}</span><span class="mono" style="font-size:22px;text-align:right">${dl(r.d)}</span></div>`}).join('')}</div>
<p class="mono" style="margin-top:auto;font-size:18px;line-height:28px;color:${MUT}">Değişim: geçen haftaya (7 Kasım) göre puan. Ufuk: 2031.</p>`);
for (let k=0;k<R.length;k+=3) { const g=R.slice(k,k+3); P.push(()=>`<div class="eb mono">Riskler · ${k+1}–${k+g.length}<b></b></div>
<div style="margin-top:20px">${g.map(r=>{const [lv,b]=band(r.p);return `<div style="border-top:2px solid ${DIM};padding:26px 0 28px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px"><span style="font-size:38px;line-height:44px;font-weight:700">${r.name}</span><span style="font-family:ML,MX,monospace;font-weight:500;font-size:64px;line-height:1;color:${BLUE}"><small style="font-size:.45em;vertical-align:.8em;opacity:.7">%</small>${r.p}</span></div>
<div style="display:flex;align-items:center;gap:16px;margin-top:14px">${meter(lv,36,9)}<span class="mono" style="font-size:18px;color:${BLUE}">${b}</span><span class="mono" style="font-size:18px">${dl(r.d)}</span></div>
<p style="margin:14px 0 0;font-size:24px;line-height:34px;color:#c9d0db">${r.why}</p></div>`}).join('')}</div>`); }
P.push(()=>`<div class="eb mono">Haftanın sessiz sinyalleri<b></b></div><h2 style="margin-top:28px;font-size:70px">Manşete Çıkmayanlar</h2>
<p class="b" style="margin-top:20px;font-size:27px;line-height:38px;color:${MUT}">Olasılıkları eşik altında oynatan ama kayda geçen gelişmeler.</p>
<div style="margin-top:30px">${SP.quiet.map(q=>`<div style="border-top:2px solid ${DIM};padding:22px 0;font-size:29px;line-height:40px;color:#c9d0db">${q}</div>`).join('')}</div>`);
P.push(()=>`<div class="eb mono">Genel çerçeve<b></b></div><h2 style="margin-top:28px;font-size:80px">${SP.frameTitle}</h2>
<p class="b" style="margin-top:32px;font-size:34px;line-height:48px">${SP.frame}</p>
<div style="margin-top:auto"><p style="margin:0;font-size:44px;line-height:54px;font-weight:700">${SP.question}</p>
<div style="border-top:2px solid ${DIM};margin-top:36px;padding-top:30px" class="mono"><p style="margin:0;font-size:19px;line-height:30px;color:${MUT}">Her tahmin kayda geçer. İsabet etmeyen tahmin silinmez. Olasılıklar Claude'un tahminidir, kesin bilgi değildir.</p></div>
<img src="${lock}" style="height:62px;margin-top:34px"></div>`);
N = P.length; P.forEach((f,i)=>S.push(frame(f(),i+1)));
(async () => { const br = await chromium.launch(); fs.mkdirSync(OUT, { recursive: true });
  for (let i = 0; i < S.length; i++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html><head><style>${css}</style></head><body>${S[i]}</body></html>`); await p.waitForTimeout(300);
    const over = await p.evaluate(() => { const i = document.querySelector('.in'); return i.scrollHeight > i.clientHeight + 2; }); if (over) console.log('TAŞMA sayfa', i+1);
    await p.screenshot({ path: path.join(OUT, `${String(i+1).padStart(2,'0')}.jpg`), type: 'jpeg', quality: 92 }); await p.close(); }
  await br.close(); console.log('ok', S.length); })();
