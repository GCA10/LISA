const C='lisa-v5',F='lisa-fonts',K=u=>u.split('?')[0];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'].map(u=>c.add(u).catch(()=>0)))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C&&x!=F).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
if(/^fonts\.(googleapis|gstatic)\.com$/.test(u.host)){e.respondWith(caches.open(F).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{c.put(r,x.clone());return x}))));return}
if(u.origin!==location.origin)return;
e.respondWith(fetch(r.url,{cache:r.cache=='no-store'?'no-store':'no-cache'}).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(K(r.url),k))}return x}).catch(()=>caches.match(K(r.url))))});
