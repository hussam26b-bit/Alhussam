/* الواجهة: رسم الشاشات (render) ومعالج النقرات */
function render(){
  const A=$('#app');
  if(cur){
    const p=D.find(x=>x.id===cur);if(!p){cur=null;return render()}
    const b=bal(p);
    A.innerHTML=`<div class="office row"><img class="lgs" src="${LOGO}" alt=""><div><b>${esc(O.n)}</b></div></div><div class="top"><button class="ic" data-a="back">→</button><div><h1>${esc(p.name)}</h1><small>صاحب الدين: ${esc(p.owner||'—')}</small></div><span class="sp"></span><button class="ic" data-a="ppdf" title="تصدير كشف PDF" aria-label="تصدير كشف PDF">📄</button></div>
    <div class="hero"><span>المتبقي</span><b>${fmt(b)} د.ع</b><div class="gold"></div><span style="display:block;margin-top:8px">دين: ${fmt(p.tx.filter(x=>x.t==='debt').reduce((s,x)=>s+x.a,0))} · مسدد: ${fmt(p.tx.filter(x=>x.t==='pay').reduce((s,x)=>s+x.a,0))}</span></div>
    <div class="card"><input id="amt" type="number" inputmode="decimal" placeholder="المبلغ"><input id="note" placeholder="ملاحظة (اختياري)">
    <div class="row"><button class="btn red" data-a="debt">+ إضافة دين</button><button class="btn grn" data-a="pay">− تسديد</button></div></div>
    <h2>السجل</h2>
    ${p.tx.length?p.tx.map((x,i)=>`<div class="card tx ${x.t}"><div><b class="${x.t==='debt'?'neg':'ok'}">${x.t==='debt'?'دين':'تسديد'}: ${fmt(x.a)} د.ع</b><br><small>${esc(x.d)}${x.n?' · '+esc(x.n):''}</small></div><span><button data-a="edtx" data-i="${i}" aria-label="تعديل">✏️</button><button data-a="deltx" data-i="${i}" aria-label="حذف">🗑</button></span></div>`).reverse().join(''):'<div class="empty">لا توجد حركات بعد</div>'}
    <button class="link" data-a="delp">حذف هذا الاسم</button>`;
    return;
  }
  const list=D.filter(p=>(p.name+' '+p.owner).includes(q)).sort((a,b)=>a.name.localeCompare(b.name,'ar'));
  const tot=D.reduce((s,p)=>s+Math.max(bal(p),0),0);
  A.innerHTML=`<div class="office row"><button class="oe" data-a="eoffice" aria-label="تعديل اسم المكتب">✏️</button><img class="lgb" src="${LOGO}" alt=""><div><b>${esc(O.n)}</b><small>${esc([O.a,O.p].filter(Boolean).join(' · '))}</small></div></div><div class="brand"><button class="ic" data-a="menu" aria-label="القائمة"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><div><h1>أول دين</h1><small>سجل الديون</small></div><span class="sp"></span><button class="ic" data-a="pdf" title="تصدير PDF" aria-label="تصدير PDF">📄</button></div>
  <div class="hero"><span>إجمالي الديون المتبقية</span><b>${fmt(tot)} د.ع</b><div class="gold"></div><span style="display:block;margin-top:8px">${D.length} اسم مسجّل</span></div>
  <input id="srch" placeholder="بحث بالاسم…" value="${esc(q)}">
  ${list.length?list.map(p=>{const b=bal(p);return `<div class="card item" data-a="open" data-id="${p.id}"><div class="av" style="background:hsl(${[...p.name].reduce((h,c)=>h+c.charCodeAt(0),0)%360} 45% 42%)">${esc([...p.name][0])}</div><div class="mid"><b>${esc(p.name)}</b><small>صاحب الدين: ${esc(p.owner||'—')}</small></div><span class="pill ${b>0?'neg':'ok'}">${fmt(b)} د.ع</span></div>`}).join(''):`<div class="empty">${D.length?'لا نتائج':'لا توجد أسماء بعد.<br>اضغط + لإضافة أول مديون'}</div>`}
  <div class="foot">${esc(O.n)}</div>
  <button class="fab" data-a="add" aria-label="إضافة">+</button>`;
  const s=$('#srch');if(s)s.oninput=()=>{q=s.value;const pos=s.selectionStart;render();const n=$('#srch');n.focus();n.setSelectionRange(pos,pos)};
}

