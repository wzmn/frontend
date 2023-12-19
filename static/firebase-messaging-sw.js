importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCtp1-uBttn4YQXCE95xjxADTeCU4MV4Tk",
    authDomain: "snippit-266be.firebaseapp.com",
    projectId: "snippit-266be",
    storageBucket: "snippit-266be.appspot.com",
    messagingSenderId: "676256783802",
    appId: "1:676256783802:web:a427fe71963a278e995183",
    measurementId: "G-SGBDKJR7PV"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload, self.registration);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
    title: payload.notification.title,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});