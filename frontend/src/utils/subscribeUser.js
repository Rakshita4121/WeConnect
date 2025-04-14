import axios from "axios";

// Ensure you have your .env file set with REACT_APP_PUBLIC_VAPID_KEY
const PUBLIC_VAPID_KEY = process.env.REACT_APP_PUBLIC_VAPID_KEY;

export async function subscribeUserToPush() {

  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      // Register service worker from the root
      const registration = await navigator.serviceWorker.register("/service-worker.js");

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Permission not granted for notifications");
        return;
      }

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });

      // Send subscription object to backend
      await axios.post("http://localhost:3002/notifications/subscribe", subscription, { withCredentials: true });

      console.log("User subscribed to push notifications");
    } catch (err) {
      console.error("Failed to subscribe the user: ", err);
    }
  } else {
    console.warn("Push messaging is not supported");
  }
}

// Helper function to convert Base64 string to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
