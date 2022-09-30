import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBHFZ0UYxvkCu63vAM5SnFc9LaY2NptZYU",
  authDomain: "easy4contacts.firebaseapp.com",
  projectId: "easy4contacts",
  storageBucket: "easy4contacts.appspot.com",
  messagingSenderId: "423021745443",
  appId: "1:423021745443:web:2a6dce450346aeb825e896",
  measurementId: "G-77ESQ01P3D",
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
