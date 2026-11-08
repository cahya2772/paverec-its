/* PaveRec-ITS Web — penyimpan luring. Utamakan jaringan (agar pembaruan
   langsung terpakai), jatuh ke salinan tersimpan bila tidak ada sinyal. */
const CACHE = "paverec-web-2.0-web.1";
const BERKAS = ["./", "./index.html", "./manifest.webmanifest", "./ikon.svg", "./ikon-180.png", "./ikon-192.png", "./ikon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BERKAS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then((jawab) => {
      if (jawab.ok) { const salin = jawab.clone(); caches.open(CACHE).then((c) => c.put(r, salin)); }
      return jawab;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then((x) => x || caches.match("./index.html")))
  );
});
