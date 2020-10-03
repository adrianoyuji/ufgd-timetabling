import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { GlobalProvider } from "./context/global";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
