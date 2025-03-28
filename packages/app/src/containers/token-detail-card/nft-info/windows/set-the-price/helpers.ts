import { PublicKey } from '@solana/web3.js';
import { bundlrStorage, Metaplex, sol, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Link } from '@imtbl/imx-sdk';
import { Chain } from 'opensea-js';
import BigNumber from 'bignumber.js';

import { Card } from '@game-trade/lib/codegen-types';
import { PlatrumIncrementCounterSetThePriceOnGTM } from '@game-trade/lib/utils/increment-counter-platrum';
import { SendAlertSNSEmail } from '@game-trade/lib/utils/send-alert-email';
import {
  QuickNodeSolana,
  MetaplexAddressAuctionHouse,
  getOpenseaChain,
  getOpenseaSDK,
  getProvider,
} from '../../helpers';

export async function setThePriceSolana(tokenCard: Card, wallet?: any, price?: string) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });

  await metaplex.auctionHouse().list({
    auctionHouse,
    // QhvsBirir9VoD45p4A8CdVZNChWsLdUBQvpqwAmafox - check if it writes that the token is not valid?
    tokenAccount: new PublicKey(tokenCard.item_data?.item_id as string), // refresh Token Account Address
    mintAccount: new PublicKey(tokenCard.token_value as string),
    price: sol(Number(price)),
  });
  // const transactionBuilder = await metaplex
  //   .auctionHouse()
  //   .builders()
  //   .list({
  //     auctionHouse,
  //     // QhvsBirir9VoD45p4A8CdVZNChWsLdUBQvpqwAmafox - check if it writes that the token is not valid?
  //     tokenAccount: new PublicKey(tokenCard.item_data?.item_id as string), // refresh Token Account Address
  //     mintAccount: new PublicKey(tokenCard.token_value as string),
  //     price: sol(Number(price)),
  //   });
  // new Promise((resolve) => setTimeout(resolve, 1000));
  // await metaplex.rpc().sendAndConfirmTransaction(transactionBuilder);
}

export async function setPrice(_card: Card, data: any) {
  const { signer } = await getProvider();
  const { price } = data;
  if (_card.blockchain === 'immutable') {
    const link = new Link('https://link.x.immutable.com');
    if (price == 0 && _card.imxOrderId) {
      await link.cancel({
        orderId: `${_card.imxOrderId}`,
      });
    }
    if (price > 0) {
      await link.sell({
        amount: price,
        tokenId: _card.token_value,
        tokenAddress: _card.contract,
      });
    }
    return;
  }

  const chain: Chain = getOpenseaChain(_card.blockchain);
  const openseaSDK = await getOpenseaSDK(chain);
  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 3);
  if (_card.token_value && _card.contract && Number(price) && expirationTime) {
    await openseaSDK
      ?.createListing({
        asset: {
          tokenId: _card.token_value,
          tokenAddress: _card.contract,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accountAddress: signer?.address || window?.ethereum?.selectedAddress,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        startAmount: new BigNumber(price),
        expirationTime,
      })
      .then()
      .catch(async (e: any) => {
        console.error('Seaport error', e);
        await SendAlertSNSEmail();
        throw new Error('Transaction rejected');
      });
    await PlatrumIncrementCounterSetThePriceOnGTM();
  }
}
