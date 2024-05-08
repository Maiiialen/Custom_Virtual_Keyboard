import React from "react";
import ReactDOM from "react-dom/client";
import Example from "./pages/Example";
import "./index.scss";

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
          <div>text 1</div>
          <input type="text" />
        </div>
        <div>
          <div>number 1</div>
          <input type="number" />
        </div>
        <div>
          <div>text area</div>
          <textarea />
        </div>
        <div style={{display:"flex", flexDirection:"column"}}>
          <div>check box</div>
          <input type="checkbox" />
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
          <div>text 2</div>
          <input type="text" />
        </div>
        <div>
          <div>number 2</div>
          <input type="number" />
        </div>
      </div>
    </Example>
  </React.StrictMode>
);
