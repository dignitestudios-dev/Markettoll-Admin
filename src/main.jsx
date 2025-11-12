import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToasterContainer } from "./components/Global/ToasterContainer.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ToasterContainer />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
