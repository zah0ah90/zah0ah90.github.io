// Installing service worker
const CACHE_NAME = "pwa-zah0ah";

/* Add relative URL of all the static content you want to store in
 * cache storage (this will help us use our app offline)*/
let resourcesToCache = [
  "./js/jquery-3.5.1.min.js",
  "./js/bootstrap.bundle.min.js",
  "./vendor/owl-carousel/owl.carousel.min.js",
  "./vendor/isotope/isotope.pkgd.min.js",
  "./vendor/nice-select/js/jquery.nice-select.min.js",
  "./vendor/fancybox/js/jquery.fancybox.min.js",
  "./vendor/wow/wow.min.js",
  "./vendor/animateNumber/jquery.animateNumber.min.js",
  "./vendor/waypoints/jquery.waypoints.min.js",
  "./js/topbar-virtual.js",
  "./css/themify-icons.css",
  "./css/bootstrap.css",
  "./vendor/animate/animate.css",
  "./vendor/owl-carousel/owl.carousel.css",
  "./vendor/nice-select/css/nice-select.css",
  "./vendor/fancybox/css/jquery.fancybox.min.css",
  "./css/virtual.css",
  "./css/topbar.virtual.css",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(resourcesToCache);
      })
      .then(self.skipWaiting())
  );
});

// Cache and return requests
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

// Update a service worker
const cacheWhitelist = [CACHE_NAME];
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
