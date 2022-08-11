// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkAdjocMOD7MeF1RuQlD6Z7qmf_LqqbLU",
  authDomain: "beabook-d6b9f.firebaseapp.com",
  projectId: "beabook-d6b9f",
  storageBucket: "beabook-d6b9f.appspot.com",
  messagingSenderId: "440945712394",
  appId: "1:440945712394:web:2e207802eac6f413d06ef3",
  measurementId: "G-8GR0WTYLTG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);
