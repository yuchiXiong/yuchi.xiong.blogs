/*
	This is the Obsidian example vault is amazing, there are a lot of dazzling features and showcase, I believe you will wonder a bit, is this Obsidian?
	[Blue-topaz-examples](https://github.com/cumany/Blue-topaz-examples)
	*/

var Se=Object.create;var N=Object.defineProperty;var xe=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var Le=Object.getPrototypeOf,ke=Object.prototype.hasOwnProperty;var G=t=>N(t,"__esModule",{value:!0});var He=(t,e)=>{G(t);for(var n in e)N(t,n,{get:e[n],enumerable:!0})},Me=(t,e,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Ae(e))!ke.call(t,o)&&o!=="default"&&N(t,o,{get:()=>e[o],enumerable:!(n=xe(e,o))||n.enumerable});return t},q=t=>Me(G(N(t!=null?Se(Le(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var E=(t,e,n)=>new Promise((o,s)=>{var a=l=>{try{r(n.next(l))}catch(d){s(d)}},i=l=>{try{r(n.throw(l))}catch(d){s(d)}},r=l=>l.done?o(l.value):Promise.resolve(l.value).then(a,i);r((n=n.apply(t,e)).next())});He(exports,{default:()=>K,refresh_node:()=>Te,selfDestruct:()=>z});var b=q(require("obsidian"));var C=q(require("obsidian"));function D(t,e){return t+1<e.length?e[t+1].level>e[t].level:!1}function W(t,e,n){t.stopPropagation();let o=e.getAttribute("isCollapsed");o!==null&&(o==="true"?Fe(e,n):o==="false"&&Oe(e))}function Fe(t,e){t.setAttribute("isCollapsed","false");let n=parseInt(t.getAttribute("data-level")),o=t.nextElementSibling;if(e)for(;o&&parseInt(o.getAttribute("data-level"))>n;)o.style.display="block",o.getAttribute("isCollapsed")!==null&&o.setAttribute("isCollapsed","false"),o=o.nextElementSibling;else{let s=!1,a=Number.MAX_VALUE;for(;o&&parseInt(o.getAttribute("data-level"))>n;){let i=o.getAttribute("isCollapsed")!==null,r=parseInt(o.getAttribute("data-level"));s?r<=a&&(o.style.display="block",s=i,a=i?r:Number.MAX_VALUE):(i&&(s=!0,a=r),o.style.display="block"),o=o.nextElementSibling}}}function Oe(t){t.setAttribute("isCollapsed","true");let e=parseInt(t.getAttribute("data-level")),n=t.nextElementSibling;for(;n&&parseInt(n.getAttribute("data-level"))>e;)n.style.display="none",n.getAttribute("isCollapsed")!==null&&n.setAttribute("isCollapsed","true"),n=n.nextElementSibling}function B(t,e,n,o,s,a){return E(this,null,function*(){let i=/^(?:\s*)[0-9]+\.\s/,r=/^(?:\s*)[\-\+]\s/,l,d="";(l=i.exec(n))!==null?(d=l[0],n=n.replace(i,"")):(l=r.exec(n))!==null&&(d=l[0],n=n.replace(r,""));let c=Number(o.parentElement.getAttribute("data-id")),h=Number(o.parentElement.getAttribute("data-level")),w=g=>{g.stopImmediatePropagation(),W(g,o.parentElement,t.settings.expandAllSubheadings)};o.parentElement.addEventListener("click",w),o.parentElement.hasAttribute("isCollapsed")?D(c,t.headingdata)||(o.parentElement.removeAttribute("isCollapsed"),o.parentElement.removeEventListener("click",w)):D(c,t.headingdata)&&o.parentElement.setAttribute("isCollapsed","false");let v=o;a=new C.Component,yield C.MarkdownRenderer.renderMarkdown(n,v,s,a),v&&v.classList.add("heading-rendered");let A=v.createEl("a");A.addClass("text"),A.onclick=function(g){var T;g.stopPropagation();let f=(T=parseInt(v.parentElement.getAttribute("data-line")))!=null?T:0;if(g.ctrlKey||g.metaKey)X(e,f);else{J(e,f);let S=v.parentElement.parentElement.querySelector(".text-wrap.located");S&&S.removeClass("located"),v.addClass("located")}};let m=v.querySelector("p");if(m){let g=/<a[^>]*>|<\/[^>]*a>/gm;d?A.innerHTML=d+m.innerHTML.replace(g,""):A.innerHTML=m.innerHTML.replace(g,""),v.removeChild(m),t.settings.isTooltip&&(v.setAttribute("aria-label",n),t.settings.positionStyle=="right"&&v.setAttribute("aria-label-position","left"),t.settings.positionStyle=="left"&&v.setAttribute("aria-label-position","right"),t.settings.positionStyle=="both"&&v.setAttribute("aria-label-position","top"))}})}function _(t,e,n,o,s){return E(this,null,function*(){let a=t.headingdata&&t.headingdata.length>30,i=n.createEl("li");i.addClass("heading-list-item"),i.setAttribute("data-level",o.level.toString()),i.setAttribute("data-id",s.toString()),i.setAttribute("data-line",o.position.start.line.toString());let r=i.createEl("div");if(r.addClass("text-wrap"),a){let d=r.createEl("a");d.addClass("text"),d.textContent=o.heading,d.onclick=function(c){c.stopPropagation();let h=o.position.start.line;if(c.ctrlKey||c.metaKey)X(e,h);else{J(e,h);let w=n.querySelector(".text-wrap.located");w&&w.removeClass("located"),r.addClass("located")}},D(s,t.headingdata)&&(i.setAttribute("isCollapsed","false"),i.addEventListener("click",c=>{c.stopPropagation(),W(c,i,t.settings.expandAllSubheadings)}))}else yield B(t,e,o.heading,r,e.file.path,null);let l=i.createEl("div");l.addClass("line-wrap"),l.createDiv().addClass("line")})}var J=(t,e)=>{t.leaf.openFile(t.file,{eState:{line:e}})},X=(t,e)=>{var a,i;let n=(i=(a=t==null?void 0:t.currentMode.getFoldInfo())==null?void 0:a.folds)!=null?i:[],o=e,s=0;if(n.some((r,l)=>(s=l,r.from==o)))n.splice(s,1);else{let r={from:e,to:e+1};n.push(r)}t==null||t.currentMode.applyFoldInfo({folds:n,lines:t.editor.lineCount()}),t==null||t.onMarkdownFold()};function R(t,e){var s;let n=(a,i)=>{var f,T,S;let r=t.workspace.getActiveFile(),l=t.metadataCache.getFileCache(r).headings,d=[];if(l==null||l.map(u=>{u.heading=u.heading.replace(/<\/?[\s\S]*?(?:".*")*>/g,""),d.push(u)}),e.headingdata=d,e.headingdata.length==0)return;e.settings.positionStyle=="right"?(i.addClass("floating-right"),i.removeClass("floating-left"),i.removeClass("floating-both")):e.settings.positionStyle=="left"?(i.addClass("floating-left"),i.removeClass("floating-rigth"),i.removeClass("floating-both")):e.settings.positionStyle=="both"&&(i.addClass("floating-both"),i.removeClass("floating-left"),i.removeClass("floating-rigth")),e.settings.isLeft?(i.removeClass("alignLeft"),i.addClass("alignLeft")):i.removeClass("alignLeft");let c=i.createEl("ul");c.addClass("floating-toc");let h=c.createEl("div");if(h.addClass("toolbar"),h.addClass("pin"),h.addClass("hide"),new C.ButtonComponent(h).setIcon("pin").setTooltip("pin").onClick(()=>{i.classList.contains("pin")?i.removeClass("pin"):i.addClass("pin")}),c.onmouseenter=function(){h.removeClass("hide"),i.addClass("hover")},c.onmouseleave=function(){h.addClass("hide"),i.removeClass("hover")},new C.ButtonComponent(h).setIcon("double-up-arrow-glyph").setTooltip("Scroll to Top").setClass("top").onClick(()=>{let u=this.app.workspace.getActiveViewOfType(C.MarkdownView);u&&u.setEphemeralState({scroll:0})}),new C.ButtonComponent(h).setIcon("double-down-arrow-glyph").setTooltip("Scroll to Bottom").setClass("bottom").onClick(()=>E(this,null,function*(){let u=this.app.workspace.getActiveViewOfType(C.MarkdownView);if(u){let x=this.app.workspace.getActiveFile(),F=(yield this.app.vault.cachedRead(x)).split(`
`),p=F.length;if(u.getMode()==="preview")for(;p>0&&F[p-1].trim()==="";)p--;u.currentMode.applyScroll(p-1)}})),new C.ButtonComponent(h).setIcon("copy").setTooltip("copy to clipboard").setClass("copy").onClick(()=>E(this,null,function*(){let u=e.headingdata.map(x=>"    ".repeat(x.level-1)+x.heading);yield navigator.clipboard.writeText(u.join(`
`)),new C.Notice("Copied")})),e.settings.ignoreHeaders){let u=e.settings.ignoreHeaders.split(`
`);e.headingdata=(f=t.metadataCache.getFileCache(r).headings)==null?void 0:f.filter(x=>!u.includes(x.level.toString()))}(()=>{let u=e.headingdata.length,x=t.workspace.getActiveViewOfType(C.MarkdownView);if(u>50){let M=20,F=e.headingdata.slice(0,M),p=document.createElement("div");p.className="toc-loading-indicator",p.textContent=`Loading... (${M}/${u})`,p.style.textAlign="center",p.style.padding="8px",p.style.color="var(--text-muted)",p.style.fontSize="0.8em",p.style.position="fixed",p.style.top="45px",F.forEach((V,P)=>{_(e,x,c,V,P)}),c.appendChild(p);let L=M,I=20,O=()=>{let V=Math.min(L+I,u);p.textContent=`\u52A0\u8F7D\u4E2D... (${V}/${u})`;for(let P=L;P<V;P++)_(e,x,c,e.headingdata[P],P);L=V,L<u?requestAnimationFrame(()=>{setTimeout(O,10)}):p.remove()};setTimeout(O,50)}else e.headingdata.forEach((M,F)=>{_(e,x,c,M,F)})})(),((T=a==null?void 0:a.querySelector(".markdown-source-view"))==null?void 0:T.insertAdjacentElement("beforebegin",i))||((S=a==null?void 0:a.querySelector(".markdown-reading-view"))==null||S.insertAdjacentElement("beforebegin",i))};if(this.app.workspace.getActiveViewOfType(C.MarkdownView)){(0,C.requireApiVersion)("0.15.0")?activeDocument=activeWindow.document:activeDocument=window.document;let a=e.app.workspace.getActiveViewOfType(C.MarkdownView);if(a){if((s=a.contentEl)==null?void 0:s.querySelector(".floating-toc-div"))return;{let r=createEl("div");r.addClass("floating-toc-div"),e.settings.isDefaultPin&&r.addClass("pin"),n(a.contentEl,r)}}}}var k=q(require("obsidian"));var Y=["left","right","both"],Q={ignoreHeaders:"",ignoreTopHeader:!1,positionStyle:"left",isLoadOnMobile:!0,isLeft:!1,isDefaultPin:!1,isTooltip:!1,defaultCollapsedLevel:6,expandAllSubheadings:!1};var Ee=q(require("obsidian"));var Z={};var ee={};var te={};var ie={};var j={"ctrl + click on the floating toc to collapse/expand the header.":"ctrl + click on the floating toc to collapse/expand the header.","Floating TOC position":"Floating TOC position","Floating TOC position, default on the left side of the notes":"Floating TOC position, default on the left side of the notes","Hide heading level":"Hide heading level","Whichever option is selected, the corresponding heading level will be hidden":"Whichever option is selected, the corresponding heading level will be hidden","Plugin Settings":"Plugin Settings","Default Pin":"Default Pin","Enable Tooltip":"Enable Tooltip","Plugin Style Settings":"Plugin Style Settings","Mobile enabled or not":"Mobile enabled or not","Whether to enable the plugin for the mobile client, the default is enabled.":"Whether to enable the plugin for the mobile client, the default is enabled.","If the floating Toc option is not found in the style setting, please reload the style setting plugin (turn it off and on again)":"If the floating Toc option is not found in the style setting, please reload the style setting plugin (turn it off and on again)","Left alignment of TOC text":"Left alignment of TOC text","Aligned on both sides":"Aligned on both sides","Floating TOC position, on the right side of the notes":"Floating TOC position, on the right side of the notes","whether the text in TOC is left aligned":"whether the text in TOC is left aligned","When the panel is split left and right, the right side of the layout is aligned right and the left side of the panel is aligned left.":"When the panel is split left and right, the right side of the layout is aligned right and the left side of the panel is aligned left.","Set the default collapsed level of headings when initialised":"Set the default collapsed level of headings when initialised","Default Collapsed Level":"Default Collapsed Levels","Expand All Subheadings Recursively":"Expand All Subheadings Recursively","When disabled, only direct subheadings will be expanded":"When disabled, only direct subheadings will be expanded"};var ne={};var le={};var oe={};var ae={};var se={};var re={};var de={};var ce={};var he={};var ge={};var pe={};var fe={};var ue={};var me={};var be={};var ve={};var Ce={"ctrl + click on the floating toc to collapse/expand the header.":"\u6309\u4F4Fctrl \u70B9\u51FB\u76EE\u5F55\u4E2D\u7684\u6807\u9898\uFF0C\u53EF\u4EE5\u4F7F\u5BF9\u5E94\u7684\u6B63\u6587\u5185\u5BB9\u6298\u53E0/\u5C55\u5F00\u3002","Floating TOC position":"\u6D6E\u52A8\u76EE\u5F55\u663E\u793A\u4F4D\u7F6E","Floating TOC position, default on the left side of the notes":"\u6D6E\u52A8\u76EE\u5F55\u663E\u793A\u4F4D\u7F6E\uFF0C\u9ED8\u8BA4\u663E\u793A\u5728\u7B14\u8BB0\u5DE6\u4FA7","Hide heading level":"\u9690\u85CF\u6307\u5B9A\u7684\u6807\u9898\u5C42\u7EA7","Whichever option is selected, the corresponding heading level will be hidden":"\u9690\u85CF\u9009\u4E2D\u7684\u6807\u9898\u5C42\u7EA7\uFF0C\u9009\u4E2D\u7684\u6807\u9898\u4E0D\u4F1A\u5728\u6D6E\u52A8\u76EE\u5F55\u4E2D\u663E\u793A\u3002","Plugin Settings":"\u63D2\u4EF6\u8BBE\u7F6E","Default Pin":"\u662F\u5426\u9ED8\u8BA4\u9489\u5728\u7B14\u8BB0\u4E0A","Enable Tooltip":"\u662F\u5426\u5F00\u542F\u6807\u9898\u63D0\u793A","Plugin Style Settings":"\u63D2\u4EF6\u6837\u5F0F\u8BBE\u7F6E","Mobile enabled or not":"\u662F\u5426\u5728\u79FB\u52A8\u7AEF\u542F\u7528","Whether to enable the plugin for the mobile client, the default is enabled.":"\u79FB\u52A8\u5BA2\u6237\u7AEF\u662F\u5426\u542F\u7528\u63D2\u4EF6\uFF0C\u9ED8\u8BA4\u542F\u7528\u3002","If the floating Toc option is not found in the style setting, please reload the style setting plugin (turn it off and on again)":"\u5982\u679Cstyle setting \u4E2D\u65E0\u6CD5\u770B\u5230 floating Toc\u9009\u9879\uFF0C\u8BF7\u91CD\u8F7Dstyle setting\u63D2\u4EF6\uFF08\u5173\u95ED\u518D\u5F00\u542F\u5373\u53EF\uFF09","Left alignment of TOC text":"\u76EE\u5F55\u6587\u5B57\u5DE6\u5BF9\u9F50","Floating TOC position, on the right side of the notes":"\u6D6E\u52A8\u76EE\u5F55\u663E\u793A\u4F4D\u7F6E\uFF0C\u663E\u793A\u5728\u7B14\u8BB0\u53F3\u4FA7","whether the text in TOC is left aligned":"\u5F53\u5DE5\u5177\u680F\u5728\u53F3\u4FA7\u65F6\uFF0C\u76EE\u5F55\u4E2D\u7684\u6807\u9898\u662F\u5426\u5DE6\u5BF9\u9F50","Aligned on both sides":"\u4E24\u7AEF\u5BF9\u9F50","When the panel is split left and right, the right side of the layout is aligned right and the left side of the panel is aligned left.":"\u5F53\u9762\u677F\u5DE6\u53F3\u5206\u5272\u7684\u65F6\u5019\uFF0C\u53F3\u4FA7\u7248\u9762\u53F3\u5BF9\u9F50\uFF0C\u5DE6\u4FA7\u9762\u677F\u5DE6\u5BF9\u9F50\u3002","Set the default collapsed level of headings when initialised":"\u8BBE\u7F6E\u521D\u59CB\u5316\u65F6TOC\u4E2D\u9ED8\u8BA4\u6298\u53E0\u7684\u6807\u9898\u7EA7\u522B","Default Collapsed Level":"\u9ED8\u8BA4\u6298\u53E0\u7EA7\u522B","Expand All Subheadings Recursively":"\u9012\u5F52\u5C55\u5F00\u6240\u6709\u5B50\u6807\u9898","When disabled, only direct subheadings will be expanded":"\u5173\u95ED\u6B64\u9009\u9879\u65F6, \u53EA\u5C55\u5F00\u76F4\u63A5\u5B50\u6807\u9898"};var ye={"Floating TOC position":"\u6D6E\u52D5\u76EE\u9304\u986F\u793A\u4F4D\u7F6E","Floating TOC position, default on the left side of the notes":"\u6D6E\u52D5\u76EE\u9304\u986F\u793A\u4F4D\u7F6E\uFF0C\u9ED8\u8A8D\u986F\u793A\u5728\u7B46\u8A18\u5DE6\u5074","Ignore top-level headers":"\u662F\u5426\u5FFD\u7565\u9802\u7D1A\u76EE\u9304","Select whether to ignore the top-level headings. When turned on, the top-level headings in the current note are not displayed in the floating TOC.":"\u9078\u64C7\u662F\u5426\u5FFD\u7565\u9802\u7D1A\u6A19\u984C\uFF0C\u958B\u555F\u5F8C\u7576\u524D\u6587\u6A94\u4E2D\u6700\u9802\u7D1A\u7684\u6A19\u984C\u4E0D\u986F\u793A\u5728\u6D6E\u52D5\u76EE\u9304\u4E2D\u3002","Plugin Settings":"\u63D2\u4EF6\u8A2D\u7F6E","Default Pin":"\u662F\u5426\u9ED8\u8A8D\u91D8\u5728\u7B46\u8A18\u4E0A","Plugin Style Settings":"\u63D2\u4EF6\u6A23\u5F0F\u8A2D\u7F6E","Mobile enabled or not":"\u662F\u5426\u5728\u79FB\u52D5\u7AEF\u555F\u7528","Whether to enable the plugin for the mobile client, the default is enabled.":"\u79FB\u52D5\u5BA2\u6236\u7AEF\u662F\u5426\u555F\u7528\u63D2\u4EF6\uFF0C\u9ED8\u8A8D\u555F\u7528\u3002","If the floating Toc option is not found in the style setting, please reload the style setting plugin (turn it off and on again)":"\u5982\u679Cstyle setting \u4E2D\u7121\u6CD5\u770B\u5230 floating Toc\u9078\u9805\uFF0C\u8ACB\u91CD\u8F09style setting\u63D2\u4EF6\uFF08\u95DC\u9589\u518D\u958B\u555F\u5373\u53EF\uFF09","Left alignment of TOC text":"\u76EE\u9304\u6587\u5B57\u5DE6\u5C0D\u9F4A","Floating TOC position, on the right side of the notes":"\u6D6E\u52D5\u76EE\u9304\u986F\u793A\u4F4D\u7F6E\uFF0C\u986F\u793A\u5728\u7B46\u8A18\u53F3\u5074","whether the text in TOC is left or right aligned When the floating toc is on the right":"\u7576\u5DE5\u5177\u6B04\u5728\u53F3\u5074\u6642\uFF0C\u76EE\u9304\u4E2D\u7684\u6A19\u984C\u662F\u5426\u5DE6\u5C0D\u9F4A","Aligned on both sides":"\u5169\u7AEF\u5C0D\u9F4A","When the panel is split left and right, the right side of the layout is aligned right and the left side of the panel is aligned left.":"\u7576\u9762\u677F\u5DE6\u53F3\u5206\u5272\u7684\u6642\u5019\uFF0C\u53F3\u5074\u7248\u9762\u53F3\u5C0D\u9F4A\uFF0C\u5DE6\u5074\u9762\u677F\u5DE6\u5C0D\u9F4A\u3002"};var De={ar:Z,cs:ee,da:te,de:ie,en:j,"en-gb":ne,es:le,fr:oe,hi:ae,id:se,it:re,ja:de,ko:ce,nl:he,nn:ge,pl:pe,pt:fe,"pt-br":ue,ro:me,ru:be,tr:ve,"zh-cn":Ce,"zh-tw":ye},we=De[Ee.moment.locale()];function y(t){return we&&we[t]||j[t]}var U=class{constructor(e){this.checkedList=[];this.containerEl=e,this.flowListEl=this.containerEl.createDiv({cls:"check-list"})}addItem(e,n,o,s){let a=this.flowListEl.createDiv({cls:"check-item"}),i=a.createEl("input",{type:"checkbox"});return i.checked=o,i.checked&&this.checkedList.push(n),i.addEventListener("change",l=>{i.checked?this.checkedList.includes(n)||this.checkedList.push(n):this.checkedList.includes(n)&&this.checkedList.remove(n)}),i.addEventListener("change",l=>s(i.checked)),a.createDiv({cls:"flow-label"}).setText(e),a}};var $=class extends k.PluginSettingTab{constructor(e,n){super(e,n);this.plugin=n,addEventListener("refresh-toc",()=>{z(),R(e,this.plugin)})}display(){let{containerEl:e}=this;e.empty(),e.createEl("h1",{text:"Obsidian Floating TOC "}),e.createEl("span",{text:""}).createEl("a",{text:"Author: Cuman \u2728",href:"https://github.com/cumany"}),e.createEl("span",{text:""}).createEl("a",{text:"Readme:\u4E2D\u6587",href:"https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E7%A4%BE%E5%8C%BA%E6%8F%92%E4%BB%B6/floating-toc/"}),e.createEl("span",{text:""}).createEl("a",{text:"|English  ",href:"https://github.com/cumany/obsidian-floating-toc-plugin/blob/master/README.md"});let n=e.createEl("div");n.addClass("callout"),n.setAttribute("data-callout","info");let o=n.createEl("div",{text:"\u{1F511}TIPS:"});o.addClass("callout-title"),o.createEl("br"),n.createEl("div",{text:y("ctrl + click on the floating toc to collapse/expand the header.")}).addClass("callout-content"),e.createEl("h2",{text:y("Plugin Settings")});let a=new k.Setting(e);a.setName(y("Floating TOC position")),this.plugin.settings.positionStyle=="both"?a.setDesc(y("When the panel is split left and right, the right side of the layout is aligned right and the left side of the panel is aligned left.")):this.plugin.settings.positionStyle=="right"?a.setDesc(y("Floating TOC position, on the right side of the notes")):a.setDesc(y("Floating TOC position, default on the left side of the notes")),a.addDropdown(m=>{let g={};Y.map(f=>g[f]=f),m.addOptions(g),m.setValue(this.plugin.settings.positionStyle).onChange(f=>{this.plugin.settings.positionStyle=f,this.plugin.saveSettings(),setTimeout(()=>{this.display(),dispatchEvent(new Event("refresh-toc"))},100)})}),this.plugin.settings.positionStyle!="left"&&new k.Setting(e).setName(y("Left alignment of TOC text")).setDesc(y("whether the text in TOC is left aligned")).addToggle(m=>{var g;return m.setValue((g=this.plugin.settings)==null?void 0:g.isLeft).onChange(f=>{this.plugin.settings.isLeft=f,this.plugin.saveSettings(),setTimeout(()=>{this.display(),dispatchEvent(new Event("refresh-toc"))},100)})}),new k.Setting(e).setName(y("Expand All Subheadings Recursively")).setDesc(y("When disabled, only direct subheadings will be expanded")).addToggle(m=>m.setValue(this.plugin.settings.expandAllSubheadings).onChange(g=>{this.plugin.settings.expandAllSubheadings=g,this.plugin.saveSettings(),setTimeout(()=>{dispatchEvent(new Event("refresh-toc"))},100)})),new k.Setting(e).setName(y("Hide heading level")).setDesc(y("Whichever option is selected, the corresponding heading level will be hidden"));let i=new U(e);[1,2,3,4,5,6].forEach(m=>E(this,null,function*(){let f=this.plugin.settings.ignoreHeaders.split(`
`).includes(m.toString());i.addItem(m.toString(),m.toString(),f,T=>{this.plugin.settings.ignoreHeaders=i.checkedList.join(`
`),this.plugin.saveSettings(),setTimeout(()=>{dispatchEvent(new Event("refresh-toc"))},100)})})),new k.Setting(e).setName(y("Default Pin")).addToggle(m=>{var g;return m.setValue((g=this.plugin.settings)==null?void 0:g.isDefaultPin).onChange(f=>{this.plugin.settings.isDefaultPin=f,this.plugin.saveSettings(),setTimeout(()=>{dispatchEvent(new Event("refresh-toc"))},100)})}),new k.Setting(e).setName(y("Enable Tooltip")).addToggle(m=>{var g;return m.setValue((g=this.plugin.settings)==null?void 0:g.isTooltip).onChange(f=>{this.plugin.settings.isTooltip=f,this.plugin.saveSettings(),setTimeout(()=>{dispatchEvent(new Event("refresh-toc"))},100)})}),e.createEl("h2",{text:y("Plugin Style Settings")});let l=e.createEl("div");l.addClass("callout"),l.setAttribute("data-callout","warning"),l.createEl("div",{text:"\u{1F514} Notice: Please click the button again,If the floating-toc option is not found in the style settings"}).addClass("callout-title");let c=l.createEl("div");c.addClass("callout-content"),app.plugins.enabledPlugins.has("obsidian-style-settings")?(c.createEl("br"),new k.ButtonComponent(c).setIcon("palette").setClass("mod-cta").setButtonText("\u{1F3A8} Open style settings").onClick(()=>{app.setting.open(),app.setting.openTabById("obsidian-style-settings"),app.workspace.trigger("parse-style-settings"),setTimeout(()=>{var f,T,S;let g=app.setting.activeTab.containerEl.querySelector(".setting-item-heading[data-id='floating-toc-styles']");g?(f=g.addClass)==null||f.call(g,"float-cta"):(app.workspace.trigger("parse-style-settings"),(S=(T=app.setting.activeTab.containerEl.querySelector(".setting-item-heading[data-id='floating-toc-styles']"))==null?void 0:T.addClass)==null||S.call(T,"float-cta"))},250)})):(c.createEl("br"),c.createEl("span",{text:""}).createEl("a",{text:"Please install or enable the style-settings plugin",href:"obsidian://show-plugin?id=obsidian-style-settings"}));let w=e.createEl("div",{cls:"cDonationSection"}),v=createEl("p"),A=createEl("p");A.appendText("If you like this Plugin and are considering donating to support continued development, use the button below!"),v.setAttribute("style","color: var(--text-muted)"),w.appendChild(A),w.appendChild(v),w.appendChild(Ie("https://github.com/cumany#thank-you-very-much-for-your-support"))}},Ie=t=>{let e=createEl("a");return e.setAttribute("href",t),e.addClass("buymeacoffee-img"),e.innerHTML='<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee &emoji=&slug=Cuman&button_colour=BD5FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" />',e};var H;function z(){(0,b.requireApiVersion)("0.15.0")?H=activeWindow.document:H=window.document,H.querySelectorAll(".floating-toc-div").forEach(e=>{e&&e.remove()})}function Te(t,e){var o,s;(0,b.requireApiVersion)("0.15.0")?H=activeWindow.document:H=window.document;let n=(o=e.contentEl)==null?void 0:o.querySelector(".floating-toc-div");if(n){let a=n.querySelector("ul.floating-toc");a||(a=n.createEl("ul"),a.addClass("floating-toc"));let i=n==null?void 0:n.querySelectorAll("li.heading-list-item"),r=t.headingdata;if(t.settings.ignoreHeaders){let l=t.settings.ignoreHeaders.split(`
`);r=(s=t.headingdata)==null?void 0:s.filter(d=>!l.includes(d.level.toString()))}return r?(i.length>=r.length?i==null||i.forEach((l,d)=>{var c;if(r[d])if(r[d].level==l.getAttribute("data-level")&&r[d].heading==l.children[0].innerText&&r[d].position.start.line==l.getAttribute("data-line")){let h=Number(l.getAttribute("data-id"));D(h,t.headingdata)?l.hasAttribute("iscollapsed")||l.setAttribute("isCollapsed","false"):l.hasAttribute("iscollapsed")&&l.removeAttribute("isCollapsed");return}else l.setAttribute("data-level",r[d].level.toString()),l.setAttribute("data-id",d.toString()),l.setAttribute("data-line",r[d].position.start.line.toString()),(c=l.children[0].querySelector("a"))==null||c.remove(),B(t,e,r[d].heading,l.children[0],e.file.path,null);else l.remove()}):r==null||r.forEach((l,d)=>{var c;if(d<=i.length-1)if(l.level.toString()==i[d].getAttribute("data-level")&&l.heading==i[d].children[0].innerText&&l.position.start.line.toString()==i[d].getAttribute("data-line")){let h=Number(i[d].getAttribute("data-id"));D(h,t.headingdata)?i[d].hasAttribute("iscollapsed")||i[d].setAttribute("isCollapsed","false"):i[d].hasAttribute("iscollapsed")&&i[d].removeAttribute("isCollapsed");return}else i[d].setAttribute("data-level",l.level.toString()),i[d].setAttribute("data-id",d.toString()),i[d].setAttribute("data-line",l.position.start.line.toString()),(c=i[d].children[0].querySelector("a"))==null||c.remove(),B(t,e,l.heading,i[d].children[0],e.file.path,null);else _(t,e,a,l,d)}),!0):(a.remove(),!1)}else return!1}function Pe(t){var e=[];if(t==null?void 0:t.previousElementSibling)for(;t=t.previousElementSibling;)t.nodeType==1&&e.push(t);return e}function Ve(t,e,n){var s,a,i;let o=n.target;if(((s=o.parentElement)==null?void 0:s.classList.contains("cm-editor"))||((a=o.parentElement)==null?void 0:a.classList.contains("markdown-reading-view"))){let r=t.workspace.getActiveViewOfType(b.MarkdownView);if(!r)return;let l=(i=r.currentMode.getScroll())!=null?i:0,d=e.headingdata;if(!d||d.length===0)return;let c=r.contentEl.querySelector(".floating-toc");if(!c)return;let h=c.querySelectorAll("li.heading-list-item");if(!h.length)return;let w=h[0],v=h[h.length-1],A=parseInt(w.getAttribute("data-line")||"0"),m=parseInt(v.getAttribute("data-line")||"0"),g=0,f=null;if(l<=0)g=A;else{let p=0,L=d.length-1,I=-1;for(;p<=L;){let O=Math.floor((p+L)/2);d[O].position.start.line<=l?(I=O,p=O+1):L=O-1}I!==-1?(g=d[I].position.start.line,f=d[I]):g=A}let T=c.querySelector(".heading-list-item.located");T&&T.removeClass("located");let S=c.querySelector(`li[data-line='${g}']`);if(!S)return;S.addClass("located");let u=parseInt(S.getAttribute("data-level")||"1"),x=u>1?u-1:1,M=c.querySelector("li.focus");M&&M.removeClass("focus");let F=Pe(S);for(let p=0;p<F.length;p++){let L=F[p];if(L.dataset.level<=x.toString()){L.addClass("focus");break}}requestAnimationFrame(()=>{S.scrollIntoView({block:"nearest",behavior:"smooth"})})}}var K=class extends b.Plugin{constructor(){super(...arguments);this.handleScroll=(e,n,o)=>(0,b.debounce)(Ve(e,n,o),200)}onload(){return E(this,null,function*(){(0,b.requireApiVersion)("0.15.0")?H=activeWindow.document:H=window.document,yield this.loadSettings();let e=s=>{s&&(Te(this,s)||R(app,this))};this.addCommand({id:"pin-toc-panel",name:"Pinning the Floating TOC panel",icon:"pin",callback:()=>E(this,null,function*(){let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(s){let a=s.contentEl.querySelector(".floating-toc-div");a&&(a.classList.contains("pin")?a.removeClass("pin"):a.addClass("pin"))}})}),this.addCommand({id:"hide-toc-panel",name:"Hide/Show the Floating TOC panel",icon:"list",callback:()=>E(this,null,function*(){let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(s){let a=s.contentEl.querySelector(".floating-toc-div");a&&(a.classList.contains("hide")?a.removeClass("hide"):a.addClass("hide"))}})}),this.addCommand({id:"scroll-to-bottom",name:"Scroll to Bottom",icon:"double-down-arrow-glyph",callback:()=>E(this,null,function*(){let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(s){let a=this.app.workspace.getActiveFile(),r=(yield this.app.vault.cachedRead(a)).split(`
`),l=r.length;if(s.getMode()==="preview")for(;l>0&&r[l-1].trim()==="";)l--;s.currentMode.applyScroll(l-1)}})}),this.addCommand({id:"scroll-to-top",name:"Scroll to Top",icon:"double-up-arrow-glyph",callback:()=>E(this,null,function*(){let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);s&&s.setEphemeralState({scroll:0})})}),this.addCommand({id:"toggle-position-style",name:"Toggle Floating TOC Position (left/right)",icon:"switch",callback:()=>{this.settings.positionStyle==="left"?this.settings.positionStyle="right":this.settings.positionStyle==="right"?this.settings.positionStyle="left":this.settings.positionStyle==="both"&&new b.Notice("Position style set to both. Toogle position only works when fixed position (left or right) is selected."),this.saveSettings(),dispatchEvent(new Event("refresh-toc"))}}),this.registerEvent(this.app.workspace.on("active-leaf-change",()=>{let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(s){let a=this.app.workspace.getActiveFile(),i=this.app.metadataCache.getFileCache(a).headings,r=[];if(i==null||i.map(l=>{l.heading=l.heading.replace(/<\/?[\s\S]*?(?:".*")*>/g,""),r.push(l)}),this.headingdata=r,this.settings.ignoreHeaders){let l=this.settings.ignoreHeaders.split(`
`);this.headingdata=i.filter(d=>!l.includes(d.level.toString()))}o(s)}})),this.registerEvent(this.app.metadataCache.on("changed",()=>{var a;let s=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(s){let i=s.file,r=this.app.metadataCache.getFileCache(i).headings,l=[];r==null||r.map(h=>{h.heading=h.heading.replace(/<\/?[\s\S]*?(?:".*")*>/g,""),l.push(h)});let d=l==null?void 0:l.map(h=>h.level+h.heading+h.position.start.line),c=(a=this.headingdata)==null?void 0:a.map(h=>h.level+h.heading+h.position.start.line);if(JSON.stringify(c)==JSON.stringify(d))return;if(this.headingdata=l,this.settings.ignoreHeaders){let h=this.settings.ignoreHeaders.split(`
`);this.headingdata=r.filter(w=>!h.includes(w.level.toString()))}o(s)}}));let n=s=>{e(s)},o=s=>(0,b.debounce)(n(s),300,!0);H.addEventListener("scroll",s=>{this.handleScroll(this.app,this,s)},!0),this.addSettingTab(new $(this.app,this)),e(this.app.workspace.getActiveViewOfType(b.MarkdownView)),this.app.workspace.on("window-open",s=>{s.doc.addEventListener("scroll",a=>{this.handleScroll(this.app,this,a)},!0)}),this.app.workspace.onLayoutReady(()=>{this.app.workspace.trigger("parse-style-settings")})})}onunload(){var e;(0,b.requireApiVersion)("0.15.0")?H=activeWindow.document:H=window.document;try{H.removeEventListener("scroll",n=>{this.handleScroll(this.app,this,n)},!0)}catch(n){console.error("Error removing scroll event listener:",n)}try{let n=this.app.workspace.getActiveViewOfType(b.MarkdownView);if(n){let o=(e=n.contentEl)==null?void 0:e.querySelector(".floating-toc-div");o&&(o.querySelectorAll("li.heading-list-item").forEach(a=>{let i=a.cloneNode(!0);a.parentNode&&a.parentNode.replaceChild(i,a)}),o._tocCleanup&&o._tocCleanup())}}catch(n){console.error("Error cleaning up resources:",n)}z()}setHeadingdata(e){this.headingdata=e}loadSettings(){return E(this,null,function*(){this.settings=Object.assign({},Q,yield this.loadData())})}saveSettings(){return E(this,null,function*(){yield this.saveData(this.settings)})}};

/* nosourcemap */