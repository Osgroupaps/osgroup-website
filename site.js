(function(){
if(window.CookieConsent)return;
var CFG={key:'cc_consent',ver:1,months:12,accent:'#1f6f8b',dark:'#233137',name:'OS Group',policy:'/privatlivspolitik/',mail:'kontakt@osgroup.dk'};
var CATS=[
{id:'nodvendige',t:'Nødvendige',d:'Gør siden og kontaktformularen brugbar og husker dit valg her. Kan ikke slås fra.',lock:1},
{id:'praeferencer',t:'Præferencer',d:'Husker valg som sprog og visning. Bruges ikke i dag.'},
{id:'statistik',t:'Statistik',d:'Anonym måling af, hvordan siden bruges. Bruges ikke i dag.'},
{id:'marketing',t:'Marketing',d:'Annoncering og målgruppeopbygning. Bruges ikke i dag.'}
];
var state=null,listeners=[],root=null,fab=null;
function read(){try{var v=JSON.parse(localStorage.getItem(CFG.key)||'null');if(!v)v=readCookie();
if(v&&v.v===CFG.ver&&v.ts&&(Date.now()-v.ts)<CFG.months*30.5*864e5)return v}catch(e){}return null}
function readCookie(){var m=document.cookie.match(new RegExp('(?:^|; )'+CFG.key+'=([^;]*)'));try{return m?JSON.parse(decodeURIComponent(m[1])):null}catch(e){return null}}
function save(c){var o={v:CFG.ver,ts:Date.now(),c:c};state=o;var s=JSON.stringify(o);
try{localStorage.setItem(CFG.key,s)}catch(e){}
try{document.cookie=CFG.key+'='+encodeURIComponent(s)+'; max-age='+(CFG.months*30*86400)+'; path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}catch(e){}
activate();listeners.forEach(function(f){try{f(o.c)}catch(e){}})}
function has(id){if(id==='nodvendige')return true;return !!(state&&state.c&&state.c[id])}
function activate(){document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function(s){
if(s.dataset.done||!has(s.dataset.consent))return;s.dataset.done='1';var n=document.createElement('script');
[].forEach.call(s.attributes,function(a){if(a.name!=='type'&&a.name!=='data-consent')n.setAttribute(a.name,a.value)});n.text=s.text;s.parentNode.insertBefore(n,s.nextSibling)})}
function purge(){ // fjern egne ikke-nødvendige nøgler hvis samtykke trækkes tilbage
if(!has('praeferencer')){try{Object.keys(localStorage).forEach(function(k){if(k.indexOf('pref_')===0)localStorage.removeItem(k)})}catch(e){}}}
var css='#ccw,#ccw *{box-sizing:border-box}#ccw{font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:'+CFG.dark+'}'+
'#ccb{position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483000;max-width:880px;margin:0 auto;background:#fff;border:1px solid #d9dee2;border-radius:18px;box-shadow:0 18px 50px rgba(0,0,0,.18);padding:20px 22px}'+
'#ccb h2,#ccm h2{margin:0 0 6px;font-size:17px;font-weight:800;color:'+CFG.dark+'}#ccb p,#ccm p{margin:0;color:#4b5a62;font-size:14px;line-height:1.55}#ccb a,#ccm a{color:'+CFG.accent+';text-decoration:underline}'+
'.ccr{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.ccr button{flex:1 1 150px;cursor:pointer;font:inherit;font-weight:700;font-size:14px;padding:11px 16px;border-radius:999px;border:2px solid '+CFG.dark+';background:#fff;color:'+CFG.dark+'}'+
'.ccr button.p{background:'+CFG.dark+';color:#fff}.ccr button:hover{filter:brightness(.94)}.ccr button:focus-visible,#ccf:focus-visible,.cct:focus-visible{outline:3px solid '+CFG.accent+';outline-offset:2px}'+
'#cco{position:fixed;inset:0;z-index:2147483001;background:rgba(15,23,28,.55);display:flex;align-items:center;justify-content:center;padding:14px}'+
'#ccm{background:#fff;border-radius:20px;max-width:560px;width:100%;max-height:92vh;overflow:auto;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.3)}'+
'.ccc{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;padding:14px 0;border-top:1px solid #e5e9ec}.ccc:first-of-type{margin-top:14px}.ccc b{display:block;font-size:15px}.ccc span{font-size:13px;color:#4b5a62}'+
'.cct{position:relative;flex:none;width:46px;height:26px;border-radius:999px;border:0;background:#aab4ba;cursor:pointer;padding:0}.cct::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .15s}.cct[aria-checked=true]{background:'+CFG.accent+'}.cct[aria-checked=true]::after{left:23px}.cct[disabled]{opacity:.55;cursor:not-allowed}'+
'#ccf{position:fixed;left:12px;bottom:12px;z-index:2147482999;font:600 12px/1 system-ui,sans-serif;padding:9px 13px;border-radius:999px;border:1px solid #cfd6da;background:#fff;color:'+CFG.dark+';cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.12)}'+
'@media(prefers-reduced-motion:reduce){.cct::after{transition:none}}';
function el(t,a,h){var e=document.createElement(t);for(var k in a)e.setAttribute(k,a[k]);if(h!=null)e.innerHTML=h;return e}
function ensureRoot(){if(root)return;var st=el('style',{},css);document.head.appendChild(st);root=el('div',{id:'ccw'});document.body.appendChild(root)}
function clear(){root.innerHTML=''}
function showBanner(){ensureRoot();clear();hideFab();
var b=el('div',{id:'ccb',role:'dialog','aria-modal':'false','aria-label':'Cookieindstillinger'},
'<h2>Vi respekterer dit privatliv</h2><p>'+CFG.name+' bruger kun den lagring, der er nødvendig for at siden virker, og for at huske dit valg. Du bestemmer selv, om vi må bruge andet i fremtiden. '+(CFG.policy?'Læs mere i <a href="'+CFG.policy+'">privatlivspolitikken</a>.':'Spørgsmål kan sendes til '+CFG.mail+'.')+'</p>'+
'<div class="ccr"><button type="button" data-a="n">Kun nødvendige</button><button type="button" data-a="s">Indstillinger</button><button type="button" class="p" data-a="y">Acceptér alle</button></div>');
b.addEventListener('click',function(e){var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(!a)return;
if(a==='y'){save({praeferencer:1,statistik:1,marketing:1});closeAll()}
else if(a==='n'){save({});purge();closeAll()}else openModal()});
root.appendChild(b)}
function openModal(){ensureRoot();var cur=(state&&state.c)||{};var prev=document.activeElement;
var o=el('div',{id:'cco'});var m=el('div',{id:'ccm',role:'dialog','aria-modal':'true','aria-labelledby':'cch'});
var h='<h2 id="cch">Cookieindstillinger</h2><p>Vælg hvilke kategorier du vil tillade. Du kan til enhver tid ændre eller trække dit samtykke tilbage via “Cookieindstillinger” nederst på siden.</p>';
CATS.forEach(function(c){var on=c.lock||cur[c.id];h+='<div class="ccc"><div><b>'+c.t+'</b><span>'+c.d+'</span></div><button type="button" class="cct" role="switch" aria-label="'+c.t+'" aria-checked="'+(on?'true':'false')+'" data-c="'+c.id+'"'+(c.lock?' disabled':'')+'></button></div>'});
h+='<div class="ccr"><button type="button" data-a="n">Kun nødvendige</button><button type="button" data-a="g">Gem valg</button><button type="button" class="p" data-a="y">Acceptér alle</button></div>';
m.innerHTML=h;o.appendChild(m);root.appendChild(o);
var first=m.querySelector('button:not([disabled])');if(first)first.focus();
function close(){o.remove();if(!state)showBanner();else showFab();try{prev&&prev.focus&&prev.focus()}catch(e){}}
o.addEventListener('click',function(e){if(e.target===o){close();return}
var t=e.target.closest('.cct');if(t&&!t.disabled){t.setAttribute('aria-checked',t.getAttribute('aria-checked')==='true'?'false':'true');return}
var a=e.target.getAttribute&&e.target.getAttribute('data-a');if(!a)return;
if(a==='y'){save({praeferencer:1,statistik:1,marketing:1})}
else if(a==='n'){save({});purge()}
else{var c={};m.querySelectorAll('.cct').forEach(function(x){if(x.getAttribute('aria-checked')==='true'&&!x.disabled)c[x.getAttribute('data-c')]=1});save(c);purge()}
closeAll()});
o.addEventListener('keydown',function(e){if(e.key==='Escape'){close();return}
if(e.key==='Tab'){var f=m.querySelectorAll('button:not([disabled])');if(!f.length)return;var a=f[0],z=f[f.length-1];
if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})}
function closeAll(){if(root)clear();showFab()}
function showFab(){hideFab();fab=el('button',{id:'ccf',type:'button','aria-label':'Åbn cookieindstillinger'},'Cookieindstillinger');fab.addEventListener('click',openModal);document.body.appendChild(fab)}
function hideFab(){if(fab){fab.remove();fab=null}}
function init(){state=read();
document.querySelectorAll('aside[aria-label="Cookieindstillinger"]').forEach(function(a){a.remove()}); // gammelt statisk banner
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-cookie-settings]');if(t){e.preventDefault();openModal()}});
if(state){activate();purge();showFab()}else showBanner()}
window.CookieConsent={has:has,get:function(){return state?state.c:null},open:openModal,onChange:function(f){listeners.push(f)}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
(function(){
var lang=document.querySelector('[aria-label="Language selector"]');if(lang)lang.remove();
var btn=document.querySelector('button[aria-label="Åbn menu"]'),nav=document.querySelector('nav[aria-label="Hovedmenu"]');
if(btn&&nav){var p=document.createElement('div');p.hidden=true;p.style.cssText='position:absolute;left:12px;right:12px;top:100%;z-index:60;background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:8px;box-shadow:0 20px 40px rgba(0,0,0,.12)';
nav.querySelectorAll('a').forEach(function(a){var c=a.cloneNode(true);c.style.cssText='display:block;padding:12px 16px;border-radius:12px;font-weight:600;color:#233137';p.appendChild(c)});
var h=btn.closest('header')||nav.parentElement;h.style.position='relative';h.appendChild(p);
btn.addEventListener('click',function(){p.hidden=!p.hidden;btn.setAttribute('aria-expanded',String(!p.hidden))})}
})();
(function(){
var f=document.querySelector('footer');if(!f||f.querySelector('[data-cookie-settings]')||f.querySelector('a[href="/privatlivspolitik/"]'))return;
var box=f.querySelector('div > div')||f;var p=document.createElement('p');
p.innerHTML='<a href="/privatlivspolitik/" class="font-bold underline-offset-4 hover:underline">Privatlivspolitik</a> · <a href="#" data-cookie-settings class="font-bold underline-offset-4 hover:underline">Cookieindstillinger</a>';box.appendChild(p)})();