function twice(key,t,label){
  if(armed===key)return true;
  armed=key;const old=t.textContent;t.textContent=label;
  setTimeout(()=>{if(armed===key){armed='';t.textContent=old}},3000);return false;
}
function addTx(type){
  const p=D.find(x=>x.id===cur);const a=parseFloat($('#amt').value);
  if(!(a>0)){toast('أدخل مبلغًا صحيحًا');return}
  p.tx.push({t:type,a,n:$('#note').value.trim(),d:new Date().toLocaleDateString('en-GB')});
  store();render();toast(type==='debt'?'تمت إضافة الدين':'تم تسجيل التسديد');
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-a]');if(!t)return;
  const a=t.dataset.a;
  if(a==='open'){cur=t.dataset.id;render();window.scrollTo(0,0)}
  else if(a==='back'){cur=null;render()}
  else if(a==='add'){$('#pn').value='';$('#po').value='';$('#sheet').hidden=false;$('#pn').focus()}
  else if(a==='closesheet')$('#sheet').hidden=true;
  else if(a==='savep'){
    const n=$('#pn').value.trim();if(!n){toast('اكتب اسم المديون');return}
    D.push({id:Date.now().toString(36),name:n,owner:$('#po').value.trim(),tx:[]});
    store();$('#sheet').hidden=true;render();
  }
  else if(a==='debt')addTx('debt');
  else if(a==='pay')addTx('pay');
  else if(a==='edtx'){const x=D.find(p=>p.id===cur).tx[+t.dataset.i];editIdx=+t.dataset.i;$('#ea').value=x.a;$('#en').value=x.n||'';$('#et').value=x.t;$('#esheet').hidden=false}
  else if(a==='closeedit')$('#esheet').hidden=true;
  else if(a==='menu')$('#drawer').hidden=false;
  else if(a==='closemenu'){if(e.target===t)t.hidden=true}
  else if(a==='theme')setTheme(t.dataset.v);
  else if(a==='backup'){$('#drawer').hidden=true;backup()}
  else if(a==='import')$('#ifile').click();
  else if(a==='about'){$('#drawer').hidden=true;$('#aoff').innerHTML=esc(O.n)+'<br><small>'+esc([O.a,O.p].filter(Boolean).join(' · '))+'</small>';$('#asheet').hidden=false}
  else if(a==='closeabout')$('#asheet').hidden=true;
  else if(a==='closei'){pend=null;$('#isheet').hidden=true}
  else if(a==='imreplace'||a==='immerge')applyImport(a==='imreplace');
  else if(a==='eoffice'){$('#on').value=O.n;$('#oa').value=O.a;$('#op').value=O.p;$('#osheet').hidden=false}
  else if(a==='closeo')$('#osheet').hidden=true;
  else if(a==='saveo'){const n=$('#on').value.trim();if(!n){toast('اكتب اسم المكتب');return}O={n,a:$('#oa').value.trim(),p:$('#op').value.trim()};storeO();$('#osheet').hidden=true;render();toast('تم تعديل بيانات المكتب')}
  else if(a==='saveedit'){const v=parseFloat($('#ea').value);if(!(v>0)){toast('أدخل مبلغًا صحيحًا');return}const x=D.find(p=>p.id===cur).tx[editIdx];x.a=v;x.n=$('#en').value.trim();x.t=$('#et').value;store();$('#esheet').hidden=true;render();toast('تم تعديل المبلغ')}
  else if(a==='deltx'){if(twice('tx'+t.dataset.i,t,'تأكيد؟')){const p=D.find(x=>x.id===cur);p.tx.splice(+t.dataset.i,1);armed='';store();render()}}
  else if(a==='delp'){if(twice('p',t,'اضغط مرة أخرى لتأكيد الحذف')){D=D.filter(x=>x.id!==cur);cur=null;armed='';store();render()}}
  else if(a==='pdf')exportPDF();
  else if(a==='ppdf')exportPerson();
});

