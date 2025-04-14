// public/service-worker.js

self.addEventListener('push', event => {
    const data = event.data.json();
  
    const title = data.title || 'New Notification';
    const options = {
      body: data.body || 'You have a new update!',
      icon: '/icon.png', // optional: replace with your app icon
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(`${options.body.url}`) // Change to a relevant page if needed
    );
  });
  