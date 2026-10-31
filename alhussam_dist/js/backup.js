/* النسخ الاحتياطي: تصدير واستيراد ملف .hussam */
const BACKUP_NAME='Alhussam_AwwalDeen_Data.hussam';
async function backup(){
  const dl=await getDL();
  const d=new Date().toISOString().slice(0,10);
  try{await dl.save({filename:BACKUP_NAME,data:new Blob([JSON.stringify({app:'awwal-deen',v:1,date:d,office:O,data:D})],{type:'application/octet-stream'})});toast('تم تجهيز النسخة الاحتياطية')}
  catch(e){if(!e||e.code!=='declined')toast('تعذر حفظ الملف')}
}
let pend=null;
$('#ifile').onchange=async e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  if(!/\.hussam$/i.test(f.name)){toast('اختر ملف نسخة بامتداد .hussam فقط');return}
  try{
    const txt=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result));r.onerror=rej;r.readAsText(f)});
    const j=JSON.parse(txt);const arr=Array.isArray(j)?j:j.data;
    if(!Array.isArray(arr)||arr.some(p=>!p||typeof p.name!=='string'||!Array.isArray(p.tx)))throw 0;
    pend={office:j.office,arr:arr.map(p=>({id:String(p.id||Date.now().toString(36)+Math.random().toString(36).slice(2,6)),name:p.name,owner:String(p.owner||''),tx:p.tx.filter(x=>x&&(x.t==='debt'||x.t==='pay')&&x.a>0).map(x=>({t:x.t,a:+x.a,n:String(x.n||''),d:String(x.d||'')}))}))};
    $('#itxt').textContent='تم العثور على '+pend.arr.length+' اسم في النسخة. «استبدال» يمسح البيانات الحالية ويضع النسخة مكانها، و«دمج» يضيف الأسماء الجديدة فقط ويترك الموجودة كما هي.';
    $('#drawer').hidden=true;$('#isheet').hidden=false;
  }catch(err){toast('الملف غير صالح')}
};
function applyImport(replace){
  if(!pend)return;
  if(replace){D=pend.arr;const o=pend.office;if(o&&typeof o.n==='string'&&o.n){O={n:o.n,a:String(o.a||''),p:String(o.p||'')};storeO()}}
  else{const ids=new Set(D.map(p=>p.id));pend.arr.forEach(p=>{if(!ids.has(p.id))D.push(p)})}
  store();pend=null;$('#isheet').hidden=true;cur=null;render();toast('تم استيراد النسخة');
}
