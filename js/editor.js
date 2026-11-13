window.CoverEditor = (() => {
  const paper = document.getElementById("paper"), layer = document.getElementById("designLayer");
  let selected = null, zoom = .7, page = {w:210,h:297,orientation:"portrait"}, margin=8, nextId=1;
  const $ = id => document.getElementById(id);
  const mmPx = mm => mm * (96/25.4);
  const pxMm = px => px / (96/25.4);
  function updatePaper(){
    let w=page.w,h=page.h;if(page.orientation==="landscape" && w<h)[w,h]=[h,w];if(page.orientation==="portrait"&&w>h)[w,h]=[h,w];
    page.renderW=w;page.renderH=h;
    paper.style.width=mmPx(w)+"px";paper.style.height=mmPx(h)+"px";
    paper.style.transform=`scale(${zoom})`;
    $("safeMargin").style.inset=margin+"mm";
    $("dimensionLabel").textContent=`${$("paperSize").value==="custom"?"Custom":$("paperSize").value} · ${w} × ${h} mm`;
    $("zoomValue").textContent=Math.round(zoom*100)+"%";
  }
  function setPageSize(key){
    const sizes={A4:[210,297],A3:[297,420],A5:[148,210],Letter:[215.9,279.4],Legal:[215.9,355.6]};
    if(sizes[key]){page.w=sizes[key][0];page.h=sizes[key][1]}
    else {page.w=+$("customWidth").value||210;page.h=+$("customHeight").value||297}
    updatePaper();
  }
  function select(el){
    document.querySelectorAll(".design-item.selected").forEach(n=>n.classList.remove("selected"));
    selected=el;if(el){el.classList.add("selected");$("emptyProperties").classList.add("hidden");$("propertiesForm").classList.remove("hidden");syncProperties()}
    else {$("emptyProperties").classList.remove("hidden");$("propertiesForm").classList.add("hidden")}
  }
  function makeText(text="Double-click to edit",opts={}){
    const el=document.createElement("div");el.className="design-item text";el.dataset.id=nextId++;el.dataset.kind="text";
    el.textContent=text;Object.assign(el.style,{left:(opts.x??20)+"%",top:(opts.y??20)+"%",width:(opts.w??60)+"%",height:(opts.h??10)+"%",fontSize:(opts.size??22)+"px",fontFamily:opts.font||"Inter",fontWeight:opts.bold?"700":"400",fontStyle:opts.italic?"italic":"normal",textAlign:opts.align||"left",color:opts.color||"#20243a",lineHeight:opts.lineHeight||"1.3",justifyContent:opts.align==="center"?"center":opts.align==="right"?"flex-end":"flex-start"});
    el.dataset.bold=opts.bold?"1":"0";el.dataset.italic=opts.italic?"1":"0";el.dataset.align=opts.align||"left";el.dataset.encoding="unicode";
    layer.appendChild(el);attachItem(el);select(el);return el;
  }
  function addLogo(data){
    const el=document.createElement("div");el.className="design-item logo";el.dataset.id=nextId++;el.dataset.kind="logo";
    el.style.cssText="left:40%;top:35%;width:20%;height:15%";
    const img=document.createElement("img");img.src=data;el.appendChild(img);layer.appendChild(el);attachItem(el);select(el);
  }
  function attachItem(el){
    el.addEventListener("pointerdown",e=>{
      if(e.target===el && e.offsetX>el.clientWidth-15 && e.offsetY>el.clientHeight-15){startResize(e,el);return}
      select(el);if(el.dataset.kind==="text"&&e.detail===2){el.contentEditable="true";el.focus();return}
      if(el.isContentEditable)return;
      startDrag(e,el);
    });
    el.addEventListener("blur",()=>{el.contentEditable="false";syncProperties()});
    el.addEventListener("input",()=>{if(selected===el)$("textContent").value=el.textContent});
  }
  function startDrag(e,el){
    e.preventDefault();const rect=paper.getBoundingClientRect(),startX=e.clientX,startY=e.clientY;
    const l=parseFloat(el.style.left),t=parseFloat(el.style.top);
    const move=ev=>{el.style.left=Math.max(0,Math.min(100, l+(ev.clientX-startX)/(rect.width/zoom)*100))+"%";el.style.top=Math.max(0,Math.min(100,t+(ev.clientY-startY)/(rect.height/zoom)*100))+"%";syncPosition()};
    const up=()=>{window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up)};
    window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);
  }
  function startResize(e,el){
    e.preventDefault();e.stopPropagation();const startX=e.clientX,startY=e.clientY,w=parseFloat(el.style.width),h=parseFloat(el.style.height),rect=paper.getBoundingClientRect();
    const move=ev=>{el.style.width=Math.max(3,Math.min(100,w+(ev.clientX-startX)/(rect.width/zoom)*100))+"%";el.style.height=Math.max(2,Math.min(100,h+(ev.clientY-startY)/(rect.height/zoom)*100))+"%";syncPosition()};
    const up=()=>{window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up)};window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);
  }
  function syncProperties(){
    if(!selected)return;const el=selected,isText=el.dataset.kind==="text";
    $("selectedType").textContent=isText?"TEXT ELEMENT":"IMAGE ELEMENT";
    $("textContent").parentElement.style.display=isText?"block":"none";
    ["fontSize","fontFamily","boldBtn","italicBtn","alignLeft","alignCenter","alignRight","textColor","lineHeight","encodingMode","fontInput"].forEach(id=>{const n=$(id);if(n)n.closest("label,.field-label,.two-fields,.style-buttons,.upload-font")?.classList.toggle("hidden",!isText)});
    if(isText){
      $("textContent").value=el.textContent;$("fontSize").value=parseFloat(el.style.fontSize)||22;$("fontFamily").value=el.style.fontFamily.replaceAll('"',"")||"Inter";
      $("textColor").value=rgbToHex(el.style.color);$("lineHeight").value=parseFloat(el.style.lineHeight)||1.3;$("encodingMode").value=el.dataset.encoding||"unicode";
      $("boldBtn").classList.toggle("active",el.dataset.bold==="1");$("italicBtn").classList.toggle("active",el.dataset.italic==="1");
      ["Left","Center","Right"].forEach(a=>$("align"+a).classList.toggle("active",el.dataset.align===a.toLowerCase()));
    }
    syncPosition();
  }
  function syncPosition(){
    if(!selected)return;const w=page.renderW,h=page.renderH;
    $("posX").value=(parseFloat(selected.style.left)/100*w).toFixed(1);$("posY").value=(parseFloat(selected.style.top)/100*h).toFixed(1);
    $("elemW").value=(parseFloat(selected.style.width)/100*w).toFixed(1);$("elemH").value=(parseFloat(selected.style.height)/100*h).toFixed(1);
  }
  function rgbToHex(v){const m=v.match(/\d+/g);return m?"#"+m.slice(0,3).map(x=>(+x).toString(16).padStart(2,"0")).join(""):"#20243a"}
  function setField(id,fn){$(id).addEventListener("input",()=>{if(selected)fn(selected,$(id).value)})}
  function remove(){if(selected){selected.remove();select(null)}}
  function addStructure(name){
    layer.innerHTML="";select(null);const items=window.CoverTemplates.structures[name]||[];
    items.forEach(o=>makeText(o.text,{...o,x:o.x,y:o.y,w:o.w,h:o.h}));
    select(null);toast("Structure added. Edit each text block to make it yours.");
  }
  function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
  function init(){
    updatePaper();window.CoverTemplates.applyBackground(paper,"aurora");
    $("addTextBtn").onclick=()=>makeText("Your text here");
    document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>makeText(b.dataset.quick));
    $("logoInput").onchange=e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=()=>addLogo(r.result);r.readAsDataURL(f)}e.target.value=""};
    document.querySelectorAll("[data-bg]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".template-card").forEach(n=>n.classList.remove("selected"));b.classList.add("selected");window.CoverTemplates.applyBackground(paper,b.dataset.bg)});
    document.querySelectorAll("[data-structure]").forEach(b=>b.onclick=()=>addStructure(b.dataset.structure));
    document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab,.tab-panel").forEach(n=>n.classList.remove("active"));b.classList.add("active");$("tab-"+b.dataset.tab).classList.add("active")});
    $("paperSize").onchange=()=>{$("customSize").classList.toggle("hidden",$("paperSize").value!=="custom");setPageSize($("paperSize").value)};
    $("customWidth").oninput=$("customHeight").oninput=()=>setPageSize("custom");
    document.querySelectorAll("[data-orientation]").forEach(b=>b.onclick=()=>{page.orientation=b.dataset.orientation;document.querySelectorAll("[data-orientation]").forEach(n=>n.classList.toggle("active",n===b));updatePaper()});
    $("pageColor").oninput=e=>paper.style.backgroundColor=e.target.value;
    $("marginRange").oninput=e=>{margin=+e.target.value;$("marginValue").textContent=margin+" mm";$("safeMargin").style.inset=margin+"mm"};
    $("zoomIn").onclick=()=>{zoom=Math.min(1.5,zoom+.1);updatePaper()};$("zoomOut").onclick=()=>{zoom=Math.max(.3,zoom-.1);updatePaper()};
    $("deleteSelected").onclick=$("removeElement").onclick=remove;
    $("resetBtn").onclick=()=>{layer.innerHTML="";select(null);window.CoverTemplates.applyBackground(paper,"aurora");$("pageColor").value="#ffffff";paper.style.backgroundColor="";toast("Design cleared.")};
    $("textContent").oninput=e=>{if(selected?.dataset.kind==="text")selected.textContent=e.target.value};
    setField("fontSize",(el,v)=>el.style.fontSize=Math.max(6,Math.min(160,+v||22))+"px");
    $("fontFamily").onchange=e=>{if(selected?.dataset.kind==="text")selected.style.fontFamily=e.target.value};
    $("textColor").oninput=e=>{if(selected?.dataset.kind==="text")selected.style.color=e.target.value};
    $("lineHeight").oninput=e=>{if(selected?.dataset.kind==="text")selected.style.lineHeight=e.target.value};
    $("boldBtn").onclick=()=>{if(selected?.dataset.kind==="text"){selected.dataset.bold=selected.dataset.bold==="1"?"0":"1";selected.style.fontWeight=selected.dataset.bold==="1"?"700":"400";syncProperties()}};
    $("italicBtn").onclick=()=>{if(selected?.dataset.kind==="text"){selected.dataset.italic=selected.dataset.italic==="1"?"0":"1";selected.style.fontStyle=selected.dataset.italic==="1"?"italic":"normal";syncProperties()}};
    ["Left","Center","Right"].forEach(a=>$("align"+a).onclick=()=>{if(selected?.dataset.kind==="text"){selected.dataset.align=a.toLowerCase();selected.style.textAlign=a.toLowerCase();selected.style.justifyContent=a==="Left"?"flex-start":a==="Right"?"flex-end":"center";syncProperties()}});
    $("encodingMode").onchange=e=>{if(selected)selected.dataset.encoding=e.target.value; if(e.target.value==="ansi")toast("ANSI mode selected. Use matching legacy-encoded text and font.")};
    $("fontInput").onchange=e=>{const f=e.target.files[0];if(f){const family="CustomFont"+Date.now(),url=URL.createObjectURL(f),face=new FontFace(family,`url(${url})`);face.load().then(loaded=>{document.fonts.add(loaded);const o=new Option(family,family);$("fontFamily").add(o);$("fontFamily").value=family;if(selected)selected.style.fontFamily=family;toast("Custom font loaded for this session.")}).catch(()=>toast("Could not load that font."))}e.target.value=""};
    ["posX","posY","elemW","elemH"].forEach(id=>$(id).onchange=()=>{if(!selected)return;const v=+$(id).value,dim=id==="posX"||id==="elemW"?page.renderW:page.renderH,prop={posX:"left",posY:"top",elemW:"width",elemH:"height"}[id];selected.style[prop]=Math.max(0,Math.min(100,v/dim*100))+"%"});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")select(null);if((e.key==="Delete"||e.key==="Backspace")&&selected&&!["TEXTAREA","INPUT"].includes(document.activeElement.tagName)&&!selected.isContentEditable)remove()});
  }
  return {init,select,get paper(){return paper},get page(){return page},get zoom(){return zoom},toast,reset:()=>{layer.innerHTML="";select(null)}};
})();