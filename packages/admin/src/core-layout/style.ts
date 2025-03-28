import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyleApp = createGlobalStyle`
  body {
    &.disable-scroll {
      overflow: hidden;
    }

    & .modal-component-wrapper {
      display: none;

      :last-of-type {
        display: block;
      }
    }
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  #ModalContainer {
    position: absolute;
    z-index: 100;
  }

  * {
    box-sizing: border-box;
  }

  .MuiOutlinedInput-input {
    height: auto!important;
  }
`;

export const ApplicationRootContainer = styled.div`
  height: 100%;
  padding: 16px 50px;

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    text-decoration: inherit; /* 1 */
    vertical-align: inherit; /* 2 */
  }

  svg:not(:root) {
    overflow: hidden;
  }

  /* Grouping content
   * ========================================================================== */

  /**
   * Remove the margin on nested lists in Chrome, Edge, IE, and Safari.
   */

  dl dl,
  dl ol,
  dl ul,
  ol dl,
  ul dl {
    margin: 0;
  }

  /**
   * Remove the margin on nested lists in Edge 18- and IE.
   */

  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin: 0;
  }

  /**
   * 1. Add the correct sizing in Firefox.
   * 2. Show the overflow in Edge 18- and IE.
   */

  hr {
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
   * Add the correct display in IE.
   */

  main {
    display: block;
  }

  /**
   * Remove the list style on navigation lists in all browsers (opinionated).
   */

  nav ol,
  nav ul {
    list-style: none;
    padding: 0;
  }

  /* Text-level semantics
   * ========================================================================== */

  /**
   * Add the correct text decoration in Edge 18-, IE, and Safari.
   */

  abbr[title] {
    text-decoration: underline dotted;
  }

  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

  b,
  strong {
    font-weight: bolder;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd \`em\` font sizing in all browsers.
   */

  code,
  kbd,
  samp {
    font-family: monospace;
    font-size: 1em; /* 2 */
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /* Embedded content
   * ========================================================================== */

  /*
   * Change the alignment on media elements in all browsers (opinionated).
   */

  audio,
  canvas,
  iframe,
  img,
  video {
    vertical-align: middle;
  }

  /**
   * Add the correct display in IE 9-.
   */

  audio,
  video {
    display: inline-block;
  }

  /**
   * Add the correct display in iOS 4-7.
   */

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  /**
   * Remove the border on iframes in all browsers (opinionated).
   */

  iframe {
    border-style: none;
  }

  /**
   * Remove the border on images within links in IE 10-.
   */

  img {
    border-style: none;
  }

  /**
   * Change the fill color to match the text color in all browsers (opinionated).
   */

  /* Tabular data
   * ========================================================================== */

  /**
   * Collapse border spacing in all browsers (opinionated).
   */

  table {
    border-collapse: collapse;
  }

  /* Forms
   * ========================================================================== */

  /**
   * 1. Show the overflow in IE.
   * 2. Remove the inheritance of text transform in Edge 18-, Firefox, and IE.
   */

  button {
    overflow: visible; /* 1 */
    text-transform: none; /* 2 */
  }

  /**
   * 1. Change the inconsistent appearance in all browsers (opinionated).
   * 2. Correct the padding in Firefox.
   */
  fieldset {
    border: 1px solid #a0a0a0; /* 1 */
    padding: 0.35em 0.75em 0.625em; /* 2 */
  }

  /**
   * 1. Add the correct display in Edge 18- and IE.
   * 2. Add the correct vertical alignment in Chrome, Edge, and Firefox.
   */
  progress {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
  }

  /**
   * Remove the inheritance of text transform in Firefox.
   */

  select {
    text-transform: none;
  }

  /**
   * 1. Correct the odd appearance in Chrome, Edge, and Safari.
   * 2. Correct the outline style in Safari.
   */

  [type='search'] {
    outline-offset: -2px; /* 2 */
  }
  /*
   * Add the correct display in all browsers.
   */

  /*
   * 1. Remove the tapping delay in IE 10.
   * 2. Remove the tapping delay on clickable elements
        in all browsers (opinionated).
   */

  a,
  area,
  button,
  input,
  label,
  select,
  summary,
  textarea,
  [tabindex] {
    touch-action: manipulation; /* 2 */
  }

  /**
   * Add the correct display in IE 10-.
   */

  [hidden] {
    display: none;
  }

  /* Accessibility
   * ========================================================================== */

  /**
   * Change the cursor on busy elements in all browsers (opinionated).
   */

  [aria-busy='true'] {
    cursor: progress;
  }

  /*
   * Change the cursor on control elements in all browsers (opinionated).
   */

  [aria-controls] {
    cursor: pointer;
  }

  /*
   * Change the cursor on disabled, not-editable, or otherwise
   * inoperable elements in all browsers (opinionated).
   */

  [aria-disabled='true'],
  [disabled] {
    cursor: not-allowed;
  }

  /*
   * Change the display on visually hidden accessible elements
   * in all browsers (opinionated).
   */

  [aria-hidden='false'][hidden] {
    display: initial;
  }

  [aria-hidden='false'][hidden]:not(:focus) {
    clip: rect(0, 0, 0, 0);
    position: absolute;
  }
`;
