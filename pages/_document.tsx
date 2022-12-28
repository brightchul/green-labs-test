import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <div id="_modal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
