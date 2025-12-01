/**
 * main.jsx
 * ========
 * Entry point của React application.
 * Đây là nơi React được mount vào DOM.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
