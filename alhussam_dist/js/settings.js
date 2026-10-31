/* الإعدادات: الثيم (تلقائي/فاتح/داكن) */
/* ---------- القائمة والنسخ الاحتياطي ---------- */
let tv='auto';try{tv=localStorage.getItem('awwal_deen_theme')||'auto'}catch(e){}
function setTheme(v){tv=v;const r=document.documentElement;if(v==='auto')r.removeAttribute('data-theme');else r.dataset.theme=v;try{localStorage.setItem('awwal_deen_theme',v)}catch(e){}document.querySelectorAll('#seg button').forEach(b=>b.classList.toggle('on',b.dataset.v===v))}
setTheme(tv);
