import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Capture token from URL and save to sessionStorage
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
if (token) {
  sessionStorage.setItem("authToken", token);
}

// Normalize GitHub Pages style SPA fallback URLs like `?/<path>&token=...`
// Some WebViews rewrite /idealmarttesting/<path>?q to /idealmarttesting/?/<path>&q
// This converts it back to a proper path before React Router mounts.
try {
  const search = window.location.search || ""; // e.g., ?/faq&token=abc
  const hasWeirdFallback = search.startsWith("?/");
  if (hasWeirdFallback) {
    const rest = search.slice(2); // remove '?/' => 'faq&token=abc'
    const amp = rest.indexOf("&");
    const pathPart = amp === -1 ? rest : rest.slice(0, amp); // 'faq' or 'games/blank'
    const queryPart = amp === -1 ? "" : rest.slice(amp + 1); // 'token=abc&x=y'
    const newPath = `/${pathPart}`;
    const newSearch = queryPart ? `?${queryPart}` : "";
    const base = "/idealmarttesting";
    const newUrl = `${base}${newPath}${newSearch}${window.location.hash || ""}`;
    window.history.replaceState(null, "", newUrl);
  }
} catch {/* noop */}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/idealmarttesting">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
