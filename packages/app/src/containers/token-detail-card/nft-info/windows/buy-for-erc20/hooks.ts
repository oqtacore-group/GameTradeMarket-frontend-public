import Web3 from 'web3';
import { formatUnits } from '@ethersproject/units';
import { Maybe } from '@game-trade/lib/codegen-types';
import ABI_ERC20_APPROVE from '@game-trade/lib/abis/ERC20_APPROVE.json';
import ABI_GTM_ERC721 from '@game-trade/lib/abis/GTM_ERC721.json';
import ABI_GTM_ERC20_COIN from '@game-trade/lib/abis/GTM_ERC20_COIN.json';
import { getContract } from '../../helpers';
// ABI_erc20Trader
export async function getDecimals(_coinAddress: string) {
  const contract = await getContract(ABI_GTM_ERC20_COIN, _coinAddress, true);
  const decimals = await contract.decimals();
  return Number(decimals.toString());
}

export async function getPriceCoin(
  _game: string,
  _name: string,
  _address: string,
  _trade_contract: string
) {
  // const contract = await getContract(ABI_erc20Trader, _trade_contract, true);
  // const decimals = new BigNumber.toBN(await getDecimals(_address));
  // const floatDecimals = decimals.add(Web3.utils.toBN(2));
  // const longNumber = Web3.utils.toBN(10).pow(floatDecimals);
  //
  // const price = Web3.utils.toBN((await contract.getPrice(_game, _name)).toString());
  //
  // const divider = Web3.utils.toBN(10);
  // const exponent = Web3.utils.toBN(27);
  //
  // return price.mul(longNumber).div(divider.pow(exponent)).toNumber() / 100;
}

export async function allowanceCoin(
  coin_contract: string,
  trade_contract: string,
  user_address: string
) {
  const contractCoin = await getContract(ABI_ERC20_APPROVE, coin_contract);
  const decimals = await contractCoin.decimals();
  const allowed = await contractCoin.allowance(user_address, trade_contract);
  const allowedDecimals = formatUnits(allowed.toString(), decimals);
  return { allowed: Number(allowed.toString()), allowedDecimals: Number(allowedDecimals) };
}

export async function approveCoin(
  coin_contract: Maybe<string>,
  trade_contract: Maybe<string>,
  amount: number
) {
  const contractCoin = await getContract(ABI_ERC20_APPROVE, coin_contract);
  const price = Web3.utils.toWei(String(amount), 'wei');
  const tx = await contractCoin.approve(trade_contract, price);
  return await tx.wait();
}

export async function getFeeContract(trade_contract: Maybe<string>, amount: Maybe<number>) {
  const contractTrade = await getContract(ABI_GTM_ERC721, trade_contract);
  const fee = await contractTrade.getFee(Web3.utils.toWei(String(amount), 'wei'));
  return Number(formatUnits(fee));
}
