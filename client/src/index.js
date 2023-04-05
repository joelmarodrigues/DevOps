import "firebase/auth";
import "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./services/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
