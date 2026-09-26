/* Clean-up only. An earlier upload put the hockey board's offline helper at this
   address. This version removes itself so the football board here loads normally.
   The hockey board has its own helper in /nhl/ and is not affected. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});
