import "../styles/globals.css";
import Modal from "react-modal";

import { AuthProvider } from "../context/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

Modal.setAppElement("#__next");

export default MyApp;
