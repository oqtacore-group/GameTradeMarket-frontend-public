import { createGlobalStyle } from 'styled-components';
import { COLORS } from '@game-trade/ui';
import rfs from '@/core-layout/rfs';

export const RebootStyleApp = createGlobalStyle`

  body {
    margin: 0; // 1
    font-family: "BaiJamjuree", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    font-weight: 400;
    line-height: 1.5;
    color: white;
    text-align: left;
    background-color: ${COLORS.darkPurple};
    min-height: -webkit-fill-available;
    ${rfs('1.6rem', 'font-size')};
  }

  html {
    font-size: 0.55546392vw; // 100vw / 1940px * 10
    font-family: sans-serif; // 2
    line-height: 1.15; // 3
    -webkit-text-size-adjust: 100%; // 4
    -webkit-tap-highlight-color: rgba(${COLORS.black}, 0); // 5
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
  }

  [tabindex="-1"]:focus:not(:focus-visible) {
    outline: 0 !important;
  }

  hr {
    box-sizing: content-box; // 1
    height: 0; // 1
    overflow: visible; // 2
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: calc(1rem * 0.5);
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  abbr[title],
  abbr[data-original-title] { // 1
    text-decoration: underline; // 2
    text-decoration: underline dotted; // 2
    cursor: help; // 3
    border-bottom: 0; // 4
    text-decoration-skip-ink: none; // 5
  }

  address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: .5rem;
    margin-left: 0;
  }

  blockquote {
    margin: 0 0 1rem;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    ${rfs('80%', 'font-size')};
  }

  sub,
  sup {
    position: relative;
    ${rfs('75%', 'font-size')};
    line-height: 0;
    vertical-align: baseline;
  }

  sub { bottom: -.25em; }
  sup { top: -.5em; }

  a {
    color: rgba(13, 110, 253, 0.11);
    text-decoration: underline;
    background-color: transparent; // Remove the gray background on active links in IE 10.
    transition: .3s;

    &:hover {
      color: ${COLORS.pink};
    }
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;

     &:hover {
      color: inherit;
      text-decoration: none;
    }
  }

  pre,
  code,
  kbd,
  samp {
    ${rfs('1em', 'font-size')};
  }

  pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
    -ms-overflow-style: scrollbar;
  }

  figure {
    margin: 0 0 1rem;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse; // Prevent double borders
  }

  caption {
    text-align: left;
    caption-side: bottom;
  }

  th {
    text-align: inherit;
  }


  label {
    display: inline-block;
  }

  button {
    border-radius: 0;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    ${rfs('inherit', 'font-size')};
    line-height: inherit;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  [role="button"] {
    cursor: pointer;
  }

  select {
    word-wrap: normal;
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
    padding: 0;
    border-style: none;
  }

  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-bottom: .5rem;
    ${rfs('1.5rem', 'font-size')};
    line-height: inherit;
    color: inherit;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit; // 2
    -webkit-appearance: button; // 1
  }

  output {
    display: inline-block;
  }

  summary {
    display: list-item;
    cursor: pointer;
  }

  template {
    display: none;
  }

  button {
    cursor: pointer;
    border: initial;
    outline: initial;
    background-color: initial;
    &:focus {
      outline: initial;
    }
  }

  .videoWrapper {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  [hidden] {
    display: none !important;
  }

  @media (min-width: 1940px) {
    html {
      font-size: 10px;
    }
  }

  @media (max-width: 920px) {
    html {
      font-size: 6.5px;
    }
  }

  @media (max-width: 575px) {
    body {
      font-size: 2.0rem;
    }
  }
`;
