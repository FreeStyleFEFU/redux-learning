import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";

import { App } from "./App";

import "swiper/scss";
import "swiper/scss/lazy";
import "swiper/scss/pagination";

import "./styles/vendor/swiper/swiper-overrides.scss";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
