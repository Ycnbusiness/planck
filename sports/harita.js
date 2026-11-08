// Planck Quant görsel seti: node quant/design.js  → quant/out/
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
// Planck T+ · Hafta Sonu Haritası. Kullanım: node sports/harita.js spec.json çıktı_klasörü
// spec: {"week":12,"league":"Trendyol Süper Lig","date":"20 KASIM 2026","launch":true,
//        "matches":[{"ev":"Galatasaray","dep":"Samsunspor","when":"Cmt 20:00","p":[78,14,8],"motor":[78,14,8],"note":"..."}], "karne":null}
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUTD = process.argv[3]; fs.mkdirSync(OUTD, { recursive: true });
const Tm = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 13V60" stroke="#eef1f6" stroke-width="11" fill="none"/><rect x="8" y="6" width="48" height="10" fill="${BLUE}"/></svg>`;
const tlock = (h) => `<div style="display:flex;align-items:center;gap:${h*.3}px"><img src="${lock}" style="height:${h}px"><span style="width:2px;height:${h*.8}px;background:#3a4357"></span>${Tm(h*1.05)}</div>`;
const pages = []; const L = spec.launch ? 2 : 0; const per = 3; const mp = Math.ceil(spec.matches.length / per); const N = 1 + L + mp + 1;
const pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i, kind) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK T+ · ${kind}</span><span>${spec.date}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.SPORTS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const bar3 = (p) => `<div style="display:flex;height:16px;gap:4px;margin-top:14px">${p.map((v,k)=>`<i style="display:block;flex:${v};background:${k===1?'#3a4357':(v===Math.max(p[0],p[2])&&k!==1?BLUE:'#2c3a66')}"></i>`).join('')}</div>`;
const match = (m) => { const adj = m.motor ? m.p.map((v,k)=>v-m.motor[k]) : null;
  return `<div style="border-top:2px solid ${DIM};padding:28px 0">
  <div style="display:flex;justify-content:space-between;align-items:baseline"><span class="mono" style="font-size:19px;color:${MUT}">${m.when||''}</span>${adj&&adj.some(x=>x)?`<span class="mono" style="font-size:18px;color:${MUT}">Claude ayarı ${adj[0]>=0?'+':''}${adj[0]} / ${adj[1]>=0?'+':''}${adj[1]} / ${adj[2]>=0?'+':''}${adj[2]}</span>`:''}</div>
  <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:20px;margin-top:12px">
   <div><div style="font-size:34px;font-weight:700;line-height:1.1">${m.ev}</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:64px;line-height:1;color:${m.p[0]>=m.p[2]?BLUE:'#eef1f6'};margin-top:8px">%${m.p[0]}</div></div>
   <div style="text-align:center"><div class="mono" style="font-size:18px;color:${MUT}">Beraberlik</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:44px;line-height:1;color:${MUT};margin-top:8px">%${m.p[1]}</div></div>
   <div style="text-align:right"><div style="font-size:34px;font-weight:700;line-height:1.1">${m.dep}</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:64px;line-height:1;color:${m.p[2]>m.p[0]?BLUE:'#eef1f6'};margin-top:8px">%${m.p[2]}</div></div></div>
  ${bar3(m.p)}${m.note?`<p style="margin:14px 0 0;font-size:23px;line-height:32px;color:#c9d0db">${m.note}</p>`:''}</div>`; };
