export {};

declare let NODE_ENV: any;
declare let PUBLIC_URL: any;
declare let process: any;

declare module '*.json';
declare module '*.ttf';
declare module '*.otf';

interface IAnyValues {
  [propName: string]: any;
}

declare global {
  interface Window {
    ethereum: any;
    web3: any;
    phantom: any;
    dataLayer: any;
    fbq: any;
    solana: any;
  }
}
