import React from "react";
import { Provider } from "react-redux";

import wrapper from "../stores";
import "../styles/globals.css";

import type { AppProps } from "next/app";
export default function App({ Component, ...pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
