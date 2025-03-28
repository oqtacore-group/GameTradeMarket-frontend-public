import { Metaplex, bundlrStorage, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { Chain, OpenSeaSDK } from 'opensea-js';

import ABI_GTM_ERC721 from '@game-trade/lib/abis/GTM_ERC721.json';
import { i18next } from '@game-trade/lib/services/i18n';
export const QuickNodeSolana = new Connection(
  `https://muddy-solitary-putty.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_SOLANA_NODE_API_KEY}/`
);
export const MetaplexAddressAuctionHouse =
  process.env.NEXT_PUBLIC_METAPLEX_AUCTION_HOUSE_GAME_TRADE_MARKET || '';
export async function getProvider() {
  const provider =
    typeof window !== 'undefined' && window?.ethereum
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new ethers.BrowserProvider(window.ethereum)
      : null;

  const signer = await provider?.getSigner();
  return { signer, provider };
}

export const getOpenseaChain = (blockchain: string) => {
  switch (blockchain) {
    case 'polygon':
      return Chain.Polygon;
    case 'ethereum':
      return Chain.Mainnet;
    case 'binance':
      return Chain.BNB;
    default:
      return Chain.Mainnet;
  }
};

export const getOpenseaSDK = async (chain: Chain) => {
  const { signer } = await getProvider();
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new OpenSeaSDK(signer, {
      chain,
      apiKey: process.env.NEXT_PUBLIC_SEA_PORT || '',
    });
  } catch (e) {
    console.log('error', e);
  }
};

export async function getContract(abi: any, address: any, readOnly = false) {
  const { provider, signer } = await getProvider();
  const _provider = readOnly ? provider : signer;
  if (!_provider) {
    const err: any = new Error(`${i18next.t('translation.install', { ns: 'common' })}`);
    err.code = 'METAMASK_NOT_INSTALLED';
    throw err;
  }
  return new ethers.Contract(address, abi, _provider);
}

export async function getGas() {
  const res = await fetch(`https://gasstation.polygon.technology/v2`);
  const data = await res.json();
  return data.fast.maxFee;
}

export async function getGTMContractPrice(
  trade_contract_gametrade: any,
  token_contract: string,
  token_value: string
) {
  const contract = await getContract(ABI_GTM_ERC721, trade_contract_gametrade);

  const getDataNft = await contract.getPrice(token_contract, token_value);
  const price = getDataNft[0];
  const fee = getDataNft[1];
  const seller = getDataNft[2];
  return { price, fee, seller };
}

export async function cancelListing(
  wallet?: any,
  nft: PublicKey = new PublicKey('56qPjj5AzNUUXSu7HXDLe6oVLBjgNrL6v6qYivDY7Shk')
) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });

  const listings = await metaplex.auctionHouse().findListings({
    auctionHouse,
    seller: new PublicKey('363BSb39YGY182CeMKkb9RhV9uscdQfup792WPVo2WGP'),
    mint: new PublicKey('56qPjj5AzNUUXSu7HXDLe6oVLBjgNrL6v6qYivDY7Shk'),
  });

  for (const item of listings) {
    const listing = await metaplex.auctionHouse().findListingByReceipt({
      auctionHouse,
      receiptAddress: new PublicKey(item.receiptAddress?.toBase58() as string),
    });
    console.log(
      '_listing',
      listing.price.basisPoints.toString(),
      listing.asset.address.toString(),
      nft.toString()
    );

    if (listing.asset.address.toString() === nft.toString()) {
      const cancelListingResponse = await metaplex.auctionHouse().cancelListing({
        auctionHouse, // The Auction House in which to cancel listing
        listing, // The listing to cancel
      });
      console.log('cancelListingResponse', cancelListingResponse);
    }
  }
}
