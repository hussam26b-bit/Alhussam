/* الملفات: حفظ/مشاركة ملف (متصفح أو أندرويد Capacitor أو Claude) */
async function getDL(){
  if(window.claude){try{return await claude.use('downloads')}catch(e){}}
  return {save:async({filename,data})=>{
    const P=window.Capacitor&&Capacitor.Plugins;
    if(P&&P.Filesystem&&P.Share){
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(data)});
      const f=await P.Filesystem.writeFile({path:filename,data:b64,directory:'CACHE'});
      await P.Share.share({title:filename,url:f.uri,dialogTitle:'حفظ أو مشاركة الملف'});
    }else{
      const a=document.createElement('a');a.href=URL.createObjectURL(data);a.download=filename;document.body.appendChild(a);a.click();a.remove();
    }
  }};
}
