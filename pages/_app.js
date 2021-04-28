import "../styles/globals.css";
import Modal from "react-modal";

import firebase from "firebase/app";

import { firebaseConfig } from "../config/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

Modal.setAppElement("#__next");

export default MyApp;
