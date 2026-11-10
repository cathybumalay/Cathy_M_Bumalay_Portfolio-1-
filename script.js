(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const toggle=$("#menuToggle"),nav=$("#navLinks");
 const closeMenu=()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");};
 toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close menu":"Open menu");});
 $$(".nav-links a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeModal();}});
 const progress=$("#readingProgress"),back=$("#backTop");
 function scrollUI(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%";back.classList.toggle("visible",scrollY>450);}
 addEventListener("scroll",scrollUI,{passive:true});scrollUI();back.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
 $("#year").textContent=new Date().getFullYear();
 if("IntersectionObserver" in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target);}}),{threshold:.12});$$(".reveal").forEach(el=>io.observe(el));}else $$(".reveal").forEach(el=>el.classList.add("visible"));
 const sections=$$("main section[id]"),links=$$(".nav-links a[href^='#']");
 if("IntersectionObserver" in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));}}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>navObserver.observe(s));}
 $$(".filter").forEach(btn=>btn.addEventListener("click",()=>{$$(".filter").forEach(b=>b.classList.toggle("active",b===btn));const filter=btn.dataset.filter;$$(".project-card").forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter));}));
 const projects={
  osam:{title:"OSAM Ukay-Ukay Inventory System",description:"A web-based system designed to help OSAM Ukay-Ukay manage clothing inventory, monitor stock levels, and record financial transactions. The goal is to keep inventory and sales information organized and easier to review.",features:["Clothing inventory management","Stock monitoring","Sales and transaction recording","Automated financial auditing","Report generation"],tech:["HTML","CSS","JavaScript","PHP","MySQL"]},
  student:{title:"Student Information Management System",description:"A web-based system designed to organize student information and academic records, supporting the management and retrieval of student data.",features:["Student registration","Student profile management","Record updating and searching","Student information reports"],tech:["HTML","CSS","JavaScript","PHP","MySQL"]},
  lost:{title:"Lost and Found Management System",description:"A web-based platform designed to help students report, search, and track belongings that have been lost or found within the school.",features:["Report lost items","Register found items","Search for missing belongings","Track item status","Manage item records"],tech:["HTML","CSS","JavaScript","PHP","MySQL"]}
 };
 const modal=$("#projectModal");
 function closeModal(){if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
 $$(".project-open").forEach(btn=>btn.addEventListener("click",()=>{const p=projects[btn.dataset.project];if(!p)return;$("#modalTitle").textContent=p.title;$("#modalDescription").textContent=p.description;$("#modalFeatures").innerHTML=p.features.map(x=>`<li>${x}</li>`).join("");$("#modalTech").innerHTML=p.tech.map(x=>`<span>${x}</span>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$("#modalClose").focus();}));
 $("#modalClose").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
 let toastTimer;function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300);}
 $("#copyEmail").addEventListener("click",async()=>{const email=$("#copyEmail").dataset.email;try{await navigator.clipboard.writeText(email);toast("Email address copied.");}catch{toast("Email: "+email);}});
})();