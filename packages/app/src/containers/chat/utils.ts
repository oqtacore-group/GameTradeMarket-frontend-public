import io from 'socket.io-client';

export const formatAddress = (address: string) => {
  return `${address.substr(0, 9)}...${address.substr(address.length - 5, address.length)}`;
};

export enum Blockchain {
  Main = 'Main',
  Morden = 'Morden',
  Ropsten = 'Ropsten',
  Rinkeby = 'Rinkeby',
  Goerli = 'Goerli',
  Kovan = 'Kovan',
  Polygon = 'Polygon',
  Unknown = 'Unknown',
}

export const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

export function getNetwork(networkId: number | undefined) {
  switch (networkId) {
    case 1:
      return Blockchain.Main;
    case 2:
      return Blockchain.Morden;
    case 3:
      return Blockchain.Ropsten;
    case 4:
      return Blockchain.Rinkeby;
    case 5:
      return Blockchain.Goerli;
    case 42:
      return Blockchain.Kovan;
    case 137:
      return Blockchain.Polygon;
    default:
      return Blockchain.Unknown;
  }
}

export let socket: any;
export function initChatSocket() {
  socket = io(String(process.env.NEXT_PUBLIC_WS_URL), {
    // withCredentials: true,
    path: '/api/chat',
    transports: ['polling'],
    // 'websocket'
    auth: {
      Authorization: localStorage.getItem('token'),
    },
  });
}
