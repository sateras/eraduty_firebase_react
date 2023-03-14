import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { firebaseConfig } from "./utils/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const Context = createContext({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ firebaseApp, auth }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyAvsydtvvEeKEjMnqPdqfc1yfRLx8PQeRg",
//   authDomain: "eraduty.firebaseapp.com",
//   projectId: "eraduty",
//   storageBucket: "eraduty.appspot.com",
//   messagingSenderId: "885562844819",
//   appId: "1:885562844819:web:05ca834d08d3b8726acf66"
// };

// const app = initializeApp(firebaseConfig);
