import{i as u,S as f}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function a(t){u.error({icon:"",backgroundColor:"#ef4040",position:"topRight",message:"Oh, shit! Type something",messageColor:"white"})}function d(t){const r="https://pixabay.com/api/",s=new URLSearchParams({key:"44041025-2e091a4b621ea033778029d2c",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0}),n=`${r}?${s}`;return fetch(n).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}).then(e=>{if(e.hits.length===0)u.error({icon:"",backgroundColor:"#ef4040",position:"topRight",message:"&#11198; Sorry, there are no images matching your search query. Please, try again!",messageColor:"white"});else return e.hits}).catch(e=>console.log(e))}let l;function h(t){const r=document.querySelector(".gallery");r.innerHTML=t.map(s=>m(s)).join(""),l?l.refresh():l=new f(".gallery a",{captionDelay:250,captionsData:"alt"})}function m(t){return`
    <div class="photo-card">
      <a class="link" href="${t.largeImageURL}">
        <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}">
        <div class="info">
        <li><h3 class="info-title">Likes</h3><p class="info-text">${t.likes}</p></li>
        <li><h3 class="info-title">Views</h3><p class="info-text">${t.views}</p></li>
        <li><h3 class="info-title">Comments</h3><p class="info-text">${t.comments}</p></li>
        <li><h3 class="info-title">Downloads</h3><p class="info-text">${t.downloads}</p></li>
      </div>
      </a>
    </div>
  `}function p(){const t=document.querySelector(".loader");t.style.display="block"}function y(){const t=document.querySelector(".loader");t.style.display="none"}function g(){const t=document.querySelector(".gallery");t.innerHTML=""}const L=document.querySelector(".form"),c=document.querySelector(".input");L.addEventListener("submit",t=>{t.preventDefault(),g();const r=c.value.trim();if(!r){a();return}p(),c.value="",d(r).then(s=>{h(s)}).catch(s=>{a(message)}).finally(()=>{y()})});
//# sourceMappingURL=commonHelpers.js.map
