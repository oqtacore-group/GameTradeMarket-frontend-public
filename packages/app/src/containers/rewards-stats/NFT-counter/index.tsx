import { WrapperNFTCounter, Left, Legendary, Count, Rare, Common } from './style';

export const NFTCounter = () => {
  return (
    <WrapperNFTCounter>
      <Left>
        NFTs left:
        <Count>10 000/10 000</Count>
      </Left>
      <Common>
        Common NFT`S:
        <Count>7000</Count>
      </Common>
      <Rare>
        Rare NFT`S:
        <Count>1300</Count>
      </Rare>
      <Legendary>
        Legendary NFT`S:
        <Count>588</Count>
      </Legendary>
    </WrapperNFTCounter>
  );
};
