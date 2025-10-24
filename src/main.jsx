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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/idealmarttesting">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
