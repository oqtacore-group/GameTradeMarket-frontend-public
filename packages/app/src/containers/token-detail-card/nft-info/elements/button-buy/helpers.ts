import Web3 from 'web3';
import {
  bundlrStorage,
  Metaplex,
  walletAdapterIdentity,
  toBigNumber,
} from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { Link } from '@imtbl/imx-sdk';
import { Chain, OrderSide } from 'opensea-js';
import {
  getGas,
  getGTMContractPrice,
  getOpenseaChain,
  QuickNodeSolana,
  MetaplexAddressAuctionHouse,
  getOpenseaSDK,
  getContract,
  getProvider,
} from '../../helpers';
import ABI_RISE_OF_ELVES from '@game-trade/lib/abis/RISE_OF_ELVES.json';
import ABI_GTM_ERC721 from '@game-trade/lib/abis/GTM_ERC721.json';
import { Card, User } from '@game-trade/lib/codegen-types';
import { i18next } from '@game-trade/lib/services/i18n';
import { dataLayerTrigger, trackEventsPixel } from '@game-trade/lib';
import { PlatrumIncrementCounterBuyingSeaport } from '@game-trade/lib/utils/increment-counter-platrum';

// address: PublicKey

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getListingSolana(tokenCard: Card, metaplex: any, auctionHouse: any) {
  const listings = await metaplex.auctionHouse().findListings({
    auctionHouse,
    seller: new PublicKey(tokenCard.owner as string),
    // CKVTqxVGitpg2ETj4vKrTAoiTzFaFRWBuVfJWGmqFbev
    mint: new PublicKey(tokenCard.token_value as string),
    //56qPjj5AzNUUXSu7HXDLe6oVLBjgNrL6v6qYivDY7Shk
  });

  const listingsByReceipt: any[] = [];

  for (const lg of listings) {
    await timeout(1000);
    const repsnose = await metaplex.auctionHouse().findListingByReceipt({
      auctionHouse,
      receiptAddress: new PublicKey(lg.receiptAddress?.toBase58() as string),
    });
    listingsByReceipt.push(repsnose);
  }

  const listingsByReceiptCreated = listingsByReceipt.map((lg: any) => lg?.createdAt?.toNumber());

  return listingsByReceipt.find(
    (lg: any) =>
      lg.asset.address.toString() === tokenCard.token_value &&
      lg.createdAt.toNumber() === Math.max(...listingsByReceiptCreated)
  );
}

//
export async function buySolana(tokenCard: Card, wallet?: any): Promise<any> {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });
  const listing = await getListingSolana(tokenCard, metaplex, auctionHouse);

  if (listing) {
    const transactionBuyBuilder = await metaplex.auctionHouse().builders().buy({
      auctionHouse,
      listing,
    });
    await timeout(3000);

    const sendTransaction = async (attempt = 1): Promise<any> => {
      let txId = '';
      await metaplex
        .rpc()
        .setDefaultFeePayer(wallet)
        .sendTransaction(transactionBuyBuilder)
        .then((response) => {
          txId = response;
        });

      const response = await getSolanaTransactionInfo(txId);
      console.log('attempt', attempt);

      if (attempt > 5) return new Error('Transaction failed');
      if (!response) {
        return await sendTransaction(attempt + 1);
      } else {
        return response;
      }
    };

    return await sendTransaction();
  }
}

export async function getSolanaTransactionInfo(id: string, time = 3000): Promise<any> {
  await timeout(3000);
  let response = await QuickNodeSolana.getTransaction(id, {
    maxSupportedTransactionVersion: 0,
  });
  if (time > 40000) return;
  if (!response) {
    time += 3000;
    response = await getSolanaTransactionInfo(id, time);
    return response;
  } else {
    return response;
  }
}

export async function updateAuctionHouse(wallet: any) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });

  const updateResponse = await metaplex.auctionHouse().update({
    auctionHouse,
    sellerFeeBasisPoints: 120,
  });
  console.log('updateResponse', updateResponse);
}

export async function sendDeposit(wallet: any) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });

  const depositResponse = await metaplex.auctionHouse().depositToBuyerAccount({
    auctionHouse,
    amount: {
      basisPoints: toBigNumber(0.02),
      currency: {
        symbol: 'SOL',
        decimals: 9,
        namespace: 'spl-token',
      },
    },
  });
  console.log('buyerBalance', depositResponse);
}

export async function buy(
  card: Card,
  gameCode: string,
  platform: string,
  user?: User | null,
  _accountAddress?: string
) {
  const { signer } = await getProvider();
  let tx;

  if (card.blockchain === 'immutable') {
    if (!card.imxOrderId)
      throw new Error(`${i18next.t('translation.justPurchase', { ns: 'common' })}`);
    tx = new Link('https://link.x.immutable.com');
    await tx.buy({
      orderIds: [`${card.imxOrderId}`],
    });
  }

  if (platform === 'RISE_OF_ELVES') {
    const contract = await getContract(
      ABI_RISE_OF_ELVES,
      '0xd05f4fa592dd57b63823b29812209fb38517baa6'
    );
    tx = await contract.bid(String(card.token_value), {
      value: Web3.utils.toWei(String(Number(card.price) + 0.5), 'wei'),
    });
  }

  if (platform === 'SEAPORT') {
    const chain: Chain = getOpenseaChain(card.blockchain);
    const openseaSDK = await getOpenseaSDK(chain);
    const order = await openseaSDK?.api?.getOrder({
      assetContractAddress: card.contract,
      tokenId: card.token_value,
      side: OrderSide.ASK,
    });
    if (order) {
      await PlatrumIncrementCounterBuyingSeaport();
      await openseaSDK?.fulfillOrder({
        order,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        accountAddress: signer?.address || window?.ethereum?.selectedAddress,
      });
    }
  }

  if (platform === 'GAMETRADE' && card?.trade_contract_gametrade) {
    const contract = await getContract(ABI_GTM_ERC721, card.trade_contract_gametrade);

    const { price, fee } = await getGTMContractPrice(
      card.trade_contract_gametrade,
      card.contract,
      card.token_value
    );
    const totalPrice = price.add(fee);
    const gas = await getGas();
    const gasPrice = Web3.utils.toWei(String(gas), 'gwei');

    const contractArgs: any = {};

    if (card.blockchain === 'polygon') contractArgs.gasPrice = gasPrice;

    if (
      card?.coin_info?.coin_address &&
      card?.coin_info?.coin_address !== '0x0000000000000000000000000000000000000000'
    ) {
      contractArgs.value = 0;
      tx = await contract.buyToken(card.contract, card.token_value, contractArgs);
    } else {
      contractArgs.value = totalPrice.toString();
      tx = await contract.buyToken(card.contract, card.token_value, contractArgs);
    }
  }

  if (platform !== 'SEAPORT') await tx.wait();

  dataLayerTrigger('transactionInProgress', {
    tokenContract: card.contract,
    tokenId: `${gameCode}/${card.id}`,
    tokenPrice: card.coin_info?.usd_price,
    currency: 'USD',
    platform,
    blockchain: card.blockchain,
    email: user ? user?.email : 'non-registered user',
    wallet: user ? user?.wallets : 'non-registered user',
  });
  trackEventsPixel('Purchase', {
    content_type: 'card',
    content_ids: `${gameCode}/${card.id}`,
    value: card.coin_info?.usd_price,
    currency: 'USD',
    platform,
    blockchain: card.blockchain,
    email: user ? user?.email : 'non-registered user',
    wallet: user ? user?.wallets : 'non-registered user',
  });
}
