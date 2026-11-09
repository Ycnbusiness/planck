// Planck Quant görsel seti: node quant/design.js  → quant/out/
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..'); 
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
// ---- Planck · Kanıt #1: Yapay zekâ psikozu ----
const N = 7, pg = i => `${String(i).padStart(2,'0')}/${String(N).padStart(2,'0')}`;
const DATE = '8 KASIM 2026';
const frame = (inner, i) => `<div class="s"><div class="scan"></div><div class="hud"><i></i><i></i><i></i><i></i></div>
<div class="hl mono"><span>PLANCK · KANIT</span><span>${DATE}</span></div><div class="in">${inner}</div>
<div class="hb mono"><span>@PLANCK.NEWS · ${pg(i)}</span><span>CLAUDE İLE HAZIRLANMIŞTIR</span></div></div>`;
const stat = (v, l) => `<div style="border-top:2px solid ${DIM};padding:22px 0;display:grid;grid-template-columns:330px 1fr;align-items:baseline;gap:24px"><span style="font-family:ML,MX,monospace;font-weight:500;font-size:54px;letter-spacing:-.02em;color:${BLUE}">${v}</span><span style="font-size:28px;line-height:38px;color:#c9d0db">${l}</span></div>`;
const frow = (l, v) => `<div style="display:flex;justify-content:space-between;gap:20px;padding:13px 0;border-top:2px solid ${DIM};font-size:25px;line-height:32px"><span style="color:#c9d0db">${l}</span><span style="font-family:ML,MX,monospace;font-weight:500;color:${v.startsWith('+')?BLUE:v.startsWith('−')?'#eef1f6':MUT};white-space:nowrap">${v}</span></div>`;
const big = (p, lab, col=BLUE) => { const [lv, b] = band(p); return `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px"><div style="font-family:ML,MX,monospace;font-weight:500;font-size:150px;line-height:1;letter-spacing:-.04em;color:${col}"><small style="font-size:.42em;vertical-align:.95em;opacity:.7;margin-right:6px">%</small>${p}</div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;padding-bottom:16px">${meter(lv,56,16)}<span class="mono" style="font-size:22px;color:${BLUE}">${b}</span><span class="mono" style="font-size:20px;color:${MUT}">${lab}</span></div></div>`; };
const S = [];
// 1 Kapak
S.push(frame(`<div class="eb mono">Kanıt · Psikoloji × Yapay zekâ<b></b></div>
<h1 style="margin-top:40px;font-size:104px">Yapay Zekâ Psikoza Yol Açıyor mu?</h1>
<p class="b" style="margin-top:40px;font-size:36px;line-height:50px">JAMA Psychiatry'de yayımlanan yeni çalışma "yapay zekâ psikozu"nu ilk kez hasta kayıtlarında saydı. Planck, çalışmadan çıkan iki iddianın tutma olasılığını hesapladı.</p>
<div style="margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:24px">
<div style="border:2px solid ${BLUE};padding:26px"><div class="mono" style="font-size:20px;color:${BLUE}">İddia 1 · Güçlendirme</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:96px;line-height:1;margin-top:14px;color:${BLUE}">%65</div></div>
<div style="border:2px solid ${DIM};padding:26px"><div class="mono" style="font-size:20px;color:${MUT}">İddia 2 · Neden olma</div><div style="font-family:ML,MX,monospace;font-weight:500;font-size:96px;line-height:1;margin-top:14px">%8</div></div></div>`, 1));
// 2 Çalışma
S.push(frame(`<div class="eb mono">Çalışma ne yaptı<b></b></div><h2 style="margin-top:28px">Üç Buçuk Yılın Hasta Kayıtları Tarandı</h2>
<p class="b" style="margin-top:28px">Vanderbilt Üniversitesi Tıp Merkezi'nde, Aralık 2022 – Nisan 2026 arasındaki psikiyatri notları yapay zekâ ile ilgili sözcüklerle arandı; bulunan kayıtları iki uzman tek tek okudu.</p>
<div style="margin-top:auto">${stat('215.712','ruh sağlığı hizmeti alan hasta')}${stat('28','"yapay zekâ psikozu" vakası')}${stat('%0,013','hastalar içindeki oran (alt sınır)')}${stat('%60,7','vakaların ilk psikoz atağı olması')}${stat('%64,3','sohbet botunun var olan belirtiyi güçlendirdiği vakalar')}</div>`, 2));
// 3 İki iddia
S.push(frame(`<div class="eb mono">Ölçülen iddialar<b></b></div><h2 style="margin-top:28px">Çalışmanın Söylediği ile Manşetlerin Söylediği Aynı Değil</h2>
<div style="margin-top:56px;border-left:6px solid ${BLUE};padding:6px 0 6px 32px"><div class="mono" style="font-size:22px;color:${BLUE}">İddia 1 · Çalışmanın kendi bulgusu</div>
<p style="margin:16px 0 0;font-size:38px;line-height:50px;font-weight:700">Sohbet botları çoğu vakada psikozu başlatmıyor; zaten gelişmekte olan belirtileri güçlendiriyor.</p></div>
<div style="margin-top:48px;border-left:6px solid ${DIM};padding:6px 0 6px 32px"><div class="mono" style="font-size:22px;color:${MUT}">İddia 2 · Manşetlerdeki yorum</div>
<p style="margin:16px 0 0;font-size:38px;line-height:50px;font-weight:700;color:#c9d0db">Sohbet botları, daha önce riski olmayan insanlarda psikoza neden oluyor.</p></div>
<p class="b" style="margin-top:auto;font-size:28px;line-height:40px;color:${MUT}">Ölçülen şey: Başka merkezlerde yapılacak çalışmalar aynı sonucu bulur mu? Yani bu bilgi kalıcı mı?</p>`, 3));
// 4 Motor
S.push(frame(`<div class="eb mono">1. Katman · Motor<b></b></div><h2 style="margin-top:28px;font-size:66px">Önce Kurallı Hesap</h2>
<p class="b" style="margin-top:20px;font-size:27px;line-height:38px">Başlangıç noktası, psikolojide büyük tekrarlama projelerinin bulduğu oran. Ardından tekrarlanmayı öngördüğü bilinen her özellik puan ekler ya da düşer.</p>
<div style="margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:0 36px">
<div><div class="mono" style="font-size:20px;color:${BLUE};padding-bottom:10px">İddia 1</div>${frow('Alanın taban oranı','%45')}${frow('Tanımlayıcı bulgu','+10')}${frow('Bağımsız ön kanıt','+10')}${frow('Az vaka (28)','−6')}${frow('Tek merkez','−5')}${frow('Yüksek medya ilgisi','−4')}${frow('Ön kayıt yok','−3')}${frow('Kurum prestiji','0')}
<div style="display:flex;justify-content:space-between;padding:16px 0;border-top:2px solid ${BLUE};font-size:30px;font-weight:700"><span>Motor</span><span style="font-family:ML,MX,monospace;color:${BLUE}">%47</span></div></div>
<div><div class="mono" style="font-size:20px;color:${MUT};padding-bottom:10px">İddia 2</div>${frow('Alanın taban oranı','%45')}${frow('Gözlemden nedensellik','−20')}${frow('Bağımsız ön kanıt','+5')}${frow('Az vaka (28)','−6')}${frow('Tek merkez','−5')}${frow('Yüksek medya ilgisi','−4')}${frow('Ön kayıt yok','−3')}${frow('Kurum prestiji','0')}
<div style="display:flex;justify-content:space-between;padding:16px 0;border-top:2px solid ${DIM};font-size:30px;font-weight:700"><span>Motor</span><span style="font-family:ML,MX,monospace">%12</span></div></div></div>`, 4));
// 5 Claude
const why = (n, t, d) => `<div style="border-top:2px solid ${DIM};padding:24px 0"><div class="mono" style="font-size:20px;color:${MUT}">${n}</div><div style="font-size:31px;line-height:40px;font-weight:700;margin-top:8px">${t}</div><p style="margin:10px 0 0;font-size:25px;line-height:36px;color:#c9d0db">${d}</p></div>`;
S.push(frame(`<div class="eb mono">2. Katman · Claude ayarı<b></b></div><h2 style="margin-top:28px;font-size:66px">Motorun Göremediği</h2>
<div style="margin-top:28px">
${why('İddia 1 · +18','Sanrılar her çağda o dönemin teknolojisine bürünür','Radyo, televizyon ve internet dönemlerinde de psikoz yaşayanlar sanrılarını yeni teknolojiye bağladı. "Güçlendirme" örüntüsü psikiyatri literatürünün bildiği bir kalıba oturuyor.')}
${why('İddia 1 · Mekanizma','Onaylayıcı yanıtlar sanrıyı besleyebilir','Bir sohbet botu güncellemesi, 2025\'te aşırı onaylayıcı bulunduğu için geri çekildi. Risk 2023\'te bir psikiyatrist tarafından önceden öngörülmüştü.')}
${why('İddia 2 · −4','Yaş tesadüfü','Vakaların ortanca yaşı 27,5; bu, ilk psikoz atağının en sık görüldüğü yaş aralığı. Aynı yaş grubu sohbet botlarını en çok kullanan grup. Birlikte görülmek neden olmak demek değil.')}</div>`, 5));
// 6 Sonuç
S.push(frame(`<div class="eb mono">Sonuç<b></b></div><h2 style="margin-top:28px;font-size:66px">Planck'in Okuması</h2>
<div style="margin-top:40px"><div class="mono" style="font-size:22px;color:${BLUE}">İddia 1 · Botlar var olan psikozu güçlendiriyor</div>
<div style="margin-top:12px">${big(65,'Motor %47 · Claude +18')}</div></div>
<div style="margin-top:40px;border-top:2px solid ${DIM};padding-top:36px"><div class="mono" style="font-size:22px;color:${MUT}">İddia 2 · Botlar sağlıklı insanda psikoz yaratıyor</div>
<div style="margin-top:12px">${big(8,'Motor %12 · Claude −4')}</div></div>
<p class="b" style="margin-top:auto;font-size:27px;line-height:38px">Kayıtlar sadece hekimin not ettiği vakaları gösteriyor; gerçek oran büyük olasılıkla %0,013'ten yüksek. Ama yüksek olması, botların neden olduğu anlamına gelmiyor.</p>`, 6));
// 7 Karne + kapanış
S.push(frame(`<div class="eb mono">Karne<b></b></div><h2 style="margin-top:28px;font-size:66px">Bu Tahminler Nasıl Kapanacak?</h2>
<div style="margin-top:36px">${why('İddia 1 · Son tarih 31 Aralık 2028','Başka bir merkezden yayımlanacak çalışma','Vakaların çoğunluğunda güçlendirme örüntüsünü yeniden bulursa tahmin "tuttu" olarak kapanır.')}
${why('İddia 2 · Son tarih 31 Aralık 2028','İleriye dönük, kontrollü bir çalışma','Önceden risk taşımayan kişilerde sohbet botu kullanımının psikozu başlattığını gösterirse "tuttu" olarak kapanır.')}</div>
<div style="margin-top:auto;border-top:2px solid ${BLUE};padding-top:30px"><p style="margin:0;font-size:38px;line-height:48px;font-weight:700">Sizce teknoloji akıl sağlığını değiştiriyor mu, yoksa sadece görünür mü kılıyor?</p>
<p class="mono" style="margin:18px 0 0;font-size:17px;line-height:26px;color:${MUT};letter-spacing:.04em">Kaynak: Bergson ve ark., JAMA Psychiatry, 2026. Tıbbi tavsiye değildir. Bu içerik Anthropic'in yapay zekâ modeli Claude tarafından hazırlanmıştır.</p></div>`, 7));
(async () => { const br = await chromium.launch(); const out = path.join(ROOT, 'posts', '2026-11-08-kanit-yz-psikoz'); fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < S.length; i++) { const p = await br.newPage({ viewport: { width: 1080, height: 1350 } }); await p.setContent(`<html lang="tr"><head><style>${css}</style></head><body>${S[i]}</body></html>`); await p.waitForTimeout(250); await p.screenshot({ path: path.join(out, `${String(i+1).padStart(2,'0')}.png`) }); await p.close(); }
  await br.close(); console.log('ok'); })();
