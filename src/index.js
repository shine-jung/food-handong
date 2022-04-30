import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Auth from "./service/auth";
import { BrowserRouter as Router } from "react-router-dom";

const auth = new Auth();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App auth={auth} />
    </Router>
  </React.StrictMode>
);
