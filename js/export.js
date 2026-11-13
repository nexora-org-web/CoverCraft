window.CoverExport = (() => {
  const $=id=>document.getElementById(id);
  async function render(){
    const paper=CoverEditor.paper;
    if(!window.html2canvas){CoverEditor.toast("Export library could not load. Check your internet connection.");throw new Error("html2canvas missing")}
    document.fonts?.ready && await document.fonts.ready;
    paper.classList.add("exporting");
    const canvas=await html2canvas(paper,{scale:3,backgroundColor:null,useCORS:true,logging:false,width:paper.offsetWidth,height:paper.offsetHeight});
    paper.classList.remove("exporting");return canvas;
  }
  function filename(ext){return "covercraft-cover."+ext}
  async function jpg(){
    try{const c=await render(),a=document.createElement("a");a.download=filename("jpg");a.href=c.toDataURL("image/jpeg",.96);a.click();CoverEditor.toast("High-resolution JPG downloaded.");}
    catch(e){CoverEditor.toast("Could not export JPG. Please try again.");}
  }
  async function pdf(){
    try{
      if(!window.jspdf?.jsPDF){CoverEditor.toast("PDF library could not load. Check your internet connection.");return}
      const c=await render(),data=c.toDataURL("image/jpeg",.98),p=CoverEditor.page;
      const doc=new jspdf.jsPDF({orientation:p.renderW>p.renderH?"landscape":"portrait",unit:"mm",format:[p.renderW,p.renderH],compress:true});
      doc.addImage(data,"JPEG",0,0,p.renderW,p.renderH,undefined,"FAST");doc.save(filename("pdf"));CoverEditor.toast("PDF downloaded.");
    }catch(e){CoverEditor.toast("Could not export PDF. Please try again.");}
  }
  return {jpg,pdf};
})();