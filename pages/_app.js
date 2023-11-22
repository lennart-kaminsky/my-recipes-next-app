import { useState } from "react";
import { SWRConfig } from "swr";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Layout />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
