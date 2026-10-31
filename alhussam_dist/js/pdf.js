/* PDF: لافتة المكتب وقائمة الديون وكشف حساب كل مدين */
/* ---------- تصدير PDF ---------- */
const W=1240,H=1754,F='Tahoma, Arial, sans-serif',PER=18;
function drawPage(rows,pi,np,total,start){
  const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#fff';g.fillRect(0,0,W,H);g.direction='rtl';g.textBaseline='middle';
  banner(g);
  g.fillStyle='#0b4f4a';g.textAlign='right';g.font='bold 40px '+F;g.fillText('قائمة الديون',W-80,288);
  g.fillStyle='#6b7684';g.textAlign='left';g.font='28px '+F;g.fillText(new Date().toLocaleDateString('en-GB'),80,288);
  const X=[W-80,W-170,W-560,W-900];
  const cut=(s,w)=>{while(g.measureText(s).width>w&&s.length>1)s=s.slice(0,-1);return s};
  g.textAlign='right';g.fillStyle='#e6f2f1';g.fillRect(60,320,W-120,64);
  g.fillStyle='#0b4f4a';g.font='bold 28px '+F;
  ['#','المديون','صاحب الدين','المتبقي'].forEach((h,i)=>g.fillText(h,X[i],352));
  rows.forEach((p,i)=>{
    const y=384+i*64;
    if(i%2)for(let k=0;k<1;k++){g.fillStyle='#f6f8fa';g.fillRect(60,y,W-120,64)}
    g.fillStyle='#1b2430';g.font='28px '+F;
    g.fillText(String(start+i+1),X[0],y+32);
    g.fillText(cut(p.name,370),X[1],y+32);
    g.fillText(cut(p.owner||'—',320),X[2],y+32);
    const b=bal(p);g.fillStyle=b>0?'#c0392b':'#15803d';g.font='bold 28px '+F;
    g.fillText(fmt(b)+' د.ع',X[3],y+32);
  });
  if(pi===np-1){
    const y=384+rows.length*64+30;
    g.fillStyle='#0f766e';g.fillRect(60,y,W-120,76);
    g.fillStyle='#fff';g.font='bold 32px '+F;g.fillText('إجمالي الديون المتبقية: '+fmt(total)+' د.ع',W-90,y+38);
  }
  g.fillStyle='#6b7684';g.font='24px '+F;g.textAlign='center';g.fillText((pi+1)+' / '+np,W/2,H-50);
  const s=c.toDataURL('image/jpeg',0.92).split(',')[1];
  return Uint8Array.from(atob(s),ch=>ch.charCodeAt(0));
}
function banner(g){
  const gr=g.createLinearGradient(0,0,W,250);gr.addColorStop(0,'#083f3b');gr.addColorStop(1,'#14907f');
  g.fillStyle=gr;g.fillRect(0,0,W,250);
  g.fillStyle='rgba(255,255,255,.07)';
  [[120,60,150],[330,200,110],[40,230,80]].forEach(([x,y,r])=>{g.beginPath();g.arc(x,y,r,0,7);g.fill()});
  g.fillStyle='#d4a537';g.fillRect(0,242,W,8);
  const cx=W-185,cy=122;
  if(LI.complete&&LI.naturalWidth){const lw=270,lh=lw*LI.naturalHeight/LI.naturalWidth;g.drawImage(LI,cx-lw/2,cy-lh/2,lw,lh)}
  g.textAlign='right';
  const x=W-350;
  g.fillStyle='#fff';let fs=68;g.font='bold '+fs+'px '+F;while(g.measureText(O.n).width>W-440&&fs>28){fs-=2;g.font='bold '+fs+'px '+F}g.fillText(O.n,x,92);
  g.fillStyle='#d4a537';g.fillRect(x-160,140,160,5);
  g.fillStyle='rgba(255,255,255,.9)';
  g.font='28px '+F;g.fillText([O.a,O.p].filter(Boolean).join('   |   '),x,196);
}
function drawStatement(p,rows,pi,np,start,sum){
  const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#fff';g.fillRect(0,0,W,H);g.direction='rtl';g.textBaseline='middle';
  const cut=(s,w)=>{while(g.measureText(s).width>w&&s.length>1)s=s.slice(0,-1);return s};
  banner(g);
  g.fillStyle='#0b4f4a';g.textAlign='right';g.font='bold 40px '+F;g.fillText('كشف حساب',W-80,288);
  g.fillStyle='#6b7684';g.textAlign='left';g.font='28px '+F;g.fillText(new Date().toLocaleDateString('en-GB'),80,288);
  g.textAlign='right';g.fillStyle='#1b2430';g.font='bold 34px '+F;g.fillText(cut('المديون: '+p.name,W-160),W-80,342);
  g.fillStyle='#6b7684';g.font='28px '+F;g.fillText(cut('صاحب الدين: '+(p.owner||'—'),W-160),W-80,388);
  const X=[W-80,W-150,W-370,W-500,W-780,W-1010];
  g.fillStyle='#e6f2f1';g.fillRect(60,416,W-120,64);g.fillStyle='#0b4f4a';g.font='bold 26px '+F;
  ['#','التاريخ','النوع','المبلغ','الرصيد','ملاحظة'].forEach((h,i)=>g.fillText(h,X[i],448));
  rows.forEach((r,i)=>{
    const y=480+i*64;
    if(i%2){g.fillStyle='#f6f8fa';g.fillRect(60,y,W-120,64)}
    g.fillStyle='#1b2430';g.font='26px '+F;
    g.fillText(String(start+i+1),X[0],y+32);g.fillText(r.x.d,X[1],y+32);
    g.fillStyle=r.x.t==='debt'?'#c0392b':'#15803d';g.font='bold 26px '+F;
    g.fillText(r.x.t==='debt'?'دين':'تسديد',X[2],y+32);g.fillText(fmt(r.x.a),X[3],y+32);
    g.fillStyle='#1b2430';g.font='26px '+F;g.fillText(fmt(r.run),X[4],y+32);
    g.fillStyle='#6b7684';g.fillText(cut(r.x.n||'',150),X[5],y+32);
  });
  if(!rows.length){g.fillStyle='#6b7684';g.font='28px '+F;g.textAlign='center';g.fillText('لا توجد حركات',W/2,540)}
  if(pi===np-1){
    const y=480+rows.length*64+30;
    g.textAlign='right';g.fillStyle='#0f766e';g.fillRect(60,y,W-120,110);
    g.fillStyle='#fff';g.font='26px '+F;g.fillText('إجمالي الدين: '+fmt(sum.d)+'   |   المسدد: '+fmt(sum.p),W-90,y+34);
    g.font='bold 36px '+F;g.fillText('المتبقي: '+fmt(sum.d-sum.p)+' د.ع',W-90,y+80);
  }
  g.fillStyle='#6b7684';g.font='24px '+F;g.textAlign='center';g.fillText((pi+1)+' / '+np,W/2,H-50);
  const s=c.toDataURL('image/jpeg',0.92).split(',')[1];
  return Uint8Array.from(atob(s),ch=>ch.charCodeAt(0));
}
async function exportPerson(){
  const p=D.find(x=>x.id===cur);if(!p)return;
  const dl=await getDL();
  if(!dl){toast('التصدير غير متاح في هذا العرض');return}
  let run=0;const all=p.tx.map(x=>{run+=x.t==='debt'?x.a:-x.a;return{x,run}});
  const sum={d:p.tx.filter(x=>x.t==='debt').reduce((s,x)=>s+x.a,0),p:p.tx.filter(x=>x.t==='pay').reduce((s,x)=>s+x.a,0)};
  const N=16,np=Math.max(1,Math.ceil(all.length/N)),imgs=[];
  for(let i=0;i<np;i++)imgs.push(drawStatement(p,all.slice(i*N,(i+1)*N),i,np,i*N,sum));
  try{await dl.save({filename:'awwal-deen-statement.pdf',data:buildPDF(imgs)});toast('تم تجهيز الكشف')}
  catch(e){if(!e||e.code!=='declined')toast('تعذر حفظ الملف')}
}
function buildPDF(imgs){
  const enc=new TextEncoder(),parts=[],offs=[];let len=0;
  const add=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);len+=b.length};
  const obj=(id,body)=>{offs[id]=len;add(id+' 0 obj\n'+body+'\nendobj\n')};
  const n=imgs.length;add('%PDF-1.4\n');
  obj(1,'<</Type/Catalog/Pages 2 0 R>>');
  obj(2,'<</Type/Pages/Count '+n+'/Kids['+imgs.map((_,i)=>(3+3*i)+' 0 R').join(' ')+']>>');
  imgs.forEach((j,i)=>{
    const p=3+3*i,cs='q 595 0 0 842 0 0 cm /Im0 Do Q';
    obj(p,'<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</XObject<</Im0 '+(p+2)+' 0 R>>>>/Contents '+(p+1)+' 0 R>>');
    obj(p+1,'<</Length '+cs.length+'>>\nstream\n'+cs+'\nendstream');
    offs[p+2]=len;add((p+2)+' 0 obj\n<</Type/XObject/Subtype/Image/Width '+W+'/Height '+H+'/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+j.length+'>>\nstream\n');
    add(j);add('\nendstream\nendobj\n');
  });
  const tot=3+3*n,xr=len;
  add('xref\n0 '+tot+'\n0000000000 65535 f \n');
  for(let i=1;i<tot;i++)add(String(offs[i]).padStart(10,'0')+' 00000 n \n');
  add('trailer\n<</Size '+tot+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF');
  return new Blob(parts,{type:'application/pdf'});
}
async function exportPDF(){
  if(!D.length){toast('لا توجد ديون للتصدير');return}
  const dl=await getDL();
  if(!dl){toast('التصدير غير متاح في هذا العرض');return}
  const rows=D.slice().sort((a,b)=>a.name.localeCompare(b.name,'ar'));
  const total=rows.reduce((s,p)=>s+Math.max(bal(p),0),0);
  const np=Math.ceil(rows.length/PER),imgs=[];
  for(let i=0;i<np;i++)imgs.push(drawPage(rows.slice(i*PER,(i+1)*PER),i,np,total,i*PER));
  try{await dl.save({filename:'awwal-deen-debts.pdf',data:buildPDF(imgs)});toast('تم تجهيز الملف')}
  catch(e){if(!e||e.code!=='declined')toast('تعذر حفظ الملف')}
}
