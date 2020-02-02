// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'apiKey': 'AIzaSyAJsJNEBcsnj-NvJT65hkW9oct33Y1kcDk',
  'projectId': 'fir-dev-423cd',
  'messagingSenderId': '979297538852',
  'appId': '1:979297538852:web:d78f26a4739bb72a'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
