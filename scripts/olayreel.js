// Planck olay Reel'i (16 sn, 1080×1920, müzikli): olay → risk değişimi → Peki Biz? → kapanış.
// Kullanım: node scripts/olayreel.js spec.json çıktı.mp4
// spec: {"week":"2026-W46","tag":"Enerji","title":"...","text":"...","risk":"...","from":71,"to":74,"why":"...","pq":"Türkiye ...?","pp":10,"cta":"..."}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const R = path.join(__dirname, '..', 'brand'); const b64 = f => fs.readFileSync(path.join(R, f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const lock = 'data:image/svg+xml;base64,' + b64('logos/planck-lockup-reversed.svg');
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const OUT = process.argv[3] || 'reel.mp4';
const FPS = 30, DUR = 16, TS = 1;
const page = `<style>${fonts}body{margin:0;background:#0a0d13}</style><canvas id="c" width="1080" height="1920"></canvas><img id="lk" src="${lock}" style="display:none">
<script>
const S=${JSON.stringify(spec)};const c=document.getElementById('c'),x=c.getContext('2d'),W=1080,H=1920;
const INK='#eef1f6',MUT='#9aa3b2',DIM='#262d3d',BLUE='#6b93ff',BG='#0a0d13',AMB='#f2a93b';
const cl=v=>Math.max(0,Math.min(1,v)),E=v=>1-Math.pow(1-cl(v),3),seg=(t,a,d)=>cl((t-a)/d);
const F=(sz,w,m)=>x.font=(w||700)+' '+sz+'px '+(m?'ML, MX, monospace':'AL, AX, sans-serif');
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;const P=[];for(let i=0;i<120;i++)P.push({x:rnd()*W,y:rnd()*H,z:.3+rnd()*.7,s:rnd()});
function T(s,X,Y,sz,col,o,w,m,ls,al){x.save();x.globalAlpha=o;F(sz,w,m);x.fillStyle=col;if(ls)x.letterSpacing=ls+'px';if(al)x.textAlign=al;x.fillText(s,X,Y);x.restore();}
function wrap(s,X,Y,sz,maxw,lh,col,o,w){F(sz,w);const ws=s.split(' ');let line='',y=Y;x.save();x.globalAlpha=o;x.fillStyle=col;for(const q of ws){const t=line?line+' '+q:q;if(x.measureText(t).width>maxw&&line){x.fillText(line,X,y);line=q;y+=lh;}else line=t;}x.fillText(line,X,y);x.restore();return y;}
function hud(t){x.strokeStyle=MUT;x.lineWidth=3;const m=56,L=56;[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+sy*L);x.lineTo(a,b);x.lineTo(a+sx*L,b);x.stroke();});
 T('PLANCK · '+S.week,72,128,22,MUT,1,500,true,2);T('T+'+t.toFixed(2),W-72,128,22,MUT,1,500,true,2,'right');
 T('@PLANCK.NEWS',72,H-96,22,MUT,1,500,true,2);T('CLAUDE İLE HAZIRLANMIŞTIR',W-72,H-96,22,MUT,1,500,true,2,'right');}
function bg(t){x.fillStyle=BG;x.fillRect(0,0,W,H);for(const p of P){const y=((p.y-t*16*p.z)%H+H)%H;x.globalAlpha=.1+.3*p.z;x.fillStyle=p.s>.85?BLUE:MUT;x.fillRect(p.x,y,2*p.z+1,2*p.z+1);}x.globalAlpha=1;
 x.globalAlpha=.06;x.fillStyle='#000';for(let y=0;y<H;y+=6)x.fillRect(0,y,W,2);x.globalAlpha=1;}
function draw(t){bg(t);hud(t);
 // 1) Olay 0–4.6
 const a1=seg(t,0,.5)*(1-seg(t,4.4,.4));if(a1>0){T(S.tag.toLocaleUpperCase('tr'),96,560,30,BLUE,a1,500,true,4);
  x.save();x.globalAlpha=a1;x.fillStyle=BLUE;x.fillRect(96,600,120*E(seg(t,.3,.8)),8);x.restore();
  const ly=wrap(S.title,96,740,96,880,104,INK,a1,700);if(S.text)wrap(S.text,96,ly+110,38,880,54,'#c9d0db',a1*seg(t,1.2,.6),400);}
 // 2) Risk 4.8–9.6
 const a2=seg(t,4.8,.5)*(1-seg(t,9.4,.4));if(a2>0){T('ETKİLENEN RİSK',96,600,28,MUT,a2,500,true,4);wrap(S.risk,96,700,60,880,70,INK,a2,700);
  const pr=E(seg(t,5.4,1.6)),v=Math.round(S.from+(S.to-S.from)*pr);T('%'+v,96,1080,240,BLUE,a2,500,true,-6);
  T('%'+S.from+' → %'+S.to,96,1170,34,MUT,a2,500,true,2);if(S.why)wrap(S.why,96,1270,36,880,50,'#c9d0db',a2*seg(t,6.4,.6),400);}
 // 3) Peki Biz 9.8–13.6
 const a3=seg(t,9.8,.5)*(1-seg(t,13.4,.4));if(a3>0){T('PEKİ BİZ?',96,600,30,BLUE,a3,500,true,4);
  const ly=wrap(S.pq,96,720,58,880,70,INK,a3,700);T('%'+Math.round(S.pp*E(seg(t,10.3,1.2))),96,ly+260,220,BLUE,a3,500,true,-6);}
 // 4) Kapanış 13.7–
 const a4=seg(t,13.7,.5);if(a4>0){const lk=document.getElementById('lk');x.save();x.globalAlpha=a4;const h=110,w=lk.naturalWidth/lk.naturalHeight*h;x.drawImage(lk,(W-w)/2,760,w,h);x.restore();
  T('Bilginin bittiği yerde tahmin başlar.',W/2,980,40,INK,a4,400,false,0,'center');T(S.cta||'Ne yapabiliriz? Profildeki gönderide.',W/2,1120,34,MUT,a4*seg(t,14.1,.5),500,false,0,'center');}}
window.draw=draw;</script>`;
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(page); await pg.waitForTimeout(500); await pg.evaluate(() => document.fonts.ready);
  const tmp = OUT + '.silent.mp4';
  const f = spawn('ffmpeg', ['-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',tmp], { stdio: ['pipe','ignore','ignore'] });
  for (let i = 0; i < FPS * DUR; i++) { const d = await pg.evaluate(t => { window.draw(t); return document.getElementById('c').toDataURL('image/jpeg', .9).split(',')[1]; }, i / FPS * TS); if (!f.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => f.stdin.once('drain', r)); }
  f.stdin.end(); await new Promise(r => f.on('close', r)); await br.close();
  const music = path.join(R, 'audio', 'planck-arka-plan-radar-quiet.m4a');
  await new Promise((res, rej) => spawn('ffmpeg', ['-y','-i',tmp,'-i',music,'-filter_complex',`[1:a]atrim=0:${DUR},afade=t=in:d=0.8,afade=t=out:st=${DUR-1.8}:d=1.8,loudnorm=I=-14:TP=-1.5[a]`,'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',OUT], { stdio: 'ignore' }).on('close', c => c ? rej(new Error('ffmpeg audio')) : res()));
  fs.unlinkSync(tmp); console.log(OUT);
})();
