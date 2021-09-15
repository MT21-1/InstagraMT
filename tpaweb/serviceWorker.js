const assets = [
    "/",
    "/index.html",
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open("InstagraMT").then(cache => {
        cache.addAll(assets);
    }));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(res =>
        res || fetch(e.request)
    ));
});