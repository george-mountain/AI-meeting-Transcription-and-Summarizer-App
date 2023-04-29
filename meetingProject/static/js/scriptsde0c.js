!function(e){"use strict";let t={classes:{main:"nk-menu",item:"nk-menu-item",link:"nk-menu-link",toggle:"nk-menu-toggle",dropdown:"nk-menu-dropdown",dropdownparent:"has-dropdown",active:"active",current:"current-page"}};e.Dropdown={load:function(e,t){let s=e.parentElement;s.classList.contains(t)||s.classList.add(t)},toggle:function(t,s){let a=t.parentElement,n=t.nextElementSibling,o=n.children.length>5?400+10*n.children.length:400;a.classList.contains(s)?(a.classList.remove(s),e.SlideUp(n,o)):(a.classList.add(s),e.SlideDown(n,o))},closeSiblings:function(t,s,a,n){let o=t.parentElement,r=o.parentElement.children;Array.from(r).forEach(t=>{if(t!==o&&(t.classList.remove(s),t.classList.contains(a))){t.querySelectorAll("."+n).forEach(t=>{t.parentElement.classList.remove(s),e.SlideUp(t,400)})}})}},e.Dropdown.header=function(s){const a=document.querySelectorAll(s);let n=t.classes.active,o=t.classes.dropdownparent,r=t.classes.dropdown,l=e.body.dataset.menuCollapse?e.Break[e.body.dataset.menuCollapse]:e.Break.lg;a.forEach(t=>{e.Dropdown.load(t,o),t.addEventListener("click",(function(s){s.preventDefault(),e.Win.width<l&&(e.Dropdown.toggle(t,n),e.Dropdown.closeSiblings(t,n,o,r))}))})};let s={root:"nk-header-main",base:"nk-header-menu",toggle:"header-menu-toggle",toggleActive:"active",active:"header-menu-active",overlay:"header-menu-overlay",body:"header-menu-shown"},a={main:e.body.dataset.menuCollapse?e.Break[e.body.dataset.menuCollapse]:e.Break.lg};e.Navbar={show:function(t,a){t.forEach(e=>{e.classList.add(s.toggleActive)}),a.classList.add(s.active),e.body.classList.add(s.body);let n=`<div class='${s.overlay}'></div>`;a.insertAdjacentHTML("beforebegin",n)},hide:function(t,a){t.forEach(e=>{e.classList.remove(s.toggleActive)}),a.classList.remove(s.active),e.body.classList.remove(s.body);let n=document.querySelector("."+s.overlay);setTimeout(()=>{n&&n.remove()},400)},mobile:function(t){a.main<e.Win.width?t.classList.remove("menu-mobile"):setTimeout(()=>{t.classList.add("menu-mobile")},500)},sticky:function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{let t=e.offsetTop;window.addEventListener("scroll",(function(){window.scrollY>t?e.classList.add("has-fixed"):e.classList.remove("has-fixed")}))})},height:function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{document.querySelector("html").style.setProperty("--header-main-height",e.offsetHeight+"px")})}},e.Navbar.init=function(){let t=document.querySelector("."+s.base),n=document.querySelectorAll("."+s.toggle);n.forEach(o=>{e.Navbar.mobile(t),o.addEventListener("click",(function(o){o.preventDefault(),a.main>e.Win.width&&(t.classList.contains(s.active)?e.Navbar.hide(n,t):e.Navbar.show(n,t))})),window.addEventListener("resize",(function(s){a.main<e.Win.width&&e.Navbar.hide(n,t),e.Navbar.mobile(t)})),document.addEventListener("mouseup",(function(a){null===a.target.closest("."+s.base)&&e.Navbar.hide(n,t)}))}),e.Navbar.sticky(".nk-header ."+s.root),window.addEventListener("scroll",(function(){e.Navbar.height(".nk-header ."+s.root)})),window.addEventListener("resize",(function(){e.Navbar.height(".nk-header ."+s.root)}))},e.CurrentLink=function(t,s,a,n,o,r){let l=document.querySelectorAll(t),i=document.location.href,c=i.substring(0,-1==i.indexOf("#")?i.length:i.indexOf("#")),d=c.substring(0,-1==c.indexOf("?")?c.length:c.indexOf("?"));l.forEach((function(t){var l=t.getAttribute("href");if(d.match(l)){e.getParents(t,"."+n,s).forEach(e=>{e.classList.add(...o);let t=e.querySelector("."+a);null!==t&&(t.style.display="block")}),r&&t.scrollIntoView({block:"end"})}else t.parentElement.classList.remove(...o)}))},e.Addons.swiperCarousel=function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{let t=e.dataset.breakpoints?JSON.parse(e.dataset.breakpoints):null,s=!!e.dataset.autoplay&&JSON.parse(e.dataset.autoplay),a=!!e.dataset.loop&&JSON.parse(e.dataset.loop),n=!!e.dataset.centeredslides&&JSON.parse(e.dataset.centeredslides),o=e.dataset.slidesperview?e.dataset.slidesperview:1,r=e.dataset.speed?parseInt(e.dataset.speed):900,l=e.dataset.spaceBetween?parseInt(e.dataset.spaceBetween):0,i=e.dataset.effect?e.dataset.effect:"slide";console.log(t,s,a,n,o,r,l,i);new Swiper(e,{centeredSlides:n,slidesPerView:o,loop:a,speed:r,autoplay:s,spaceBetween:l,effect:i,pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next",clickable:!0},breakpoints:t})})},e.Addons.typed=function(e){let t=document.querySelectorAll(e);t.length>0&&t.forEach(e=>{console.log();let t=JSON.parse("["+e.dataset.strings+"]");new Typed(e,{strings:t,typeSpeed:100,backSpeed:0,backDelay:1e3,startDelay:0,loop:!0})})},e.Addons.pristine=function(e,t){let s="form-control-wrap";return new Pristine(e,{classTo:s,errorClass:"form-error",successClass:"form-sucess",errorTextParent:s,errorTextTag:"span",errorTextClass:"form-error-message"},t)},e.Custom.submitForm=function(t){let s=document.querySelectorAll(t);s&&s.forEach(t=>{const s=t.dataset.action;let a=e.Addons.pristine(t,!0);t.addEventListener("submit",(function(e){e.preventDefault();let n=a.validate(),o=t.querySelector(".form-result");if(n){let e=new FormData(t);const a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==this.readyState&&200==this.status){let e=null;try{e=JSON.parse(a.responseText)}catch(e){}o.classList.add("form-result-show"),o.style.display="block",e?(o.innerHTML=e.message,"success"==e.result?(o.classList.add("form-result-success"),o.classList.remove("form-result-error"),setTimeout((function(){o.style.display="none"}),8e3)):(o.classList.add("form-result-error"),o.classList.remove("form-result-success"))):(o.classList.remove("form-result-success"),o.classList.add("form-result-error"),o.innerHTML="error")}},a.open("POST",s,!0),a.send(e),t.reset()}}))})},e.Custom.priceToggle=function(e){let t=document.querySelectorAll(e);t&&t.forEach(e=>{e.addEventListener("click",(function(){let t=e.closest("."+e.dataset.parent),s=document.querySelectorAll("."+e.dataset.target);console.log(s),t.classList.contains("pricing-yearly")?t.classList.remove("pricing-yearly"):t.classList.add("pricing-yearly"),s.forEach(e=>{e.classList.contains("show-yearly")?e.classList.remove("show-yearly"):e.classList.add("show-yearly")})}))})},e.Custom.showHidePassword=function(e){let t=document.querySelectorAll(e);t&&t.forEach(e=>{e.addEventListener("click",(function(t){t.preventDefault();let s=document.getElementById(e.getAttribute("href"));"password"==s.type?(s.type="text",e.classList.add("is-shown")):(s.type="password",e.classList.remove("is-shown"))}))})},e.Custom.init=function(){e.Navbar.init(),e.Addons.swiperCarousel(".swiper-init"),e.Addons.typed(".type-init"),e.Custom.submitForm(".form-submit-init"),e.Custom.priceToggle(".pricing-toggle"),e.Custom.showHidePassword(".password-toggle"),e.Dropdown.header("."+t.classes.toggle),e.CurrentLink("."+t.classes.link,t.classes.item,t.classes.sub,t.classes.main,[t.classes.active,t.classes.current],!0)},e.init=function(){e.winLoad(e.Custom.init)},e.init()}(NioApp);