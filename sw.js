/* MANAGEMENT PANDITA: cache gambar & cadangan halaman */
var V="mp-260";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V&&x!==V+"-img"}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url); if(r.method!=="GET"||u.origin!==location.origin)return;
  if(u.pathname.indexOf("/img/")===0){e.respondWith(caches.open(V+"-img").then(function(c){return c.match(r).then(function(h){return h||fetch(r).then(function(n){if(n.ok)c.put(r,n.clone());return n})})}));return}
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(n){if(n.ok){var cp=n.clone();caches.open(V).then(function(c){c.put("/",cp)})}return n}).catch(function(){return caches.open(V).then(function(c){return c.match("/")})}))}
});
