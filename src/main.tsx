import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App isBlocked={false}>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div>
          <div>Text</div>
          <input type="text" />
        </div>
        <div>
          <div>Number</div>
          <input type="number" />
        </div>
      </div>
    </App>
  </React.StrictMode>
);
