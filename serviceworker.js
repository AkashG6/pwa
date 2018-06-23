console.log('sw');

const STATIC_CACHE = "1.2"; // change version no. when changes are made so that browser will pick new service worker
// const DYNAMIC_CACHE = "1.0";

var urlsToCache = [
	'/',
	'/index.html',
	'/about.html',
	'/dist/main.css',
	'/dist/bundle.js',
	'/resources/scripts/script.js',
];

self.addEventListener('install',(event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE).then((cache)=>{
			console.log('cache opened');
			return cache.addAll(urlsToCache);
		})
	)
})

//getting the pages up offine

self.addEventListener('fetch',(event)=>{
	event.respondWith(
		caches.match(event.request)
		.then((response)=>{
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	)
})