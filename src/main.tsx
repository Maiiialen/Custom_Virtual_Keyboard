import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Example from "./pages/Example";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Example isBlocked={false} name={"MicrosoftSwiftKeyboard"}>
      <div
        style={{
          width: "100vw",
          height: "calc(100vh-100px)",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "300px",
        }}
      >
        <div>
          <div>Text 1</div>
          <input type="text" />
        </div>
        <div>
          <div>Number 1</div>
          <input type="number" />
        </div>
        <div>
          <div>text area</div>
          <textarea />
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "calc(100vh-100px)",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "300px",
        }}
      >
        <div>
          <div>Text 2</div>
          <input type="text" />
        </div>
        <div>
          <div>Number 2</div>
          <input type="number" />
        </div>
      </div>
    </Example>
  </React.StrictMode>
);
