const firebase = require('firebase');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA-xwzOV33JWis-Huuh3-PctPvc53cTFcE",
  authDomain: "url-shortener-a891d.firebaseapp.com",
  databaseURL: "https://url-shortener-a891d.firebaseio.com",
  projectId: "url-shortener-a891d",
  storageBucket: "url-shortener-a891d.appspot.com",
  messagingSenderId: "433260669421",
  appId: "1:433260669421:web:448445ae4e821a44905fe4",
  measurementId: "G-54F6LDNFQN"
};
// Initialize Firebase
exports.admin = firebase.initializeApp(firebaseConfig);
// firebase.analytics();