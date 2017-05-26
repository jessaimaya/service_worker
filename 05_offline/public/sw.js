/***** Service Worker Install ****/
self.addEventListener("install", function(event){
  console.log("Instalando service worker...");
  
  event.waitUntil(
    caches.open("offline_sw").then(function(cache){
      console.log("Service Worker Instalado.")
      console.log("Prueba apagando el servidor y refrescar la página.")
      return cache.addAll([
        "offline.html"
      ])
    })
  )
})

/***** Service Worker - Fetch ****/

self.addEventListener("fetch", function(event){

  var request = event.request;

  if (request.method === 'GET') {
    event.respondWith(
      fetch(request).catch(function(error) {
        return caches.open('offline_sw').then(function(cache) {
          return cache.match(request).then(function (matching) {
            return cache.match('offline.html');
          });
        });
      })
    );
  }
  
})

