(function(){
var K='osg_cookie';
var banner=document.querySelector('aside[aria-label="Cookieindstillinger"]');
if(banner){try{if(localStorage.getItem(K))banner.remove()}catch(e){}
banner.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){try{localStorage.setItem(K,b.textContent.trim())}catch(e){}banner.remove()})})}
var lang=document.querySelector('[aria-label="Language selector"]');if(lang)lang.remove();
var btn=document.querySelector('button[aria-label="Åbn menu"]'),nav=document.querySelector('nav[aria-label="Hovedmenu"]');
if(btn&&nav){var p=document.createElement('div');p.hidden=true;p.style.cssText='position:absolute;left:12px;right:12px;top:100%;z-index:60;background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:8px;box-shadow:0 20px 40px rgba(0,0,0,.12)';
nav.querySelectorAll('a').forEach(function(a){var c=a.cloneNode(true);c.style.cssText='display:block;padding:12px 16px;border-radius:12px;font-weight:600;color:#233137';p.appendChild(c)});
var h=btn.closest('header')||nav.parentElement;h.style.position='relative';h.appendChild(p);
btn.addEventListener('click',function(){p.hidden=!p.hidden;btn.setAttribute('aria-expanded',String(!p.hidden))})}
})();
