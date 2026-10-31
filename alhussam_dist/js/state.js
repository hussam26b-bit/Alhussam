/* الحالة والبيانات: الديون O (بيانات المكتب) والتخزين المحلي ودوال مساعدة */
const K='awwal_deen_v1';let D=[];
try{D=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){D=[]}
const store=()=>{try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}};
let O={n:'مكتب حسام للطباعة والاستنساخ',a:'سامراء – حي المعتصم',p:'07712151775'};
try{Object.assign(O,JSON.parse(localStorage.getItem('awwal_deen_office')||'{}'))}catch(e){}
const storeO=()=>{try{localStorage.setItem('awwal_deen_office',JSON.stringify(O))}catch(e){}};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>Number(n).toLocaleString('en-US');
const bal=p=>p.tx.reduce((s,x)=>s+(x.t==='debt'?x.a:-x.a),0);
let cur=null,q='',armed='',editIdx=-1;
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2500)}

