// Planck T+ · Pozisyon videosu (kuşbakışı, insan görüntüsü yok). 9:16, ~18 sn, müzikli.
// Kullanım: node sports/pozisyon.js spec.json meta.json çıktı.mp4
// meta: {"title":"…","sub":"Euro 2024 Finali · 72'","att":"İngiltere","def":"İspanya","score":"1–1","claude":"…","question":"…"}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const R = path.join(__dirname, '..', 'brand'); const b64 = f => fs.readFileSync(path.join(R, f)).toString('base64');
const ff = (n, f, w) => `@font-face{font-family:${n};src:url(data:font/woff2;base64,${b64('fonts/' + f)}) format('woff2');font-weight:${w}}`;
const fonts = ff('AL','arimo-latin-400-normal.woff2',400)+ff('AL','arimo-latin-700-normal.woff2',700)+ff('AX','arimo-latin-ext-400-normal.woff2',400)+ff('AX','arimo-latin-ext-700-normal.woff2',700)+ff('ML','ibm-plex-mono-latin-500-normal.woff2',500)+ff('MX','ibm-plex-mono-latin-ext-500-normal.woff2',500);
const SPEC = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const META = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')); const OUT = process.argv[4] || 'pozisyon.mp4';
const FPS = 30, DUR = 27;
const page = `<style>${fonts}body{margin:0;background:#0a0d13}</style><canvas id="c" width="1080" height="1920"></canvas>
<script>
const S=${JSON.stringify(SPEC)},M=${JSON.stringify(META)};const c=document.getElementById('c'),x=c.getContext('2d'),W=1080,H=1920;
const INK='#eef1f6',MUT='#9aa3b2',DIM='#262d3d',LINE='#3a4357',BLUE='#6b93ff',BG='#0a0d13',AMB='#f2a93b';
const cl=v=>Math.max(0,Math.min(1,v)),E=v=>1-Math.pow(1-cl(v),3),seg=(t,a,d)=>cl((t-a)/d);
const F=(sz,w,m)=>x.font=(w||700)+' '+sz+'px '+(m?'ML, MX, monospace':'AL, AX, sans-serif');
function T(s,X,Y,sz,col,o,w,m,ls,al){if(o<=0)return;x.save();x.globalAlpha=o;F(sz,w,m);x.fillStyle=col;if(ls)x.letterSpacing=ls+'px';if(al)x.textAlign=al;x.fillText(s,X,Y);x.restore();}
function wrap(s,X,Y,sz,maxw,lh,col,o,w){if(o<=0)return Y;F(sz,w);const ws=s.split(' ');let line='',y=Y;x.save();x.globalAlpha=o;x.fillStyle=col;for(const q of ws){const t=line?line+' '+q:q;if(x.measureText(t).width>maxw&&line){x.fillText(line,X,y);line=q;y+=lh;}else line=t;}x.fillText(line,X,y);x.restore();return y;}
// Saha: StatsBomb x 60–120 (yarı saha), y 0–80. Kale üstte.
const XS=S.players.map(p=>p.x).concat([S.shot[0]]),YS=S.players.map(p=>p.y).concat([S.shot[1],36,44]);let X0=Math.min(...XS)-5,Y0=Math.min(...YS)-6,Y1=Math.max(...YS)+6;if((Y1-Y0)<(120-X0)*1.4){const m=((120-X0)*1.4-(Y1-Y0))/2;Y0-=m;Y1+=m;}Y0=Math.max(0,Y0);Y1=Math.min(80,Y1);const PX=72,PY=500,PW=936,K=PW/(Y1-Y0),PH=(120-X0)*K;const P=(sx,sy)=>[PX+(sy-Y0)*K, PY+(120-sx)*K];
function pitch(o,p){x.save();x.beginPath();x.rect(PX-4,PY-4,PW+8,PH+8);x.clip();x.globalAlpha=o;x.strokeStyle=LINE;x.lineWidth=3;const L=(a,b,c2,d)=>{const A=P(a,b),B=P(c2,d);x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(A[0]+(B[0]-A[0])*p,A[1]+(B[1]-A[1])*p);x.stroke();};
 L(120,0,120,80);L(120,0,60,0);L(120,80,60,80);L(60,0,60,80);L(120,18,102,18);L(102,18,102,62);L(102,62,120,62);L(120,30,114,30);L(114,30,114,50);L(114,50,120,50);
 const g1=P(120,36),g2=P(120,44);x.strokeStyle=INK;x.lineWidth=6;x.beginPath();x.moveTo(g1[0],g1[1]);x.lineTo(g1[0]+(g2[0]-g1[0])*p,g1[1]);x.stroke();
 const ps=P(108,40);x.fillStyle=LINE;x.beginPath();x.arc(ps[0],ps[1],4,0,7);x.fill();
 const pa=P(108,40);x.strokeStyle=LINE;x.lineWidth=3;x.beginPath();x.arc(pa[0],pa[1],10*K,0.2*Math.PI,0.8*Math.PI*p+0.2*Math.PI);x.stroke();x.strokeRect(PX,PY,PW*p,PH);
 // ızgara noktaları
 x.fillStyle=DIM;for(let gx=X0+2;gx<120;gx+=4)for(let gy=Y0+2;gy<Y1;gy+=4){const q=P(gx,gy);x.fillRect(q[0]-1,q[1]-1,2,2);}x.restore();}
function hud(t){x.strokeStyle=MUT;x.lineWidth=3;const m=56,Lh=56;[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+sy*Lh);x.lineTo(a,b);x.lineTo(a+sx*Lh,b);x.stroke();});
 T('PLANCK T+ · POZİSYON',72,128,22,MUT,1,500,true,2);T(M.sub.toUpperCase(),W-72,128,22,MUT,1,500,true,2,'right');
 T('@PLANCK.SPORTS',72,H-96,22,MUT,1,500,true,2);T('CLAUDE İLE HAZIRLANMIŞTIR',W-72,H-96,22,MUT,1,500,true,2,'right');}
const KEY=new Set();S.players.forEach((p,i)=>{if(p.shooter||p.gk||(S.pass&&p.name===S.pass.by))KEY.add(i);});
const LAB=(()=>{const placed=[],dots=S.players.map(p=>P(p.x,p.y));const order=S.players.map((p,i)=>i).sort((a,b)=>(KEY.has(b)?1:0)-(KEY.has(a)?1:0));const out=[];
 const G=10;const hit=(r)=>placed.some(q=>r.x-G<q.x+q.w&&r.x+r.w+G>q.x&&r.y-G<q.y+q.h&&r.y+r.h+G>q.y)||dots.some(d=>d[0]>r.x-14&&d[0]<r.x+r.w+14&&d[1]>r.y-14&&d[1]<r.y+r.h+14);
 for(const i of order){const p=S.players[i],[X,Y]=dots[i];const sz=p.shooter?26:21;F(sz,p.shooter?700:500,!p.shooter);const w=x.measureText(p.name).width+6,h=sz+4;
  const cands=[];for(const d of [0,28,56,84,112]){cands.push([X-w/2,Y-22-h-d],[X-w/2,Y+20+d],[X+20+d*.6,Y-h/2-d*.5],[X-20-w-d*.6,Y-h/2-d*.5],[X+20+d*.6,Y-h/2+d*.5],[X-20-w-d*.6,Y-h/2+d*.5]);}
  let r=null;for(const [cx,cy] of cands){const q={x:cx,y:cy,w,h};if(!hit(q)){r=q;break;}}if(!r)r={x:cands[0][0],y:cands[0][1],w,h};placed.push(r);out[i]={tx:r.x+w/2,ty:r.y+h-4,X,Y};}
 return out;})();
function player(p,o,hl,i){const [X,Y]=P(p.x,p.y);x.save();x.globalAlpha=o;
 if(p.team==='att'){x.fillStyle=p.shooter?BLUE:'#2c3a66';x.strokeStyle=BLUE;x.lineWidth=3;x.beginPath();x.arc(X,Y,p.shooter?16:12,0,7);x.fill();x.stroke();}
 else{x.strokeStyle=hl?INK:MUT;x.lineWidth=hl?4:3;if(p.gk){x.strokeRect(X-12,Y-12,24,24);}else{x.beginPath();x.arc(X,Y,12,0,7);x.stroke();}}
 F(p.shooter?26:21,p.shooter?700:500,!p.shooter);x.fillStyle=p.team==='att'?(p.shooter?INK:'#b8c6ff'):MUT;x.textAlign='center';const L=LAB[i];const lx=L.tx,lyy=L.ty-8;if(Math.hypot(lx-X,lyy-Y)>48){x.strokeStyle=LINE;x.lineWidth=1.5;x.beginPath();x.moveTo(X,Y);x.lineTo(lx,lyy+(lyy<Y?10:-14));x.stroke();}x.fillText(p.name,L.tx,L.ty);x.restore();}
function inCone(p){const [sx,sy]=S.shot;const s=(a,b,c2)=>(a[0]-c2[0])*(b[1]-c2[1])-(b[0]-c2[0])*(a[1]-c2[1]);const A=[sx,sy],B=[120,36.34],C=[120,43.66],q=[p.x,p.y];const d1=s(q,A,B),d2=s(q,B,C),d3=s(q,C,A);return !((d1<0||d2<0||d3<0)&&(d1>0||d2>0||d3>0));}
function remap(r){const K=[[0,0],[8.4,8.4],[14.9,12.8],[21.9,16.6],[27,19]];for(let i=1;i<K.length;i++){if(r<=K[i][0]){const a=K[i-1],b=K[i];return a[1]+(r-a[0])*(b[1]-a[1])/(b[0]-a[0]);}}return 19;}
function draw(rt){const t=remap(rt);x.fillStyle=BG;x.fillRect(0,0,W,H);x.globalAlpha=.06;x.fillStyle='#000';for(let y=0;y<H;y+=6)x.fillRect(0,y,W,2);x.globalAlpha=1;hud(t);
 // Başlık 0–3 (üst bölge)
 const a0=seg(t,.2,.6);T(M.att+' – '+M.def,72,230,30,MUT,a0,500,true,3);wrap(M.title,72,300,54,936,60,INK,a0,700);
 // Saha 1.2–
 pitch(seg(t,1,.5),E(seg(t,1,1.6)));
 // Oyuncular 2.4–
 S.players.forEach((p,i)=>{const o=seg(t,2.4+i*.06,.4);const hl=t>9&&p.team==='def'&&!p.gk&&inCone(p);player(p,o,hl,i);});
 // Pas 5–6.8
 if(S.pass){const pa=E(seg(t,5,1.6));if(pa>0){const A=P(S.pass.from[0],S.pass.from[1]),B=P(S.pass.to[0],S.pass.to[1]);x.save();x.strokeStyle=INK;x.lineWidth=3;x.setLineDash([12,10]);x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(A[0]+(B[0]-A[0])*pa,A[1]+(B[1]-A[1])*pa);x.stroke();x.restore();
  const bx=A[0]+(B[0]-A[0])*pa,by=A[1]+(B[1]-A[1])*pa;if(t<9.5){x.fillStyle=INK;x.beginPath();x.arc(bx,by,8,0,7);x.fill();}
  T('PAS · '+S.pass.by.toUpperCase(),72,PY+PH+70,24,MUT,seg(t,5,.4)*(1-seg(t,7.6,.4)),500,true,3);}}
 // Şut konisi 7.4–
 const ca=seg(t,7.4,.8);if(ca>0){const s=P(S.shot[0],S.shot[1]),g1=P(120,36.34),g2=P(120,43.66);x.save();x.globalAlpha=ca*.18;x.fillStyle=BLUE;x.beginPath();x.moveTo(s[0],s[1]);x.lineTo(g1[0],g1[1]);x.lineTo(g2[0],g2[1]);x.closePath();x.fill();x.globalAlpha=ca;x.strokeStyle=BLUE;x.lineWidth=2;x.beginPath();x.moveTo(g1[0],g1[1]);x.lineTo(s[0],s[1]);x.lineTo(g2[0],g2[1]);x.stroke();x.restore();}
 // Ölçümler 8.4–12.8 (alt bölge)
 const ma=seg(t,8.4,.5)*(1-seg(t,12.6,.4));const by0=PY+PH+120;
 [['UZAKLIK',S.dist_m.toString().replace('.',',')+' m'],['ÖNÜNDEKİ SAVUNMACI',String(S.defenders_in_cone)],['VURUŞ',S.header?'Kafa':'Ayak']].forEach(([k,v],i)=>{const o=ma*seg(t,8.4+i*.5,.4);T(k,72,by0+i*120,24,MUT,o,500,true,3);T(v,W-72,by0+i*120,52,INK,o,500,true,0,'right');x.save();x.globalAlpha=o;x.fillStyle=DIM;x.fillRect(72,by0+i*120+30,W-144,2);x.restore();});
 // xG 12.8–16
 const xa=seg(t,12.8,.5);if(xa>0){const v=S.xg*100*E(seg(t,12.9,1.4));T('GOL OLASILIĞI (xG)',72,by0,24,MUT,xa,500,true,3);T('%'+v.toFixed(1).replace('.',','),72,by0+170,190,BLUE,xa,500,true,-6);
  T('Motor %'+(S.xg*100).toFixed(1).replace('.',',')+' · StatsBomb %'+(S.sb_xg*100).toFixed(1).replace('.',','),72,by0+230,24,MUT,xa*seg(t,13.6,.4),500,true,2);
  wrap(M.claude,72,by0+300,32,936,44,'#c9d0db',xa*seg(t,14.2,.5),400);}
 // Top kaleye 13.4–14.4
 const ba=E(seg(t,13.6,.7));if(ba>0&&t<18.2){const A=P(S.shot[0],S.shot[1]),B=P(S.end[0],S.end[1]);const bx=A[0]+(B[0]-A[0])*ba,by=A[1]+(B[1]-A[1])*ba;x.save();x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(bx,by);x.stroke();x.fillStyle=INK;x.beginPath();x.arc(bx,by,9,0,7);x.fill();x.restore();
  if(ba>=1&&S.outcome==='Goal'){const g=P(120,40);T('GOL',g[0]+70,g[1]+46,44,AMB,seg(t,14.3,.3)*(1-seg(t,17.8,.3)),700,false,4,'left');}}
 // Kapanış 16.6–19 (alt bölge üstüne)
 const ka=seg(t,16.8,.5);if(ka>0){x.save();x.globalAlpha=ka;x.fillStyle=BG;x.fillRect(60,PY+PH+40,W-120,H-PY-PH-200);x.restore();
  const k=Math.round(S.xg*100);wrap('100 benzer şuttan yaklaşık '+(k<1?'1':k)+' tanesi gol olur.',72,PY+PH+140,46,936,58,INK,ka,700);
  wrap(M.question,72,PY+PH+330,38,936,50,MUT,ka*seg(t,17.4,.4),700);T('Bahis tavsiyesi değildir.',72,H-170,20,MUT,ka,500,true,1);}}
window.draw=draw;</script>`;
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(page); await pg.waitForTimeout(400); await pg.evaluate(() => document.fonts.ready);
  if (process.env.STILLS) { for (const t of process.env.STILLS.split(',')) { await pg.evaluate(v => window.draw(+v), t); await pg.screenshot({ path: OUT.replace('.mp4', `-${t}.png`) }); } await br.close(); return; }
  const tmp = OUT + '.silent.mp4';
  const f = spawn('ffmpeg', ['-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',tmp], { stdio: ['pipe','ignore','ignore'] });
  for (let i = 0; i < FPS * DUR; i++) { const d = await pg.evaluate(t => { window.draw(t); return document.getElementById('c').toDataURL('image/jpeg', .9).split(',')[1]; }, i / FPS); if (!f.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => f.stdin.once('drain', r)); }
  f.stdin.end(); await new Promise(r => f.on('close', r)); await br.close();
  const music = path.join(R, 'audio', 'planck-arka-plan-radar-quiet.m4a');
  await new Promise((res, rej) => spawn('ffmpeg', ['-y','-i',tmp,'-i',music,'-filter_complex',`[1:a]atrim=20:${20+DUR},asetpts=PTS-STARTPTS,afade=t=in:d=0.6,afade=t=out:st=${DUR-1.8}:d=1.6,loudnorm=I=-14:TP=-1.5[a]`,'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-shortest',OUT], { stdio: 'ignore' }).on('close', c => c ? rej(new Error('ffmpeg')) : res()));
  fs.unlinkSync(tmp); console.log(OUT);
})();
