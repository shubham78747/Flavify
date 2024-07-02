import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Provider } from "react-redux";
import { store } from "./Component/Store/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

const client = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AblyProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
        <ChannelProvider channelName='punched_sub_order'>
          <App />
          </ChannelProvider>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </AblyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
