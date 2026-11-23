// Planck T+ · Haftanın Karnesi. Kullanım: node sports/karne.js data/sports/karne/haftaN.json çıktı_klasörü ["TARİH"] (görsel dil: harita.js)
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
const K = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUTD = process.argv[3]; fs.mkdirSync(OUTD, { recursive: true });
const R = K.results; const GRN = '#7fd49b';
const Tm = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 13V60" stroke="#eef1f6" stroke-width="11" fill="none"/><rect x="8" y="6" width="48" height="10" fill="${BLUE}"/></svg>`;
const tlock = (h) => `<div style="display:flex;align-items:center;gap:${h*.3}px"><img src="${lock}" style="height:${h}px"><span style="width:2px;height:${h*.8}px;background:#3a4357"></span>${Tm(h*1.05)}</div>`;
const tr = x => x.toFixed(3).replace('.', ',');
const N = 3; const pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const DATE = (process.argv[4] || '23 KASIM 2026');
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK T+ · KARNE</span><span>${DATE}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.SPORTS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const pages = [];
const sur = R.en_buyuk_surpriz;
pages.push(frame(`<div>${tlock(60)}</div>
<div style="margin-top:auto"><div class="eb mono">${K.hafta}. hafta · ${R.mac_sayisi} maç<b></b></div><h1 style="margin-top:28px">${K.hafta}. Hafta<br>Karnesi</h1>
<p class="b" style="margin-top:32px;max-width:26ch;font-size:36px;line-height:50px">Cuma günü verilen olasılıklar, hafta sonunun gerçek sonuçlarıyla yan yana.</p></div>
<div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 <div style="border:2px solid ${BLUE};padding:26px"><div class="mono" style="font-size:19px;color:${BLUE}">Ortalama Brier · Planck</div><div style="font-family:ML,MX,monospace;font-size:72px;margin-top:10px">${tr(R.ort_brier_planck)}</div></div>
 <div style="border:2px solid ${DIM};padding:26px"><div class="mono" style="font-size:19px;color:${MUT}">Ortalama Brier · Motor</div><div style="font-family:ML,MX,monospace;font-size:72px;margin-top:10px">${tr(R.ort_brier_motor)}</div></div></div>
<p class="mono" style="margin:22px 0 0;font-size:19px;color:${MUT};letter-spacing:.04em">0 kusursuz · 0,667 her sonuca %33 · düşük olan daha isabetli</p>`, 1));
const LB = ['ev','beraberlik','deplasman'];
const row = m => { const done = m.sonuc; const i = done ? LB.indexOf(m.gerceklesen) : -1;
 const cell = (v,k) => `<span style="font-family:ML,MX,monospace;font-size:24px;color:${k===i?'#eef1f6':'#5b6478'};${k===i?`border-bottom:3px solid ${v<25?AMB:BLUE}`:''}">%${v}</span>`;
 return `<div style="display:grid;grid-template-columns:1fr 210px 120px;align-items:center;gap:14px;border-top:2px solid ${DIM};padding:9px 0">
 <div style="font-size:23px;line-height:1.15"><span style="font-weight:700">${m.ev}</span> <span style="font-family:ML,MX,monospace;color:${done?'#eef1f6':MUT}">${done?m.sonuc.join('–'):'–'}</span> <span style="font-weight:700">${m.dep}</span><div class="mono" style="font-size:13px;color:${MUT};margin-top:2px">${m.lig}</div></div>
 <div style="display:flex;gap:16px;justify-content:flex-end">${m.planck.map(cell).join('')}</div>
 <div style="text-align:right;font-family:ML,MX,monospace;font-size:24px;color:${done?(m.brier_planck>0.667?AMB:'#eef1f6'):MUT}">${done?tr(m.brier_planck):'bekliyor'}</div></div>`; };
pages.push(frame(`<div class="eb mono">Maç maç · Planck olasılığı<b></b></div>
<div style="display:grid;grid-template-columns:1fr 210px 120px;gap:14px;margin-top:18px" class="mono"><span style="font-size:15px;color:${MUT}">Maç · skor</span><span style="font-size:15px;color:${MUT};text-align:right">Ev / Ber / Dep</span><span style="font-size:15px;color:${MUT};text-align:right">Brier</span></div>
<div style="margin-top:6px">${K.maclar.filter(m=>m.sonuc).map(row).join('')}</div>
<p class="mono" style="margin:14px 0 0;font-size:15px;line-height:22px;color:${MUT};letter-spacing:.03em">Altı çizili: gerçekleşen sonuca verilen olasılık. Turuncu: %25 altı ya da Brier 0,667 üstü.${K.maclar.some(m=>!m.sonuc)?' Sonucu bekleyen: '+K.maclar.filter(m=>!m.sonuc).map(m=>m.ev+'–'+m.dep).join(', ')+' (sonraki karneye eklenir).':''}</p>`, 2));
const verdict = R.ort_brier_planck < R.ort_brier_motor ? ['Bu hafta zekâ kazandı.', `Claude ayarı ortalama Brier'i ${tr(R.ort_brier_motor - R.ort_brier_planck)} düşürdü.`] : ['Bu hafta hesap kazandı.', `Claude ayarları ortalama Brier'i ${tr(R.ort_brier_planck - R.ort_brier_motor)} yükseltti; ham motor daha isabetliydi.`];
const cmp = (ad, o) => `<div style="display:grid;grid-template-columns:1fr 150px 150px;border-top:2px solid ${DIM};padding:18px 0;font-size:27px"><span>${ad} <span class="mono" style="font-size:16px;color:${MUT}">${o.mac} maç</span></span><span style="text-align:right;font-family:ML,MX,monospace;color:${o.motor<=o.planck?GRN:'#eef1f6'}">${tr(o.motor)}</span><span style="text-align:right;font-family:ML,MX,monospace;color:${o.planck<o.motor?GRN:'#eef1f6'}">${tr(o.planck)}</span></div>`;
pages.push(frame(`<div class="eb mono">Hesap özeti<b></b></div><h2 style="margin-top:24px">Bu Hafta Zekâ mı Kazandı, Hesap mı?</h2>
<div style="margin-top:30px"><div style="display:grid;grid-template-columns:1fr 150px 150px" class="mono"><span></span><span style="text-align:right;font-size:17px;color:${MUT}">Motor</span><span style="text-align:right;font-size:17px;color:${MUT}">Planck</span></div>
${cmp('Süper Lig', R.superlig)}${cmp('Avrupa', R.avrupa)}${cmp('Beraberlikler', R.beraberlik)}${cmp('Toplam', {mac:R.mac_sayisi, motor:R.ort_brier_motor, planck:R.ort_brier_planck})}</div>
<div style="margin-top:30px;border-left:6px solid ${AMB};padding-left:22px"><div class="mono" style="font-size:17px;color:${AMB}">En büyük sürpriz</div><p style="margin:8px 0 0;font-size:28px;line-height:38px">${sur.mac} ${sur.skor.join('–')}: gerçekleşen sonuca %${sur.p_planck} verilmişti.</p></div>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:26px"><p style="margin:0;font-size:40px;line-height:48px;font-weight:700">${verdict[0]}</p><p class="b" style="margin-top:10px;font-size:26px;line-height:36px">${verdict[1]}</p>
<p class="mono" style="margin:16px 0 0;font-size:16px;line-height:24px;color:${MUT};letter-spacing:.04em">Bahis tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`, 3));
(async () => { const br = await chromium.launch();
  for (let k = 0; k < pages.length; k++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${pages[k]}</body></html>`); await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUTD, `${String(k+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log(pages.length + ' sayfa'); })();
