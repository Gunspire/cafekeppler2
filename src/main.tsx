import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

// SPA deploy fix:
// Some static hosts return 404 on deep links (e.g. /actueel). Our public/404.html
// redirects to "/" and stores the original path in sessionStorage.
// Restore it here before React Router boots.
try {
  const key = "keppler_spa_redirect_v1";
  const redirect = window.sessionStorage.getItem(key);
  if (redirect) {
    window.sessionStorage.removeItem(key);
    window.history.replaceState(null, "", redirect);
  }
} catch {
  // ignore
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
