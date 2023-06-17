import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <HashRouter>
      <GoogleOAuthProvider clientId="427466753640-kv1aqbf0085u0i2edrf83l1mbl7ck5if.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </HashRouter>,
  rootElement
);
