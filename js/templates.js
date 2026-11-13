/* Original, locally generated background designs. */
window.CoverTemplates = {
  applyBackground(paper, name) {
    paper.dataset.bg = name;
    const styles = {
      aurora: `background:linear-gradient(145deg,#f3f3ff 0%,#e6e4ff 48%,#d4e9f0 100%);`,
      grid: `background-color:#fbfbfd;background-image:linear-gradient(#6f78a51c 1px,transparent 1px),linear-gradient(90deg,#6f78a51c 1px,transparent 1px);background-size:12mm 12mm;`,
      science: `background:radial-gradient(ellipse at 90% 10%,#c9e6d3 0,transparent 38%),linear-gradient(145deg,#f6fbf7,#e7f2e9);`,
      math: `background:linear-gradient(135deg,#f6f8fc,#e5eaf5);`,
      literature: `background:linear-gradient(130deg,#f5efe5,#e9dfce);`,
      plain: `background:#ffffff;`
    };
    paper.style.cssText += styles[name] || styles.aurora;
    paper.querySelector(".bg-decoration")?.remove();
    const deco = document.createElement("div");
    deco.className = "bg-decoration";
    deco.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden";
    if (name === "aurora") deco.innerHTML = `<svg viewBox="0 0 800 1100" preserveAspectRatio="none" width="100%" height="100%"><circle cx="790" cy="80" r="230" fill="#7969c9" opacity=".13"/><circle cx="800" cy="90" r="155" fill="#b96d9f" opacity=".12"/><path d="M0 870 Q260 740 480 910 T800 820 V1100 H0Z" fill="#8296d3" opacity=".12"/></svg>`;
    if (name === "grid") deco.innerHTML = `<svg viewBox="0 0 800 1100" width="100%" height="100%"><path d="M650 0 L800 0 L800 270Z" fill="#6b76ae" opacity=".18"/><circle cx="710" cy="170" r="95" fill="none" stroke="#7784bd" stroke-width="5" opacity=".55"/><path d="M0 970 L160 810 L320 970" fill="none" stroke="#7784bd" stroke-width="8" opacity=".22"/></svg>`;
    if (name === "science") deco.innerHTML = `<svg viewBox="0 0 800 1100" width="100%" height="100%"><g fill="none" stroke="#599875" opacity=".28" stroke-width="5"><path d="M690 40 C520 170 760 280 600 410 S740 650 610 780"/><path d="M690 40 C820 150 550 260 720 410 S550 650 700 780"/><circle cx="660" cy="410" r="105"/></g><path d="M0 0 H800" stroke="#75a78a" stroke-width="14" opacity=".3"/></svg>`;
    if (name === "math") deco.innerHTML = `<svg viewBox="0 0 800 1100" width="100%" height="100%"><g fill="#6b7eae" opacity=".12" font-family="Georgia" font-size="65"><text x="610" y="160">∑</text><text x="690" y="280">π</text><text x="610" y="390">√x</text><text x="40" y="1000">△</text></g><path d="M540 0 V1100" stroke="#7184b9" stroke-width="2" opacity=".13"/></svg>`;
    if (name === "literature") deco.innerHTML = `<svg viewBox="0 0 800 1100" width="100%" height="100%"><path d="M610 70 H750 V390 H610Z" fill="none" stroke="#9c805d" stroke-width="8" opacity=".2"/><path d="M630 95 H730 M630 130 H730 M630 165 H710" stroke="#9c805d" stroke-width="5" opacity=".2"/><path d="M0 970 Q300 880 800 980" stroke="#a68b68" stroke-width="3" fill="none" opacity=".25"/></svg>`;
    paper.insertBefore(deco, paper.firstChild);
  },
  structures: {
    classic: [
      {text:"INSTITUTION NAME",x:15,y:18,w:70,h:12,size:25,bold:true,align:"center"},
      {text:"ASSIGNMENT",x:15,y:91,w:70,h:15,size:30,bold:true,align:"center"},
      {text:"Subject: ____________________",x:18,y:117,w:64,h:9,size:17,align:"center"},
      {text:"Submitted To\\nTeacher's Name\\nDepartment",x:12,y:205,w:36,h:28,size:14},
      {text:"Submitted By\\nStudent Name\\nClass / Roll / Section",x:52,y:205,w:36,h:28,size:14,align:"right"},
      {text:"Date: ____________________",x:15,y:265,w:70,h:8,size:13,align:"center"}
    ],
    modern: [
      {text:"INSTITUTION / DEPARTMENT",x:12,y:18,w:76,h:9,size:14,bold:true},
      {text:"ASSIGNMENT\\nTITLE GOES HERE",x:12,y:85,w:76,h:42,size:35,bold:true},
      {text:"SUBJECT  /  COURSE NAME",x:12,y:137,w:70,h:9,size:13},
      {text:"SUBMITTED BY\\nStudent name · Class · ID",x:12,y:218,w:42,h:22,size:13},
      {text:"SUBMITTED TO\\nTeacher name · Designation",x:55,y:218,w:34,h:22,size:13},
      {text:"ACADEMIC YEAR 2026–27",x:12,y:270,w:76,h:8,size:11,bold:true}
    ],
    creative: [
      {text:"PROJECT / ASSIGNMENT",x:10,y:22,w:80,h:10,size:15,bold:true},
      {text:"YOUR BIG\\nIDEA STARTS\\nHERE.",x:10,y:78,w:80,h:64,size:43,bold:true},
      {text:"A short subject or course description",x:11,y:154,w:75,h:10,size:15},
      {text:"PREPARED BY\\nStudent name · Roll",x:11,y:220,w:40,h:20,size:13,bold:true},
      {text:"GUIDED BY\\nTeacher name",x:55,y:220,w:35,h:20,size:13,bold:true},
      {text:"INSTITUTION NAME  •  2026",x:11,y:270,w:80,h:8,size:11,bold:true}
    ]
  }
};