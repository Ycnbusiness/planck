// Planck Quant · Haftalık Rapor carousel'i: node quant/rapor.js <spec.json> <çıktı klasörü>
// Veriler data/quant.json (bugün) + data/quant-history.json (7 gün önceye en yakın kayıt). Geçmiş yoksa spec.base (lansman değerleri) kullanılır.
// spec: {"range":"9–15 KASIM 2026","title":"…","baseLabel":"…","base":{id:p},"order":[[ids…],[ids…]],"groups":["…","…"],
//        "changed":[{"id","text"}],"quiet":["…"],"cal":[["tarih","olay","not"]],"closing":"…","note":"…"}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..');
const b64 = f => fs.readFileSync(path.join(ROOT, 'brand', f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const BLUE='#6b93ff', AMB='#f2a93b', MUT='#9aa3b2', DIM='#262d3d', VOID='#0a0d13';
const band = p => p>=80?[5,'Çok yüksek']:p>=60?[4,'Yüksek']:p>=45?[3,'Orta-yüksek']:p>=25?[2,'Orta']:[1,'Düşük'];
const meter = (lv, w=40, h=11) => `<span style="display:inline-grid;grid-template-columns:repeat(5,${w}px);gap:6px">${[1,2,3,4,5].map(k=>`<i style="display:block;height:${h}px;background:${k<=lv?BLUE:DIM}"></i>`).join('')}</span>`;
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;');
const AY = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
const dfmt = s => { const d = s.split('-'); return `${+d[2]} ${AY[+d[1]-1]} ${d[0]}`; };
const sg = n => n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0';

const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const Q = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/quant.json'), 'utf8'));
const H = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/quant-history.json'), 'utf8')).history || [];
const today = new Date(Q.updated.slice(0, 10)); const target = new Date(today - 7 * 864e5);
const past = H.filter(h => new Date(h.date) < today).sort((a, b) => Math.abs(new Date(a.date) - target) - Math.abs(new Date(b.date) - target))[0];
const base = id => past?.forecasts?.[id] ?? (spec.base?.[id] != null ? { p: spec.base[id], motor: null, adj: null } : null);
const F = Object.fromEntries(Q.forecasts.map(f => [f.id, f]));
const baseLabel = past ? `${dfmt(past.date)} kaydına göre` : spec.baseLabel;

const css = `${fonts}*{box-sizing:border-box}body{margin:0;background:${VOID}}
.s{width:1080px;height:1350px;background:${VOID};color:#eef1f6;font-family:AL,AX,sans-serif;position:relative;overflow:hidden}
.in{position:absolute;inset:0;padding:130px 96px 120px;display:flex;flex-direction:column}
.hud{position:absolute;inset:44px}.hud i{position:absolute;width:44px;height:44px;border:0 solid ${MUT}}
.hud i:nth-child(1){left:0;top:0;border-left-width:3px;border-top-width:3px}.hud i:nth-child(2){right:0;top:0;border-right-width:3px;border-top-width:3px}.hud i:nth-child(3){left:0;bottom:0;border-left-width:3px;border-bottom-width:3px}.hud i:nth-child(4){right:0;bottom:0;border-right-width:3px;border-bottom-width:3px}
.mono{font-family:ML,MX,monospace;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.hl,.hb{position:absolute;left:64px;right:64px;display:flex;justify-content:space-between;font-size:20px;color:${MUT}}.hl{top:64px}.hb{bottom:62px}
.scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0 2px,transparent 2px 6px)}
.eb{font-size:26px;color:${MUT};display:flex;align-items:center;gap:14px}.eb b{width:16px;height:28px;background:${BLUE}}
h1{font-size:112px;line-height:.95;font-weight:700;letter-spacing:-.04em;margin:0}
h2{font-size:68px;line-height:1.02;font-weight:700;letter-spacing:-.03em;margin:0;text-wrap:balance}
.b{font-size:30px;line-height:43px;color:#c9d0db;margin:0}
.ft{margin:auto 0 0;font-size:18px;line-height:28px;color:${MUT};letter-spacing:.04em}
.ql{display:inline-flex;align-items:center;gap:22px}.ql span{width:2px;background:${MUT}}.ql em{font-style:normal;font-weight:700;letter-spacing:.01em;color:${MUT}}`;
const S = [];
const frame = (inner, i, n) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK QUANT · HAFTALIK RAPOR</span><span>${esc(spec.range)}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.QUANT · ${String(i).padStart(2,'0')}/${String(n).padStart(2,'0')}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const qlock = h => `<div class="ql"><img src="${lock}" style="height:${h}px"><span style="height:${h*.93}px"></span><em style="font-size:${h*.62}px">QUANT</em></div>`;

const row = (f, n) => { const [lv, lab] = band(f.p); const b = base(f.id); const d = b ? f.p - b.p : null;
  return `<div style="display:grid;grid-template-columns:1fr 230px;gap:0 24px;padding:24px 0;border-top:2px solid ${DIM}">
  <div style="display:flex;flex-direction:column;gap:10px"><div class="mono" style="font-size:18px;color:${MUT}">${String(n).padStart(2,'0')} · Son tarih ${dfmt(f.deadline)}${f.impact==='Çok yüksek'?` · <span style="color:${AMB}">■ Etki: Çok yüksek</span>`:''}</div>
  <div style="font-size:33px;line-height:39px;font-weight:700;letter-spacing:-.01em">${esc(f.q)}</div>
  <div style="display:flex;align-items:center;gap:16px">${meter(lv)}<span class="mono" style="font-size:18px;color:${BLUE}">${lab}</span></div>
  <div class="mono" style="font-size:18px;color:${MUT}">Motor %${f.motor} · Claude ${sg(f.adj)} · Planck %${f.p}</div></div>
  <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:10px">
  <div style="font-family:ML,MX,monospace;font-weight:500;font-size:84px;line-height:1;color:${BLUE};letter-spacing:-.04em"><small style="font-size:.42em;vertical-align:.95em;opacity:.7;margin-right:4px">%</small>${f.p}</div>
  <div class="mono" style="font-size:19px;color:#eef1f6">Δ ${d == null ? 'YENİ' : sg(d)}${b ? ` <span style="color:${MUT}">(%${b.p})</span>` : ''}</div></div></div>`; };

const N = 4 + spec.order.length;
// 1 Kapak
const all = spec.order.flat().map(id => F[id]);
const top = spec.changed.map(c => F[c.id]);
S.push(`<div>${qlock(60)}</div>
<div style="margin-top:auto"><div class="eb mono">Haftalık Quant Raporu<b></b></div>
<h1 style="margin-top:28px">${esc(spec.title)}</h1>
<p class="b" style="margin-top:36px">${esc(spec.lede)}</p>
<div style="margin-top:48px;display:flex;flex-direction:column">${top.map(f => { const b = base(f.id); return `<div style="display:grid;grid-template-columns:1fr auto;align-items:baseline;padding:18px 0;border-top:2px solid ${DIM}"><span style="font-size:28px;font-weight:700">${esc(f.q)}</span><span class="mono" style="font-size:26px;color:${BLUE};margin-left:24px">%${b.p} → %${f.p}</span></div>`; }).join('')}</div>
<p class="mono ft" style="margin-top:36px">${all.length} tahmin · Δ: ${esc(baseLabel)} · ${esc(spec.range)}</p></div>`);
// 2.. Tahmin tablosu
let k0 = 0;
spec.order.forEach((ids, k) => { S.push(`<div class="eb mono">Tahmin tablosu · ${k+1}/${spec.order.length}<b></b></div><h2 style="margin-top:22px;font-size:56px">${esc(spec.groups[k])}</h2>
<div style="margin-top:28px">${ids.map((id, j) => row(F[id], k0 + j + 1)).join('')}</div>
<p class="mono ft">${esc(spec.tableNote)} · Yatırım tavsiyesi değildir</p>`); k0 += ids.length; });
// Ne değişti
S.push(`<div class="eb mono">Bu hafta ne değişti<b></b></div><h2 style="margin-top:22px">${esc(spec.changedTitle)}</h2>
<div style="margin-top:36px;display:flex;flex-direction:column">${spec.changed.map(c => { const f = F[c.id], b = base(c.id);
  return `<div style="padding:26px 0;border-top:2px solid ${DIM}"><div style="display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:24px"><span style="font-size:32px;line-height:38px;font-weight:700">${esc(f.q)}</span><span style="font-family:ML,MX,monospace;font-weight:500;font-size:38px;color:${BLUE};white-space:nowrap">%${b.p} → %${f.p}</span></div>
  <div class="mono" style="font-size:18px;color:${MUT};margin-top:10px">Motor %${f.motor} · Claude ${sg(f.adj)} · Δ ${sg(f.p - b.p)}</div>
  <p style="margin:12px 0 0;font-size:25px;line-height:35px;color:#c9d0db">${esc(c.text)}</p></div>`; }).join('')}</div>
<p class="mono ft">${esc(spec.note)}</p>`);
// Sessiz sinyaller + takvim
S.push(`<div class="eb mono">Sessiz sinyaller<b></b></div>
<div style="margin-top:22px;display:flex;flex-direction:column">${spec.quiet.map(q => `<div style="display:grid;grid-template-columns:28px 1fr;gap:12px;padding:11px 0;border-top:2px solid ${DIM};font-size:25px;line-height:33px;color:#c9d0db"><i style="display:block;width:14px;height:14px;background:${MUT};margin-top:11px"></i><span>${esc(q)}</span></div>`).join('')}</div>
<div class="eb mono" style="margin-top:34px">Bu hafta ve sonrası · Takvim<b></b></div>
<div style="margin-top:22px;display:flex;flex-direction:column">${spec.cal.map(([d, e, n]) => `<div style="display:grid;grid-template-columns:250px 1fr;gap:20px;padding:12px 0;border-top:2px solid ${DIM};align-items:baseline"><span class="mono" style="font-size:20px;color:${MUT}">${esc(d)}</span><span><span style="font-size:28px;font-weight:700;line-height:35px">${esc(e)}</span>${n ? `<br><span style="font-size:22px;line-height:31px;color:${MUT}">${esc(n)}</span>` : ''}</span></div>`).join('')}</div>
<p class="mono ft">Saatler TSİ · ${esc(spec.calNote)}</p>`);
// Kapanış
S.push(`<div class="eb mono">Kapanış<b></b></div><h2 style="margin-top:22px">${esc(spec.closingTitle)}</h2>
<p class="b" style="margin-top:36px">${esc(spec.closingText)}</p>
<div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:24px">${spec.method.map(([h, t], j) => `<div style="border:2px solid ${j ? DIM : BLUE};padding:28px"><div class="mono" style="font-size:20px;color:${j ? MUT : BLUE}">${esc(h)}</div><p style="margin:14px 0 0;font-size:24px;line-height:34px;color:#c9d0db">${esc(t)}</p></div>`).join('')}</div>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:32px"><p style="margin:0;font-size:42px;line-height:52px;font-weight:700">${esc(spec.closing)}</p>
<p class="mono" style="margin:28px 0 0;font-size:18px;line-height:28px;color:${MUT};letter-spacing:.04em">Yatırım tavsiyesi değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`);

(async () => { const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1080, height: 1350 } });
  for (let i = 0; i < S.length; i++) {
    await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${frame(S[i], i + 1, S.length)}</body></html>`); await p.waitForTimeout(200);
    const over = await p.evaluate(() => { const r = document.querySelector('.in'); const ft = r.lastElementChild.getBoundingClientRect(); return r.scrollHeight > r.clientHeight + 1 || ft.bottom > 1350 - 118; });
    if (over) console.warn(`UYARI: sayfa ${i + 1} taşıyor`);
    await p.screenshot({ path: path.join(OUT, `${String(i + 1).padStart(2, '0')}.png`) }); }
  await br.close(); console.log('ok', S.length); })();
