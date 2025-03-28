import Web3 from 'web3';

export function getNetworkName(networkId: number | undefined) {
  switch (networkId) {
    case 1:
      return 'ethereum_mainnet';
    case 5:
      return 'goerli';
    case 56:
      return 'binance';
    case 137:
      return 'polygon';
    case 80001:
      return 'mumbai';
    default:
      return 'unknown';
  }
}

export function getChainId(networkName: string | undefined): number {
  switch (networkName) {
    case 'ethereum_mainnet':
      return 1;
    case 'goerli':
      return 5;
    case 'binance':
      return 56;
    case 'polygon':
      return 137;
    case 'mumbai':
      return 80001;
    default:
      return 1;
  }
}

export async function changeNetwork(chainId: number) {
  const chain = getNetworkName(chainId);
  function networkSettings() {
    switch (chain) {
      case 'binance':
        return {
          chainName: 'BNB Smart Chain',
          chainId: Web3.utils.toHex(chainId),
          nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
        };
      case 'polygon':
        return {
          chainName: 'Polygon Mainnet',
          chainId: Web3.utils.toHex(chainId),
          nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
          rpcUrls: ['https://polygon-rpc.com/'],
        };
    }
  }

  if (window.ethereum) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        const network = networkSettings();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],
        });
      }
      return err;
    }
  }
}
