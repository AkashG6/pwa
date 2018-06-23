console.log('sw');

const STATIC_CACHE = "1.5"; // change version no. when changes are made so that browser will pick new service worker
// const DYNAMIC_CACHE = "1.0";

var urlsToCache = [
	'/',
	'index.html',
	'about.html',
	'offline.html',
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

// self.addEventListener('fetch',(event)=>{
// 	event.respondWith(
// 		caches.match(event.request)
// 		.then((response)=>{
// 			if (response) {
// 				return response;
// 			}
// 			return fetch(event.request);
// 		})
// 	)
// })


//offline page

self.addEventListener('fetch',(event)=>{
	event.respondWith(
		caches.match(event.request)
		.then((response)=>{
			if (response) {
				return response;
			}
			else
			{
				return fetch (event.request)
				.then((response)=>{
					return response;
				})
			}
		}).catch((err)=>{
			return caches.open(STATIC_CACHE)
			.then(function(cache) {
				return cache.match('/offline.html');
			})
		})
		)
})
