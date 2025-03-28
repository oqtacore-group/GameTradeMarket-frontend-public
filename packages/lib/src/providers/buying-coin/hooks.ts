// import web3 from 'web3';
import ABI_GTM_ERC20_COIN from '../../abis/GTM_ERC20_COIN.json';
import ABI_GTM_ERC20_TRADE from '../../abis/GTM_ERC20_TRADE.json';
import { i18next } from '../../services/i18n';
import { ethers } from 'ethers';

// 0x7b79F36018C4fEa3c7160C5533A3209d4F22B645 - address of the smart contract of the coin
// TestGTM - name of the token

const ADDRESS_CONTRACT_TRADE_COINS = '0xaAC62E9BDa76c173805346105f8B82b332d74832';

async function getProvider() {
  const provider =
    typeof window !== 'undefined' && window?.ethereum
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new ethers.BrowserProvider(window.ethereum)
      : null;

  const signer = await provider?.getSigner();
  return { signer, provider };
}

async function getContract(abi: any, address: any, readOnly = false) {
  const { provider, signer } = await getProvider();
  const _provider = readOnly ? provider : signer;
  if (!_provider) {
    const err: any = new Error(`${i18next.t('translation.install', { ns: 'common' })}`);
    err.code = 'METAMASK_NOT_INSTALLED';
    throw err;
  }
  return new ethers.Contract(address, abi, _provider);
}

export async function getDecimals(coinAddress: string) {
  const contract = await getContract(coinAddress, ABI_GTM_ERC20_COIN);
  const decimals = await contract.decimals();
  return Number(decimals.toString());
}

export async function getValue(_game: string, _name: string, _address: string, _count: string) {
  return 0;
  // const contract = await getContract(ADDRESS_CONTRACT_TRADE_COINS, ABI_GTM_ERC20_TRADE);
  // const decimals = web3.utils.toBN(await getDecimals(_address));
  // const floatDecimals = decimals.add(web3.utils.toBN(2));
  // const longNumber = web3.utils.toBN(10).pow(floatDecimals);
  //
  // // const userInput = Number(_count);
  // const count = Number(_count) * 100;
  // // web3.utils.toBN()
  //
  // const price = web3.utils.toBN((await contract.getPrice(_game, _name)).toString());
  //
  // const fee = Number(await getFeePercents());
  //
  // const divider = web3.utils.toBN(10);
  // const exponent = web3.utils.toBN(27);
  // const feePercents = web3.utils.toBN(100 - fee);
  // // const b = web3.utils.toBN(100);
  // // const a = count.mul(b);
  // const a = web3.utils.toBN(count);
  // return price.mul(a).mul(longNumber).div(divider.pow(exponent).mul(feePercents)).toNumber() / 100;
}

export async function getFeePercents() {
  const contract = await getContract(ADDRESS_CONTRACT_TRADE_COINS, ABI_GTM_ERC20_TRADE);

  const fee = await contract.getFeePercents();
  return fee.toString();
}

export async function buyCoin(_game: string, _name: string, _address: string, _count: string) {
  // const contract = await getContract(ADDRESS_CONTRACT_TRADE_COINS, ABI_GTM_ERC20_TRADE);
  // const value = await getValue(_game, _name, _address, _count);
  // if (value) {
  //   const txBuyCoin = await contract.buyCoin(_game, _name, {
  //     value: web3.utils.toWei(String(value), 'wei'),
  //   });
  //   return await txBuyCoin.wait();
  // }
}
