
/***** Service Worker Install ****/
self.addEventListener("install", function(event){
  console.log("Instalando service worker...");
  event.waitUntil(
    caches.open("demand_sw").then(function(cache){
      console.log("Service Worker Instalado.")
      console.log("Prueba apagando el servidor y refrescar la página.")
      return cache.addAll([
        "index.html",
        "assets/css/main.css",
        "assets/css/noscript.css",
        "assets/css/ie9.css",
        "assets/css/font-awesome.min.css",
        "assets/fonts/FontAwesome.otf",
        "assets/fonts/fontawesome-webfont.eot?v=4.6.3",
        "assets/fonts/fontawesome-webfont.svg?v=4.6.3",
        "assets/fonts/fontawesome-webfont.ttf?v=4.6.3",
        "assets/fonts/fontawesome-webfont.woff?v=4.6.3",
        "assets/fonts/fontawesome-webfont.woff2?v=4.6.3",
        "assets/js/jquery.min.js",
        "assets/js/main.js",
        "assets/js/skel.min.js",
        "assets/js/util.js",
        "images/bg.jpg",
        "images/overlay.png",
      ])
    })
  )
})

/***** Service Worker Fetch ****/

self.addEventListener("fetch", function(event){
  event.respondWith(
    /* fetch(event.request).catch(function() {
     *   return caches.match(event.request);
     * })*/
    caches.match(event.request).then(function(response){
      if(response){
        return response;
      }
      return fetch(event.request);
    })
  )
})

