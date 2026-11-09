// Planck Quant görsel seti: node quant/design.js  → quant/out/
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..'); const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
const b64 = f => fs.readFileSync(path.join(ROOT, 'brand', f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const mark = 'data:image/svg+xml;base64,' + b64('logos/planck-mark-reversed.svg');
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const BLUE='#6b93ff', AMB='#f2a93b', MUT='#9aa3b2', DIM='#262d3d', VOID='#0a0d13';
const Q = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/quant.json'), 'utf8'));
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
const N = 6, pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i, kind='LANSMAN') => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK QUANT · ${kind}</span><span>8 KASIM 2026</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.QUANT · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const qlock = (h=56) => `<div class="ql"><img src="${lock}" style="height:${h}px"><span style="height:${h*.93}px"></span><em style="font-size:${h*.62}px">QUANT</em></div>`;
const row = (f, n) => { const [lv, lab] = band(f.p); const dl = f.deadline.split('-'); const ay=['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][+dl[1]-1];
  return `<div style="display:grid;grid-template-columns:1fr auto;gap:10px 28px;padding:30px 0;border-top:2px solid ${DIM}">
  <div style="display:flex;flex-direction:column;gap:12px"><div class="mono" style="font-size:19px;color:${MUT}">${String(n).padStart(2,'0')} · Son tarih ${+dl[2]} ${ay} ${dl[0]}${f.impact==='Çok yüksek'?` · <span style="color:${AMB}">■ Etki: Çok yüksek</span>`:''}</div>
  <div style="font-size:36px;line-height:42px;font-weight:700;letter-spacing:-.01em">${f.q}</div>
  <div style="display:flex;align-items:center;gap:16px">${meter(lv)}<span class="mono" style="font-size:19px;color:${BLUE}">${lab}</span></div></div>
  <div style="font-family:ML,MX,monospace;font-weight:500;font-size:92px;line-height:1;color:${BLUE};letter-spacing:-.04em;align-self:center"><small style="font-size:.42em;vertical-align:.95em;opacity:.7;margin-right:4px">%</small>${f.p}</div></div>`; };
const F = Q.forecasts, S = [];
// 1 Kapak
S.push(frame(`<div>${qlock(64)}</div>
<div style="margin-top:auto"><div class="eb mono">Yeni kanal<b></b></div><h1 style="margin-top:28px">Yorum Değil,<br>Hesap.</h1>
<p class="b" style="margin-top:36px;max-width:22ch;font-size:38px;line-height:52px">Piyasayı ilgilendiren olayların gerçekleşme ihtimali. Her hafta, puanlanarak.</p></div>
<div style="margin-top:72px;display:flex;align-items:flex-end;justify-content:space-between;border-top:2px solid ${DIM};padding-top:32px">
<div class="mono" style="font-size:22px;line-height:34px;color:${MUT}">TCMB · Fed · Enflasyon<br>Kur · Petrol · Altın · Endeksler</div>${meter(3,56,16)}</div>`, 1));
// 2 Ne yapar ne yapmaz
const yy = [['TCMB Aralık\'ta faiz indirir mi? %60','Faiz inecek, tahvil alın'],['Brent 6 ayda 110$ görür mü? %25','Petrol 110 olacak'],['Endeks, kur, emtia, makro veri','Tek hisse için hedef fiyat'],['Yanılan tahmin de yayınlanır','"Kaçırmayın", "fırsat"']];
S.push(frame(`<div class="eb mono">Yöntem<b></b></div><h2 style="margin-top:28px">Yön Söylemiyoruz. İhtimal Ölçüyoruz.</h2>
<div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:0 28px">
<div class="mono" style="font-size:22px;color:${BLUE};padding-bottom:18px">Planck Quant</div><div class="mono" style="font-size:22px;color:${MUT};padding-bottom:18px">Yapmadığımız</div>
${yy.map(([a,b])=>`<div style="border-top:2px solid ${BLUE};padding:24px 0;font-size:30px;line-height:40px;font-weight:700">${a}</div><div style="border-top:2px solid ${DIM};padding:24px 0;font-size:30px;line-height:40px;color:${MUT};text-decoration:line-through;text-decoration-color:${DIM}">${b}</div>`).join('')}</div>
<p class="b" style="margin-top:auto;font-size:28px;line-height:40px;color:${MUT}">Her tahmin evet/hayır ile sonuçlanan, son tarihi olan bir sorudur. Kişisel yatırım tavsiyesi verilmez.</p>`, 2));
// 3–4 Tahmin tablosu
[[0,4],[4,8]].forEach(([a,b],k)=>S.push(frame(`<div class="eb mono">Tahmin haritası · ${k+1}/2<b></b></div><h2 style="margin-top:28px;font-size:64px">${k?'Küresel Piyasalar':'Türkiye ve Fed'}</h2>
<div style="margin-top:40px">${F.slice(a,b).map((f,j)=>row(f,a+j+1)).join('')}</div><p class="mono" style="margin:auto 0 0;font-size:18px;line-height:28px;color:${MUT};letter-spacing:.04em">Veri: 6 Kasım 2026 kapanışları · Ufuk her soruda ayrı · Yatırım tavsiyesi değildir</p>`, 3+k)));
// 5 Karne
const ticks = [0,.05,.1,.15,.2,.25];
S.push(frame(`<div class="eb mono">Karne<b></b></div><h2 style="margin-top:28px">Her Tahmin Puanlanır. Yanılan Silinmez.</h2>
<p class="b" style="margin-top:36px">Son tarihi gelen her tahmin kapatılır ve Brier skoru ile ölçülür. Skor ne kadar düşükse tahmin o kadar isabetlidir. Karne her ayın ilk pazartesi yayınlanır.</p>
<div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
<div style="border:2px solid ${BLUE};padding:28px"><div class="mono" style="font-size:20px;color:${BLUE}">%80 dedik · Oldu</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:72px;margin-top:14px">0,04</div><div class="mono" style="font-size:18px;color:${MUT};margin-top:8px">(0,80 − 1)²</div></div>
<div style="border:2px solid ${DIM};padding:28px"><div class="mono" style="font-size:20px;color:${MUT}">%80 dedik · Olmadı</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:72px;margin-top:14px;color:${MUT}">0,64</div><div class="mono" style="font-size:18px;color:${MUT};margin-top:8px">(0,80 − 0)²</div></div></div>
<div style="margin-top:auto">
<div style="position:relative;height:28px;background:linear-gradient(90deg,${BLUE} 0 40%,${DIM} 40%)"></div>
<div style="display:flex;justify-content:space-between;margin-top:16px" class="mono">${ticks.map(t=>`<span style="font-size:20px;color:${MUT}">${t.toFixed(2).replace('.',',')}</span>`).join('')}</div>
<div style="display:flex;justify-content:space-between;margin-top:28px;font-size:26px;line-height:36px"><span><b>0,00</b><br><span style="color:${MUT}">Kusursuz</span></span><span style="text-align:center"><b style="color:${BLUE}">&lt; 0,10</b><br><span style="color:${MUT}">Quant hedefi</span></span><span style="text-align:right"><b>0,25</b><br><span style="color:${MUT}">Yazı-tura</span></span></div>
<div class="mono" style="margin-top:48px;font-size:22px;color:${MUT}">Açık tahmin: 8 · Kapanan: 0 · İlk karne: 7 Aralık 2026</div></div>`, 5));
// 6 Kapanış
S.push(frame(`<div class="eb mono">Takvim<b></b></div><h2 style="margin-top:28px">Veri Gelmeden Önce Olasılık, Geldikten Sonra Hesap.</h2>
<div style="margin-top:48px;display:flex;flex-direction:column">${[['Her iş günü 09:00','Açılış Sinyali'],['Kritik veriden 1 gün önce','Önizleme'],['Veri açıklanınca','Sonuç: Tuttu mu?'],['Pazartesi','Haftalık Quant Raporu'],['Ayın ilk pazartesi','Quant Karnesi']].map(([a,b])=>`<div style="display:grid;grid-template-columns:400px 1fr;padding:22px 0;border-top:2px solid ${DIM};align-items:baseline"><span class="mono" style="font-size:22px;color:${MUT}">${a}</span><span style="font-size:32px;font-weight:700">${b}</span></div>`).join('')}</div>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:32px"><p style="margin:0;font-size:40px;line-height:50px;font-weight:700">Sizce TCMB Aralık'ta faiz indirir mi?</p>
<p class="mono" style="margin:20px 0 0;font-size:18px;line-height:28px;color:${MUT};letter-spacing:.04em">Yatırım tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`, 6));
const avatar = `<div style="width:1080px;height:1080px;background:${VOID};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:56px">
<img src="${mark}" style="width:440px;height:440px"><em class="mono" style="font-style:normal;font-size:96px;letter-spacing:.2em;margin-right:-.2em;color:#eef1f6">QUANT</em></div>`;
const lockup = `<div style="width:1600px;height:400px;background:${VOID};display:flex;align-items:center;justify-content:center">${qlock(120)}</div>`;
(async () => { const br = await chromium.launch();
  const shot = async (html, w, h, file) => { const p = await br.newPage({ viewport: { width: w, height: h } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${html}</body></html>`); await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUT, file) }); await p.close(); };
    for (let i = 0; i < S.length; i++) await shot(S[i], 1080, 1350, `lansman-${String(i+1).padStart(2,'0')}.png`);
  await br.close(); console.log('ok'); })();
