import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { store } from "../src/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GoogleOAuthProvider clientId="854137606076-ns8dn6kprde595iu97etfqf49tne8te0.apps.googleusercontent.com">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily:
                "'Poppins', -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
              colorPrimary: "#ffb100",
              // controlHeight: 40,
            },
            components: {
              Layout: {
                colorBgBody: "#0e1020",
                // colorBgHeader: "#7dbcea"
              },
            },
          }}
          getPopupContainer={(node) => {
            if (node) {
              return node.parentNode;
            }
            return document.body;
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
