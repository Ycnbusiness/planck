// Planck sinyal / flaş kartı. Kullanım: node scripts/card.js spec.json çıktı.png
// spec: {"type":"sinyal|flas","date":"8 KASIM 2026","time":"08:30","eyebrow":"Enerji","headline":"…",
//        "risk":"Kalıcı Enerji ve Lojistik Maliyetleri","from":71,"to":75,"impact":"Yüksek","why":"…","source":"Reuters, AP"}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const R = path.join(__dirname, '..', 'brand');
const b64 = f => fs.readFileSync(path.join(R, f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL', 'arimo-latin-400-normal.woff2', 400) + ff('AL', 'arimo-latin-700-normal.woff2', 700) + ff('AX', 'arimo-latin-ext-400-normal.woff2', 400) + ff('AX', 'arimo-latin-ext-700-normal.woff2', 700) + ff('ML', 'ibm-plex-mono-latin-500-normal.woff2', 500) + ff('MX', 'ibm-plex-mono-latin-ext-500-normal.woff2', 500);
const BLUE = '#6b93ff', AMB = '#f2a93b', MUT = '#9aa3b2', DIM = '#262d3d';
const band = p => p >= 80 ? [5, 'Çok yüksek'] : p >= 60 ? [4, 'Yüksek'] : p >= 45 ? [3, 'Orta-yüksek'] : p >= 25 ? [2, 'Orta'] : [1, 'Düşük'];
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const s = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const out = process.argv[3] || 'card.png';
const flas = s.type === 'flas'; const QT = s.brand === 'quant';
const d = (s.to ?? 0) - (s.from ?? 0); const [lv, lab] = band(s.to ?? 0);
const delta = s.from == null ? 'YENİ RİSK' : `${d > 0 ? '+' : ''}${d} PUAN · %${s.from} → %${s.to}`;
const meter = `<div style="display:grid;grid-template-columns:repeat(5,64px);gap:10px">${[1,2,3,4,5].map(k => `<i style="display:block;height:18px;background:${k <= lv ? BLUE : DIM}"></i>`).join('')}</div>`;
const html = `<html><head><style>${fonts}*{box-sizing:border-box}body{margin:0}
.s{width:1080px;height:1350px;background:#0a0d13;color:#eef1f6;font-family:AL,AX,sans-serif;position:relative;overflow:hidden}
.in{position:absolute;inset:0;padding:130px 96px 120px;display:flex;flex-direction:column}
.hud{position:absolute;inset:44px}.hud i{position:absolute;width:44px;height:44px;border:0 solid ${flas ? AMB : MUT}}
.hud i:nth-child(1){left:0;top:0;border-left-width:3px;border-top-width:3px}.hud i:nth-child(2){right:0;top:0;border-right-width:3px;border-top-width:3px}.hud i:nth-child(3){left:0;bottom:0;border-left-width:3px;border-bottom-width:3px}.hud i:nth-child(4){right:0;bottom:0;border-right-width:3px;border-bottom-width:3px}
.mono{font-family:ML,MX,monospace;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.hl,.hb{position:absolute;left:64px;right:64px;display:flex;justify-content:space-between;font-size:20px;color:${MUT}}.hl{top:64px}.hb{bottom:62px}
.scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0 2px,transparent 2px 6px)}
h1{font-size:${(s.headline || '').length > 60 ? 70 : 84}px;line-height:1.02;font-weight:700;letter-spacing:-.03em;margin:28px 0 0;text-wrap:balance}
.b{font-size:32px;line-height:46px;color:#c9d0db;margin:0}
</style></head><body><div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK${QT ? ' QUANT' : ''} · ${flas ? 'FLAŞ' : (s.kind || 'SİNYAL')}</span><span>${esc(s.date)} · ${esc(s.time)} TSİ</span></div>
<div class="in">
<div class="mono" style="display:flex;gap:16px;align-items:center;font-size:26px;color:${flas ? AMB : MUT}">${flas ? `<span style="background:${AMB};color:#0a0d13;padding:6px 14px">Flaş</span>` : `<span style="width:16px;height:28px;background:${BLUE}"></span>`}<span>${esc(s.eyebrow || s.risk)}</span></div>
<h1>${esc(s.headline)}</h1>
<p class="b" style="margin-top:36px">${esc(s.why)}</p>
<div style="margin-top:auto;border-top:2px solid ${DIM};padding-top:36px;display:flex;flex-direction:column;gap:22px">
<div class="mono" style="font-size:22px;color:${MUT}">${QT ? 'Soru' : 'Etkilenen risk'}${s.impact === 'Çok yüksek' ? ` · <span style="color:${AMB}">■ Etki: Çok yüksek</span>` : ''}</div>
<div style="font-size:40px;font-weight:700;letter-spacing:-.01em">${esc(s.risk)}</div>
<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px">
<div style="font-family:ML,MX,monospace;font-weight:500;font-size:170px;line-height:1;letter-spacing:-.04em;color:${BLUE}"><small style="font-size:.45em;vertical-align:.95em;margin-right:8px;opacity:.7">%</small>${s.to}</div>
<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-end;padding-bottom:18px">${meter}<span class="mono" style="font-size:24px;color:${BLUE}">${lab}</span><span class="mono" style="font-size:22px;color:${d >= 0 ? '#eef1f6' : MUT}">${delta}</span></div></div>
${s.motor != null ? `<div class="mono" style="font-size:22px;color:${MUT}">Motor %${s.motor} · Claude ${s.adj >= 0 ? '+' : ''}${s.adj} · <span style="color:${BLUE}">Planck %${s.to}</span></div>` : ''}
${s.source ? `<div class="mono" style="font-size:18px;color:${MUT};letter-spacing:.04em">Kaynak: ${esc(s.source)} · ${QT ? 'Son tarih: ' + esc(s.deadline || '') + ' · Yatırım tavsiyesi değildir' : 'Ufuk: 2031'}</div>` : ''}
</div></div>
<div class="hb mono"><span>@PLANCK.${QT ? 'QUANT' : 'NEWS'}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div></body></html>`;
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html); await p.waitForTimeout(300); await p.screenshot({ path: out }); await b.close(); console.log(out); })();
