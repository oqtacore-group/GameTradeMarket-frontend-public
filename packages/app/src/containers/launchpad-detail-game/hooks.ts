import ABI_GTM_LAUNCHPAD_MINT_CLASSIC from '@game-trade/lib/abis/GTM_launchpad_classic.json';
import ABI_GTM_LAUNCHPAD_MINT_ORACLE from '@game-trade/lib/abis/GTM_launchpad_oracle.json';
import { trackEventsPixel } from '@game-trade/lib';
import { getContract } from '../token-detail-card/nft-info/helpers';

const _BSC_GTM_MINT_CONTRACT_ADDRESS = '0x75b989726A11870dD07C80b716A7b8F80E582235';

// const _POLYGON_GTM_MINT_CONTRACT_ADDRESS = '0x68247e1d2f355444bD5c83b3dAF5e01F70f44E20';
const _POLYGON_GTM_MINT_CONTRACT_ADDRESS = '0x3eBc72222736a254902d63B297c53DB605222Fc8';

export async function getIdNFT(gameCode: string, address?: string) {
  let mintContract;
  if (gameCode === 'BATTLECITY') {
    mintContract = await getContract(
      ABI_GTM_LAUNCHPAD_MINT_CLASSIC,
      _BSC_GTM_MINT_CONTRACT_ADDRESS
    );
    return await mintContract.getNewTokenId();
  }

  if (gameCode === 'GEOPOLY') {
    mintContract = await getContract(
      ABI_GTM_LAUNCHPAD_MINT_ORACLE,
      _POLYGON_GTM_MINT_CONTRACT_ADDRESS
    );
    return await mintContract.viewOwnerIds(address);
  }
  if (!mintContract) return;
}

export async function sendNotification(gameCode: string | undefined, address: string, id: string) {
  return new Promise(() => {
    const text = `Game (code) = ${gameCode};\naddress = ${address};\nid = ${id}`
      .replace(/ /g, '%20')
      .split('\n')
      .join('%0A');
    const url = `https://api.telegram.org/bot${process.env.NOTIFICATION_BOT_TOKEN}/sendMessage?chat_id=-800575501&text=${text}`;
    fetch(url, {
      method: 'POST',
    });
  });
}
// 0x0b72a80c151dec838cb6fbce002c09ed35897345
// 0x8569EE0cbB0a3C90CE5875BEFD737412afb80b3c

export async function mintGeopoly(_categoryID: number) {
  const LaunchpadContract = await getContract(
    ABI_GTM_LAUNCHPAD_MINT_ORACLE,
    _POLYGON_GTM_MINT_CONTRACT_ADDRESS
  );
  const priceUSDT = await LaunchpadContract.getPriceNFT(_categoryID);
  const exchangePair = await LaunchpadContract.getPricePair();
  const sum: any = 10 ** 8 * (Number(priceUSDT) / Number(exchangePair));
  const price = sum * 0.002 + sum;
  const tx = await LaunchpadContract.mint(_categoryID, { value: price.toString() });

  await tx.wait();

  trackEventsPixel('Mint', {
    content_type: 'card',
  });
}

export async function mintClassic() {
  const LaunchpadContract = await getContract(
    ABI_GTM_LAUNCHPAD_MINT_CLASSIC,
    _BSC_GTM_MINT_CONTRACT_ADDRESS
  );
  const price = await LaunchpadContract.getPriceNft();
  await LaunchpadContract.mint({ value: price });

  trackEventsPixel('Mint', {
    content_type: 'card',
  });
}
