// Hooks
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App.jsx";

// Utils
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { PreferencesProvider } from "./context/PreferencesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
