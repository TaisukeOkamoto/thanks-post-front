import styled, { createGlobalStyle } from 'styled-components'

export const pcSizeWidth = 1220;
export const titleSize = 25;
export const primaryColor = "#45A8A8"
export const secondaryColor = "#C18686"
export const borderColor = "#d0d7d8";
export const textColor = "#4D4B4B";
export const titleMarkerColor = "#46a8a8";
export const section1Color = "#F2F5F7";
export const section2Color = "#F9FBFC";
export const titleBorderColor = "#9a9a9a";

export const Container = styled.div`
padding: 16px;
@media (min-width: 480px) {
  padding: 32px;
}
background: ${section2Color}
`
export const PageInner = styled.div`
  width: 100%;
  @media (min-width: 890px) {
    width: 840px;
    margin: 0 auto;
  }
`

export const ContentsTitle = styled.h3`
  font-weight: bold;
  padding: 8px 0;
`

export const GlobalStyle = createGlobalStyle`

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

 html {
    width: 100%;
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  body {
    width: 100%;
    margin: 0;
    font-size: 1em;
  }
  
  main {
    display: block;
  }
  
  
  h1 {
    font-size: 2em;
    margin: 0;
    box-sizing: border-box;
    color: ${textColor};
  }

  h2 {
    margin: 0;
    box-sizing: border-box;
    color: ${textColor};
  }

  h3 {
    margin: 0;
    box-sizing: border-box;
    color: ${textColor};
  }
  
  p {
    margin: 0;
    box-sizing: border-box;
    color: ${textColor};
  }

  div {
    box-sizing: border-box;
    color: ${textColor};
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }
  
  section {
    box-sizing: border-box;
    color: ${textColor};
  }
  
  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  
  a {
    background-color: transparent;
    text-decoration: none;
    color: ${textColor};
    :visited {
      color: ${textColor};
    }
  }
  
  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }
  
  b,
  strong {
    font-weight: bolder;
  }
  
  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  
  small {
    font-size: 80%;
  }
  
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }
  
  img {
    border-style: none;
  }
  
  input,
  optgroup,
  select,
  button,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    resize: none;
    background-color: "#fff";
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
    box-sizing: border-box;
  }

  button,
  input { /* 1 */
    overflow: visible;
  }
  
  button,
  select { /* 1 */
    color: ${textColor};
    background-color: transparent;
    text-transform: none;
  }
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  
  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }
  
  progress {
    vertical-align: baseline;
  }
  
  textarea {
    overflow: auto;
  }
  
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }
  
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }
  
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }
  
  details {
    display: block;
  }
  
  summary {
    display: list-item;
  }
  
  template {
    display: none;
  }
  
  [hidden] {
    display: none;
  }

  ul {
      margin: 0;
  }
  `