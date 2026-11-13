document.addEventListener("DOMContentLoaded",()=>{
  CoverEditor.init();
  const modal=document.getElementById("exportModal");
  document.getElementById("exportBtn").onclick=()=>modal.classList.remove("hidden");
  document.getElementById("closeExport").onclick=()=>modal.classList.add("hidden");
  modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
  document.getElementById("downloadJpg").onclick=()=>CoverExport.jpg();
  document.getElementById("downloadPdf").onclick=()=>CoverExport.pdf();
  document.querySelector(".canvas-title b").textContent="Untitled cover";
});