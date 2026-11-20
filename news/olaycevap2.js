const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..'); 
const b64 = f => fs.readFileSync(path.join(ROOT, 'brand', f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const mark = 'data:image/svg+xml;base64,' + b64('logos/planck-mark-reversed.svg');
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const BLUE='#6b93ff', AMB='#f2a93b', MUT='#9aa3b2', DIM='#262d3d', VOID='#0a0d13';
const band = p => p>=80?[5,'Çok yüksek']:p>=60?[4,'Yüksek']:p>=45?[3,'Orta-yüksek']:p>=25?[2,'Orta']:[1,'Düşük'];
const grid = (p, c=14, g=4) => `<span style="display:inline-grid;grid-template-columns:repeat(10,${c}px);gap:${g}px">${Array.from({length:100},(_,k)=>`<i style="display:block;width:${c}px;height:${c}px;background:${k<p?BLUE:DIM}"></i>`).join('')}</span>`;
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
// Planck · Olay ve Cevap v2 (5 sayfa: Haber · Neden? · Ne olur? · Olasılıklar · Karne ve riskler)
// node news/olaycevap2.js spec.json çıktı/
// spec: {date, tag, haber:{title,text,kaynak}, neden:{text, taraflar:[[taraf,beyan]]},
//        neolur:[{q,p,from,deadline}], olasilik:{q,motor,ayar,ayar_neden,p,frekans,aralik},
//        karne:{konu,genel,gosterge,eylem}, question}
const SP = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3];
const N = 5, pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK · OLAY VE CEVAP</span><span>${SP.date}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.NEWS · ${pg(i)}</span><span>TARAMA VE HESAP: CLAUDE</span></div></div>`;
const lab = (t, c=MUT) => `<span class="mono" style="font-size:20px;color:${c}">${t}</span>`;
const S = [];
// 1 · Haber
S.push(frame(`<div class="eb mono">${SP.tag} · Haber<b></b></div>
<h1 style="margin-top:40px;font-size:92px;line-height:96px">${SP.haber.title}</h1>
<p class="b" style="margin-top:36px">${SP.haber.text}</p>
<div style="margin-top:auto;border-top:2px solid ${DIM};padding-top:22px">${lab('KAYNAKLAR · ' + SP.haber.kaynak)}</div>`, 1));
// 2 · Neden?
S.push(frame(`<div class="eb mono">Neden?<b></b></div>
<p class="b" style="margin-top:34px;font-size:34px;line-height:48px;color:#eef1f6">${SP.neden.text}</p>
<div style="margin-top:34px">${(SP.neden.taraflar||[]).map(t=>`<div style="border-top:2px solid ${DIM};padding:20px 0;display:grid;grid-template-columns:220px 1fr;gap:24px"><span class="mono" style="font-size:22px;color:${BLUE}">${t[0]}</span><span style="font-size:28px;line-height:39px;color:#c9d0db">${t[1]}</span></div>`).join('')}</div>
<p class="mono" style="margin-top:auto;font-size:18px;color:${MUT}">TARAFLARIN SÖYLEDİKLERİ · KENDİ CÜMLELERİMİZLE · İDDİA OLGU DEĞİLDİR</p>`, 2));
// 3 · Ne olur?
S.push(frame(`<div class="eb mono">Ne olur?<b></b></div>
<h2 style="margin-top:28px;font-size:60px;line-height:66px">Olayın kendisi değil, sonuçları</h2>
<div style="margin-top:30px">${SP.neolur.map(q=>`<div style="border-top:2px solid ${DIM};padding:24px 0;display:flex;gap:28px;align-items:center">
${grid(q.p,10,3)}<div style="flex:1"><p style="margin:0;font-size:29px;line-height:39px;font-weight:700">${q.q}</p>
<span class="mono" style="font-size:19px;display:block;margin-top:10px;color:${MUT}">SON TARİH ${q.deadline}${q.from!=null?` · %${q.from} → %${q.p}`:''}${q.not?`<br>${q.not}`:''}</span></div>
<div style="text-align:right"><span style="font-family:ML,MX,monospace;font-size:60px;color:${BLUE}">%${q.p}</span><span class="mono" style="display:block;font-size:18px">100'DE ${q.p}</span></div></div>`).join('')}</div>`, 3));
// 4 · Olasılıklar
const o = SP.olasilik;
S.push(frame(`<div class="eb mono">Olasılıklar · Bu sayı nasıl çıktı?<b></b></div>
<h2 style="margin-top:28px;font-size:52px;line-height:60px">${o.q}</h2>
<div style="margin-top:34px">
<div style="border-top:2px solid ${DIM};padding:20px 0;display:flex;justify-content:space-between;align-items:baseline">${lab('MOTOR · GEÇMİŞ VERİ VE PİYASA')}<span style="font-family:ML,MX,monospace;font-size:44px">%${o.motor}</span></div>
<div style="border-top:2px solid ${DIM};padding:20px 0"><div style="display:flex;justify-content:space-between;align-items:baseline">${lab('CLAUDE AYARI · GÜNCEL KANIT')}<span style="font-family:ML,MX,monospace;font-size:44px">${o.ayar>0?'+':''}${o.ayar}</span></div><p style="margin:10px 0 0;font-size:25px;line-height:35px;color:#c9d0db">${o.ayar_neden}</p></div>
<div style="border-top:2px solid ${BLUE};padding:20px 0;display:flex;justify-content:space-between;align-items:center">${grid(o.p,12,3)}<div style="text-align:right"><span style="font-family:ML,MX,monospace;font-size:72px;color:${BLUE}">%${o.p}</span><span class="mono" style="display:block;font-size:20px">100'DE ${o.p}${o.aralik?`<br>ÜÇ BAĞIMSIZ HESABIN ARALIĞI ${o.aralik}`:''}</span></div></div></div>
<p class="b" style="margin-top:auto;font-size:27px;line-height:38px">${o.frekans}</p>`, 4));
// 5 · Karne ve riskler
const k = SP.karne;
S.push(frame(`<div class="eb mono">Karne ve riskler<b></b></div>
<div style="margin-top:30px">
<div style="border-top:2px solid ${DIM};padding:20px 0">${lab('BU KONUDA GEÇMİŞİMİZ')}<p style="margin:10px 0 0;font-size:28px;line-height:39px;color:#c9d0db">${k.konu}</p></div>
<div style="border-top:2px solid ${DIM};padding:20px 0">${lab('GENEL KARNE')}<p style="margin:10px 0 0;font-size:28px;line-height:39px;color:#c9d0db">${k.genel}</p></div>
<div style="border-top:2px solid ${DIM};padding:20px 0">${lab('İZLENECEK GÖSTERGE')}<p style="margin:10px 0 0;font-size:28px;line-height:39px;color:#c9d0db">${k.gosterge}</p></div>
<div style="border-top:2px solid ${BLUE};padding:20px 0">${lab('NE YAPABİLİRSİN', BLUE)}<p style="margin:10px 0 0;font-size:30px;line-height:41px;font-weight:700">${k.eylem}</p></div></div>
<p class="mono" style="margin-top:auto;font-size:17px;line-height:27px;color:${MUT}">HER TAHMİN SON TARİHİNDE KAPATILIR VE KARNEDE PUANLANIR. TARAMA VE HESAP: CLAUDE (ANTHROPIC'İN YAPAY ZEKÂ MODELİ). İNSAN: KURALLARI YAZAR, İTİRAZLARI KARARA BAĞLAR. BU GÖNDERİ YAYIN ÖNCESİ İNSAN ONAYINDAN GEÇMEDİ. KİMSEDEN FON ALMIYORUZ. YATIRIM VEYA POLİTİKA TAVSİYESİ DEĞİLDİR.</p>`, 5));
(async () => { const br = await chromium.launch(); fs.mkdirSync(OUT, { recursive: true });
  for (let i = 0; i < S.length; i++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${S[i]}</body></html>`); await p.waitForTimeout(300);
    const over = await p.evaluate(() => { const i = document.querySelector('.in'); return i.scrollHeight > i.clientHeight + 2; }); if (over) console.log('TAŞMA sayfa', i+1);
    await p.screenshot({ path: path.join(OUT, `${String(i+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log('ok', S.length); })();
