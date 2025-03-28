import { createGlobalStyle } from 'styled-components';
import { COLORS } from '@game-trade/ui';
import rfs from '@/core-layout/rfs';

export const GlobalStyleApp = createGlobalStyle`

  body {
    &.disable-scroll {
      /* overflow: hidden; */
    }

    & .modal-component-wrapper {
      display: none;

      :last-of-type {
        display: block;
      }
    }

    @media (min-width: 1200px) {
      font-size: 1.6rem;
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

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  hr {
    height: 0;
    border: initial;

    &:after {
      content: "";
      height: 1px;
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      margin-top: 7px;
      background-color: ${COLORS.grayPurple};
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  p {
    font-family: "BaiJamjuree", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 2rem;

    // < 1200px
    @media (max-width: 1119px) {
      font-size: 16px;
    }
    // < 768px
    @media (max-width: 767px) {
      font-size: 15px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: calc(1rem * 0.5);
    font-family: "ChakraPetch";
    font-weight: 500;
    line-height: 1.2;
    color: null;
  }

  p {
    font-family: "BaiJamjuree", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    @media (max-width: 1999px) {
      font-size: 16px;
    }

    @media (max-width: 767px) {
      font-size: 15px;
    }
  }

  mark {
    padding: 0.2em;
    background-color: #fcf8e3;
  }

  h1 {
    ${rfs('calc(1.6rem * 3.5)', 'font-size')};
  }

  h2 {
    ${rfs('calc(1.6rem * 2.25)', 'font-size')};
  }

  h3 {
    ${rfs('calc(1.6rem * 1.9)', 'font-size')};
  }

  h4 {
    ${rfs('calc(1.6rem * 1.5)', 'font-size')};
  }

  h5 {
    ${rfs('calc(1.6rem * 1.25)', 'font-size')};
  }

  h6 {
    ${rfs('calc(1.6rem)', 'font-size')};
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;

    height: 5px;
    background: linear-gradient(59.29deg, #379fff 20.25%, #ff41b3 100%);
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
  }

  #nprogress .spinner {
    display: none;
  }

  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;