let i = 1;
pages.push(frame(`<div>${tlock(60)}</div>
<div style="margin-top:auto"><div class="eb mono">${spec.league} · ${spec.week}. hafta<b></b></div><h1 style="margin-top:28px">Hafta Sonu<br>Haritası</h1>
<p class="b" style="margin-top:32px;max-width:24ch;font-size:36px;line-height:50px">${spec.matches.length} maç, her biri için kazanma, beraberlik ve kaybetme olasılığı.</p></div>
<div style="margin-top:64px;border-top:2px solid ${DIM};padding-top:30px;display:flex;justify-content:space-between" class="mono"><span style="font-size:22px;color:${MUT}">Oyun durur, hesap başlar.</span><span style="font-size:22px;color:${MUT}">Motor + Claude</span></div>`, i++, 'HARİTA'));
if (spec.launch) {
 pages.push(frame(`<div class="eb mono">Planck T+ nedir<b></b></div><h2 style="margin-top:28px">Mola İşareti, Oyunun Durduğu ve Hesabın Yapıldığı An</h2>
 <p class="b" style="margin-top:36px">Planck T+, maçların sonucunu yorumla değil olasılıkla anlatır. Her maç için iki katmanlı bir hesap yapılır.</p>
 <div style="margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
 <div style="border:2px solid ${BLUE};padding:28px"><div class="mono" style="font-size:20px;color:${BLUE}">1 · Motor</div><p style="margin:14px 0 0;font-size:27px;line-height:38px">Takımların attığı ve yediği gollerden kurulan güç modeli, iç saha avantajı. Aynı veriyle hep aynı sonuç.</p></div>
 <div style="border:2px solid ${DIM};padding:28px"><div class="mono" style="font-size:20px;color:${MUT}">2 · Claude ayarı</div><p style="margin:14px 0 0;font-size:27px;line-height:38px">Sakatlık, ceza, teknik direktör değişikliği, rotasyon. Tek maçta en fazla ±10 puan, gerekçesiyle.</p></div></div>
 <p class="b" style="margin-top:auto;font-size:28px;line-height:40px;color:${MUT}">T, sporun evrensel mola işareti. Fizikte zamanın sembolü; Planck zamanı evrendeki en kısa anlamlı süre.</p>`, i++, 'LANSMAN'));
 pages.push(frame(`<div class="eb mono">Kırmızı çizgi<b></b></div><h2 style="margin-top:28px">Bahis Değil, Hesap</h2>
 <div style="margin-top:44px">${['Bahis oranı yayınlamıyoruz.','Bahis şirketlerinden reklam ve sponsorluk almıyoruz.','"Banko", "kupon", "kesin maç" demiyoruz.','Tutmayan tahmini silmiyoruz; her pazartesi karne yayınlıyoruz.'].map(t=>`<div style="border-top:2px solid ${DIM};padding:26px 0;font-size:34px;line-height:44px;font-weight:700">${t}</div>`).join('')}</div>
 <p class="b" style="margin-top:auto;font-size:28px;line-height:40px;color:${MUT}">Olasılık, bir sonucun ne sıklıkla gerçekleşeceğini söyler; hangisinin gerçekleşeceğini değil. %70 diyorsak, on maçın üçünü kaybetmeyi bekliyoruz.</p>`, i++, 'LANSMAN'));
}
for (let k = 0; k < mp; k++) pages.push(frame(`<div class="eb mono">Maçlar · ${k+1}/${mp}<b></b></div><div style="margin-top:20px">${spec.matches.slice(k*per,(k+1)*per).map(match).join('')}</div>`, i++, 'HARİTA'));
pages.push(frame(`<div class="eb mono">Karne<b></b></div><h2 style="margin-top:28px">Pazartesi Hesap Verilir</h2>
<p class="b" style="margin-top:32px">Hafta bitince her maç Brier skoru ile puanlanır: 0 kusursuz, 0,67 rastgele tahminin üç sonuçlu maçtaki karşılığı. Motor ve Claude ayrı puanlanır.</p>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:30px"><p style="margin:0;font-size:40px;line-height:50px;font-weight:700">${spec.question || 'Haftanın sürprizi sizce hangi maçta çıkar?'}</p>
<p class="mono" style="margin:18px 0 0;font-size:17px;line-height:26px;color:${MUT};letter-spacing:.04em">Bahis tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`, i++, 'KARNE'));
(async () => { const br = await chromium.launch();
  for (let k = 0; k < pages.length; k++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html><head><style>${css}</style></head><body>${pages[k]}</body></html>`); await p.waitForTimeout(250); await p.screenshot({ path: path.join(OUTD, `${String(k+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log(pages.length + ' sayfa'); })();
