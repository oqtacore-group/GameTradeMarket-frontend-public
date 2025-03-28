import { bundlrStorage, Metaplex, sol, walletAdapterIdentity } from '@metaplex-foundation/js';
import { MetaplexAddressAuctionHouse, QuickNodeSolana } from './helpers';
import { PublicKey } from '@solana/web3.js';

export async function withdrawAuctionHouse(wallet?: any) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: new PublicKey(MetaplexAddressAuctionHouse) });

  const withdrawResponse = await metaplex.auctionHouse().withdrawFromFeeAccount({
    auctionHouse,
    amount: sol(0.04),
  });
  console.log('withdrawResponse', withdrawResponse);
}

export async function createActionHouse(wallet?: any) {
  const metaplex = Metaplex.make(QuickNodeSolana)
    .use(walletAdapterIdentity(wallet as any))
    .use(bundlrStorage());

  await metaplex.auctionHouse().create(settings);
}

const settings = {
  sellerFeeBasisPoints: 150,
  canChangeSalePrice: false,
  requiresSignOff: false,
};
