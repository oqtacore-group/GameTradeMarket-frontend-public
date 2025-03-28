export const formatAddress = (address: string) => {
  return `${address.substr(0, 9)}...${address.substr(address.length - 5, address.length)}`;
};

enum Blockchain {
  Main = 'Main',
  Morden = 'Morden',
  Ropsten = 'Ropsten',
  Rinkeby = 'Rinkeby',
  Goerli = 'Goerli',
  Kovan = 'Kovan',
  Polygon = 'Polygon',
  Unknown = 'Unknown',
}

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
