// Planck · 10 Kasım anma animasyonu (46 sn, 1080×1920).
// Kullanım: node scripts/anma.js spec.json çıktı.mp4 (spec boş {} olabilir)
// spec: {"week":"2026-W46","tag":"Enerji","title":"...","text":"...","risk":"...","from":71,"to":74,"why":"...","pq":"Türkiye ...?","pp":10,"cta":"..."}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const R = path.join(__dirname, '..', 'brand'); const b64 = f => fs.readFileSync(path.join(R, f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3] || 'reel.mp4';
const FPS = 30, DUR = 46, TS = 1;
const page = `<style>${fonts}body{margin:0;background:#0a0d13}</style><canvas id="c" width="1080" height="1920"></canvas><img id="lk" src="${lock}" style="display:none">${spec.mask?`<img id="mk" src="data:${spec.mask.endsWith(".svg")?"image/svg+xml":"image/png"};base64,${fs.readFileSync(path.resolve(path.dirname(process.argv[2]),spec.mask)).toString("base64")}" style="display:none">`:""}
<script>
const S=${JSON.stringify(spec)};const c=document.getElementById('c'),x=c.getContext('2d'),W=1080,H=1920;
const INK='#eef1f6',MUT='#9aa3b2',DIM='#262d3d',BLUE='#6b93ff',BG='#0a0d13',AMB='#f2a93b';
const cl=v=>Math.max(0,Math.min(1,v)),E=v=>1-Math.pow(1-cl(v),3),seg=(t,a,d)=>cl((t-a)/d);
const F=(sz,w,m)=>x.font=(w||700)+' '+sz+'px '+(m?'ML, MX, monospace':'AL, AX, sans-serif');
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;const P=[];for(let i=0;i<120;i++)P.push({x:rnd()*W,y:rnd()*H,z:.3+rnd()*.7,s:rnd()});
function T(s,X,Y,sz,col,o,w,m,ls,al){x.save();x.globalAlpha=o;F(sz,w,m);x.fillStyle=col;if(ls)x.letterSpacing=ls+'px';if(al)x.textAlign=al;x.fillText(s,X,Y);x.restore();}
function wrap(s,X,Y,sz,maxw,lh,col,o,w){F(sz,w);const ws=s.split(' ');let line='',y=Y;x.save();x.globalAlpha=o;x.fillStyle=col;for(const q of ws){const t=line?line+' '+q:q;if(x.measureText(t).width>maxw&&line){x.fillText(line,X,y);line=q;y+=lh;}else line=t;}x.fillText(line,X,y);x.restore();return y;}

// Silüet: spec.mask (PNG/SVG yolu; koyu zemin üzerinde açık renk ya da şeffaf zemin üzerinde dolu şekil) noktalara çevrilir.
let SILC=null;const getSIL=()=>SILC||(SILC=(()=>{const im=document.getElementById('mk');if(!im||!im.naturalWidth)return [];
 const cv=document.createElement('canvas'),Wm=420,Hm=Math.round(420*im.naturalHeight/im.naturalWidth);cv.width=Wm;cv.height=Hm;const g=cv.getContext('2d');g.drawImage(im,0,0,Wm,Hm);
 const d=g.getImageData(0,0,Wm,Hm).data,on=(X,Y)=>{if(X<0||Y<0||X>=Wm||Y>=Hm)return false;const i=(Y*Wm+X)*4;const a=d[i+3]/255,l=(d[i]+d[i+1]+d[i+2])/765;return S.maskInvert?(a>.5&&l<.5):(a>.5&&(S.maskAlpha?true:l>.5));};
 const scale=Math.min(860/Wm,980/Hm),OX=(1080-Wm*scale)/2,OY=1400-Hm*scale;let sd=11;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;const out=[];
 for(let Y=0;Y<Hm;Y+=2)for(let X=0;X<Wm;X+=2){if(!on(X,Y))continue;const e=!on(X-3,Y)||!on(X+3,Y)||!on(X,Y-3)||!on(X,Y+3);if(!e&&r()<.62)continue;if(e&&r()<.25)continue;
  const ang=r()*6.283,rad=900+r()*700;out.push({tx:OX+(X+(r()-.5)*1.5)*scale,ty:OY+(Y+(r()-.5)*1.5)*scale,sx:540+Math.cos(ang)*rad,sy:960+Math.sin(ang)*rad,d:r()*(e?.5:1),c:e});}
 return out;})());
function hud(t){x.strokeStyle=MUT;x.lineWidth=3;const m=56,L=56;[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+sy*L);x.lineTo(a,b);x.lineTo(a+sx*L,b);x.stroke();});
 T('1881 — 1938',72,128,22,MUT,1,500,true,2);const lk=document.getElementById('lk');if(lk.naturalWidth){x.save();x.globalAlpha=.85;const h=38,w=lk.naturalWidth/lk.naturalHeight*h;x.drawImage(lk,W-72-w,98,w,h);x.restore();}
 T('@PLANCK.NEWS',72,H-96,22,MUT,1,500,true,2);T('CLAUDE İLE HAZIRLANMIŞTIR',W-72,H-96,22,MUT,1,500,true,2,'right');}
function bg(t){x.fillStyle=BG;x.fillRect(0,0,W,H);for(const p of P){const y=((p.y-t*8*p.z)%H+H)%H;x.globalAlpha=.06+.2*p.z;x.fillStyle=p.s>.9?BLUE:MUT;x.fillRect(p.x,y,2*p.z+1,2*p.z+1);}x.globalAlpha=1;
 x.globalAlpha=.06;x.fillStyle='#000';for(let y=0;y<H;y+=6)x.fillRect(0,y,W,2);x.globalAlpha=1;}
function C(s,Y,sz,col,o,w,m,ls){T(s,W/2,Y,sz,col,o,w,m,ls,'center');}
function cwrap(s,Y,sz,maxw,lh,col,o,w){F(sz,w);const ws=s.split(' ');const L=[];let line='';for(const q of ws){const t=line?line+' '+q:q;if(x.measureText(t).width>maxw&&line){L.push(line);line=q;}else line=t;}L.push(line);L.forEach((l,i)=>C(l,Y+i*lh,sz,col,o,w));return Y+(L.length-1)*lh;}
function draw(t){bg(t);hud(t);
 // 1) 09.05 — 0–6
 const a1=seg(t,.4,1)*(1-seg(t,5.6,.6));if(a1>0){C('10 KASIM 1938',820,34,MUT,a1,500,true,8);
  const sec=Math.min(5,Math.floor(t*1.2));const hh='09',mm='0'+(t<4?4:5),ss=t<4?String(55+Math.min(4,Math.floor(t*1.25))).padStart(2,'0'):'00';
  C(hh+'.'+mm,1000,200,INK,a1,500,true,-4);x.save();x.globalAlpha=a1*.5;x.fillStyle=BLUE;x.fillRect(W/2-90,1060,180*E(seg(t,4,1.2)),6);x.restore();
  C('Saat durdu.',1160,40,MUT,a1*seg(t,4.2,.8),400);}
 // 2) Söz — 6.4–14
 const a2=seg(t,6.4,1)*(1-seg(t,13.4,.6));if(a2>0){x.save();x.globalAlpha=a2;x.fillStyle=BLUE;x.fillRect(W/2-60,700,120,6);x.restore();
  const y=cwrap('“Hayatta en hakiki mürşit ilimdir.”',860,76,880,92,INK,a2,700);C('Mustafa Kemal Atatürk · 1924',y+120,30,MUT,a2*seg(t,8,.8),500,true,3);}
 // 3) Olasılık — 14.2–30 (yıl ve oran birlikte akar)
 const a3=seg(t,14.2,.8)*(1-seg(t,29.4,.6));if(a3>0){
  C('BU ÜLKEDE BİR İNSANIN',430,30,MUT,a3,500,true,5);C('OKUMA YAZMA BİLME OLASILIĞI',480,30,MUT,a3,500,true,5);
  const IO=v=>v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;
  const K=[[16.2,18.4,1927,1935,10,19.25],[20.2,26.4,1935,2025,19.25,97.9]];let yr=1927,v=10;
  for(const [ta,tb,y0,y1,v0,v1] of K){if(t>=ta){const p=IO(seg(t,ta,tb-ta));yr=Math.round(y0+(y1-y0)*p);v=v0+(v1-v0)*p;}}
  const lbl=v<20&&t<20.2?'%'+Math.round(v):'%'+v.toFixed(1).replace('.',',');
  C(lbl,800,260,BLUE,a3,500,true,-8);C(String(yr),890,40,INK,a3,500,true,6);
  const bx=150,bw=W-300,by=990;x.save();x.globalAlpha=a3;x.fillStyle=DIM;x.fillRect(bx,by,bw,12);x.fillStyle=BLUE;x.fillRect(bx,by,bw*v/100,12);
  // zaman çizgisi: 1927–2025, onar yıllık çentikler, ilerleyen işaret
  const ty=1060,yx=y=>bx+bw*(y-1927)/(2025-1927);x.fillStyle=DIM;x.fillRect(bx,ty,bw,2);
  for(let y=1930;y<=2020;y+=10){const on=yr>=y;x.globalAlpha=a3*(on?.9:.35);x.fillStyle=on?BLUE:MUT;x.fillRect(yx(y)-1,ty-8,2,18);}
  x.globalAlpha=a3;x.fillStyle=INK;x.beginPath();x.arc(yx(yr),ty+1,7,0,7);x.fill();x.restore();
  T('1927',bx,ty+44,22,MUT,a3,500,true,2);T('2025',bx+bw,ty+44,22,MUT,a3,500,true,2,'right');
  const R=[['1924','Eğitim birliği',15],['1928','Yeni harfler · Millet Mektepleri',16.6],['1933','Üniversite reformu',18],['1934','Kadınlara seçme ve seçilme hakkı',19.2]];
  R.forEach((r,i)=>{const o=a3*seg(t,r[2],.7);T(r[0],150,1210+i*88,34,BLUE,o,500,true,2);T(r[1],290,1210+i*88,34,'#c9d0db',o,400);});
  T('Kaynak: 1927 ve 1935 nüfus sayımları; TÜİK 2025 (6 yaş ve üzeri).',150,1600,24,MUT,a3*seg(t,26,.8),400);}
 // 4) Tahmin etmedi — 30–36
 const a4=seg(t,30,.8)*(1-seg(t,36,.6));if(a4>0){C('Geleceği tahmin etmedi.',900,64,MUT,a4,700);C('İnşa etti.',1010,92,INK,a4*seg(t,31.4,.8),700);}
 // 5) Kapanış — yıldızlar birleşip silüeti oluşturur (36.6–46)
 if(t>36.4){const SIL=getSIL();const k=SIL.length;for(let i=0;i<k;i++){const q=SIL[i];const st=36.6+q.d*2.2,p=seg(t,st,1.6+q.d*.6),e=1-Math.pow(1-p,4);
   const px=q.sx+(q.tx-q.sx)*e,py=q.sy+(q.ty-q.sy)*e;const tw=.75+.25*Math.sin(t*3+i);
   x.globalAlpha=(p>0?(.35+.65*e):.25)*tw;x.fillStyle=(q.c&&e>.98)?'#ffffff':(i%9==0?BLUE:'#dfe6f5');x.fillRect(px-1.6,py-1.6,3.2,3.2);
   if(p>0&&p<1){x.globalAlpha=.25*(1-e);x.fillRect(px-(q.tx-q.sx)*.04,py-(q.ty-q.sy)*.04,2,2);}}
  x.globalAlpha=1;const a5=seg(t,41.2,1.2);
  C('Saygı, özlem ve minnetle.',1560,50,INK,a5,400);C('10 KASIM 1938 — 10 KASIM 2026',1640,28,MUT,a5*seg(t,42,.8),500,true,4);}}
window.draw=draw;</script>`;
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(page); await pg.waitForTimeout(500); await pg.evaluate(() => document.fonts.ready);
  const tmp = OUT + '.silent.mp4';
  const f = spawn('ffmpeg', ['-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',tmp], { stdio: ['pipe','ignore','ignore'] });
  for (let i = 0; i < FPS * DUR; i++) { const d = await pg.evaluate(t => { window.draw(t); return document.getElementById('c').toDataURL('image/jpeg', .9).split(',')[1]; }, i / FPS * TS); if (!f.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => f.stdin.once('drain', r)); }
  f.stdin.end(); await new Promise(r => f.on('close', r)); await br.close();
  const music = path.join(R, 'audio', 'planck-arka-plan-radar-quiet.m4a');
  await new Promise((res, rej) => spawn('ffmpeg', ['-y','-i',tmp,'-i',music,'-filter_complex',`[1:a]atrim=0:${DUR},afade=t=in:d=0.8,afade=t=out:st=${DUR-1.8}:d=1.8,loudnorm=I=-20:TP=-2[a]`,'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',OUT], { stdio: 'ignore' }).on('close', c => c ? rej(new Error('ffmpeg audio')) : res()));
  fs.unlinkSync(tmp); console.log(OUT);
})();
