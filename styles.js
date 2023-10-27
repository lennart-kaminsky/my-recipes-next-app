import { createGlobalStyle } from "styled-components";

import { Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --primary-color: #fafafa;
    --primary-bg-color: #0c0d1c;
    --secondary-bg-color: #1e294d;
  }

  body {
    margin: 0;
    font-family: ${poppins.style.fontFamily};
    color: var(--primary-color);
    background-color: var(--primary-bg-color);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }

  h1, h2, h3 {
    font-size: 1.3rem;
  }

  //Grid
  #__next {
    height: 100vh;
    display: grid;
    grid-template-areas:
    "header"
    "main"
    "nav";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  header {
  grid-area: header;
  }

  main {
    grid-area: main;
    overflow: auto;
    margin-inline: 1rem;
  }

  nav {
    grid-area: nav;
  }
  `;
