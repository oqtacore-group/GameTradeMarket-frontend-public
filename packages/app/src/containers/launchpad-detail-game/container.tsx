import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  LaunchpadDetailGame,
  Container,
  Wrapper,
  MainImageWrapper,
  Pill,
  MainContainer,
  MediaContainer,
  RoadmapContainer,
  MintWrapper,
  GamePageWrapper,
  TrailerWrapper,
  PicsWrapper,
  MintButton,
  MintHeader,
  Info,
  InfoColumn,
  InfoDateEnd,
  SocialNetwork,
  DescriptionMint,
  GamePageHeader,
  LogoWrapper,
  DescriptionGamePage,
  ShopButton,
  ImageWrapper,
  LogoImageWrapper,
  ContractsTitleBlock,
  BlockDropdown,
  BlocksWrapper,
  ContractLeft,
} from './style';
import {
  GameCardQuery,
  SocialLink,
  useGameCardMintQuery,
  useGameCardQuery,
  useGamesListQuery,
} from '@game-trade/lib/codegen-types';

import { ImageComponent } from '@game-trade/ui/modifiers/get-image-optimization';
import { routes, useCustomWalletConnectorProvider } from '@game-trade/lib';
import Link from 'next/link';
import { SocialNetworkIconComponent } from '@game-trade/ui/modifiers/get-social-network-icon';
import { DescriptionTable, IItem } from '@game-trade/ui/elements/description-table';
import { ClassicCarouselOnlyMedia } from '@game-trade/ui/components/carousel/classic-only-media';
import { CarouselRoadmap } from '@/containers/launchpad-detail-game/carousel-roadmap';
import { Reviews } from '@/containers/game-detail-card/reviews';
import { SvgChevronDown, SvgExternal } from '@game-trade/icons';
import {
  ContractDetail,
  ContractTitle,
  ContractWallet,
  ContractWrapper,
  ExternalLinkWrapper,
} from '../game-detail-card/item-content/description-content/style';
import { BlockchainIconComponent } from '@game-trade/ui/modifiers/get-blockchain-icon-and-text';
import { AddressSliceComponent } from '@game-trade/ui';
import { useTranslation } from 'next-i18next';
import { useWindowLaunchpadContext, WINDOW_TYPES } from '@game-trade/lib/providers/launchpad';
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { changeNetwork, getNetworkName, getChainId } from '@game-trade/lib/utils/get-blockchain';

export interface IProps {
  serverSideData?: {
    gameCard: GameCardQuery;
    gameCode?: string;
  };
}

export const CATEGORY_GEOPOLY: Record<number, string> = {
  9: 'Sportfield',
  14: 'Theater',
  21: 'Museum',
  22: 'Stadium',
  26: 'University',
};

export default function LaunchpadDetailGameContainer({ serverSideData }: IProps) {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.description' });
  const router = useRouter();
  const { onShowWindow, handleChangeGameCode, getGameCode, handleChangeCategoryGeopoly } =
    useWindowLaunchpadContext();
  const { gameName } = router.query;

  const [isContractsOpened, setIsContractsOpened] = useState(false);
  const [isNotInstalled, setNotInstalled] = useState(false);

  const handleContractsClick = useCallback(
    () => setIsContractsOpened(!isContractsOpened),
    [isContractsOpened]
  );

  const { data: dataGameList } = useGamesListQuery({
    variables: {
      name: gameName as string,
    },
  });

  const {
    chainId: networkIdMetamask,
    isActive: activatedMetamask,
    activateConnector,
  } = useCustomWalletConnectorProvider();

  const game = dataGameList?.games?.edges.node && dataGameList?.games?.edges.node[0];
  const gameCode = typeof window === 'undefined' ? serverSideData?.gameCode : game?.code;

  handleChangeGameCode(gameCode || '');

  const { data: getDataGameCard } = useGameCardQuery({
    variables: { code: gameCode as string },
    fetchPolicy: 'no-cache',
    returnPartialData: true,
  });

  const androidMetaMask = 'https://metamask.app.link/bxwkE8oF99',
    iosMetaMask = 'https://metamask.app.link/skAH3BaF99',
    extentionMetaMask = 'https://metamask.io/download/';

  // const { data: getTxUAWGameCard, loading: loadingTxUAW } = useGetGameStatsQuery({
  //   variables: { gameCode: game?.code as string },
  //   fetchPolicy: 'no-cache',
  //   returnPartialData: true,
  // });

  const { data: getGameCardMint } = useGameCardMintQuery({
    variables: { code: gameCode as string },
    fetchPolicy: 'no-cache',
    returnPartialData: true,
  });
  const blockchainName = getGameCardMint?.gameCardMint.blockchain;

  // metamask installed
  useEffect(() => {
    if (!window.ethereum) {
      setNotInstalled(true);
    }
    const reloadData = localStorage.getItem('reloadData');
    if (reloadData) {
      const { isChanged } = JSON.parse(reloadData);
      localStorage.removeItem('reloadData');
      if (isChanged) {
        mintToken();
      }
    }
  }, []);

  // metamask change network
  const networkChangeCondition = getNetworkName(networkIdMetamask) !== blockchainName;
  async function changeNeworkId(chainName: number) {
    const _changeNetwork = async () => {
      await changeNetwork(chainName);
    };

    _changeNetwork().then(() => {
      localStorage.setItem('reloadData', JSON.stringify({ isChanged: true }));
      location.href = location.origin + location.pathname;
    });
  }

  // connect metamask
  async function connect() {
    if (!activatedMetamask) {
      try {
        await activateConnector('MetaMask');
      } catch (e: any) {
        console.log('e', e);
      }
    }
  }

  const handleOpenLink = () => {
    let link;
    if (isAndroid) {
      link = androidMetaMask;
    } else if (isIOS) {
      link = iosMetaMask;
    } else if (!isMobile) {
      link = extentionMetaMask;
    }
    window.open(link, '_blank');
  };

  const gameCardMint = getGameCardMint?.gameCardMint;

  const gameCard =
    typeof window === 'undefined' ? serverSideData?.gameCard.gameCard : getDataGameCard?.gameCard;

  const media = gameCardMint?.media || [];
  const imageLink = media.find((item) => item.type === 'image')?.link || '';
  const videoLink = media.find((item) => item.type === 'video')?.link || '';

  const socialLinks = gameCard?.social_links;
  const logo = gameCard?.logo;
  const mediaLinks = gameCardMint?.media || [];
  const images =
    mediaLinks.filter((item) => item?.type === 'image').map((item) => item?.link) || [];

  const title = gameCardMint?.title;
  const description = gameCardMint?.description;
  const utility = gameCardMint?.utility;
  const startMint = gameCardMint?.start_mint;
  const newDate = new Date(startMint);
  const startPrice = gameCardMint?.start_price;
  const amount = gameCardMint?.amount_items;

  const descriptionTableItems: IItem[] = [
    {
      key: t('publisher'),
      value: gameCard?.publisher,
    },
    {
      key: t('developer'),
      value: gameCard?.developer,
    },
    {
      key: t('releaseDate'),
      value: gameCard?.release_date,
    },
    {
      key: t('rating'),
      value: gameCard?.rating,
    },
    {
      key: t('genres'),
      value: gameCard?.genres?.map((genre) => genre.name).join(', '),
    },
    {
      key: t('itemsOnSale'),
      value: gameCard?.items_on_sale,
    },
  ];
  const mintToken = async (categoryID?: any) => {
    handleChangeCategoryGeopoly(categoryID);
    onShowWindow(WINDOW_TYPES.ALERT);
  };

  const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
      if (getGameCode === 'BATTLECITY') {
        return localStorage?.getItem('battle_city_launchpad');
      } else if (getGameCode === 'GEOPOLY') {
        return localStorage?.getItem('geopoly_launchpad');
      }
    }
    return undefined;
  };

  const viewNFTs = () => {
    onShowWindow(WINDOW_TYPES.VIEW_NFTS);
  };

  return (
    <LaunchpadDetailGame>
      <Container>
        <Wrapper>
          <MainImageWrapper>
            <Pill>Featured launch</Pill>
            <ImageComponent
              link={imageLink}
              LCP={true}
              // staticImg={true}
              styleWrapper={ImageWrapper}
            />
          </MainImageWrapper>
          <MainContainer>
            <MintWrapper>
              <MintHeader>
                <h1>{title}</h1>
                {getLocalStorage() && <MintButton onClick={() => viewNFTs()}>View NFTs</MintButton>}
                {!activatedMetamask && !isNotInstalled && (
                  <MintButton onClick={() => connect()}>Minting</MintButton>
                )}
                {networkChangeCondition && activatedMetamask && (
                  <MintButton onClick={() => changeNeworkId(getChainId(blockchainName))}>
                    Minting
                  </MintButton>
                )}
                {activatedMetamask && !networkChangeCondition && (
                  <MintButton onClick={() => mintToken()}>Minting</MintButton>
                )}
                {isNotInstalled && (
                  <MintButton onClick={() => handleOpenLink()}>Install MetaMask</MintButton>
                )}
              </MintHeader>
              <Info>
                <InfoColumn>
                  <h4>Mint start:</h4>
                  {startMint && (
                    <>
                      <div>{newDate.toDateString()}</div>
                    </>
                  )}
                </InfoColumn>
                <InfoColumn>
                  <h4>Mint end:</h4>
                  <InfoDateEnd>Launched</InfoDateEnd>
                </InfoColumn>
                <InfoColumn>
                  <h4>Start price:</h4>
                  {startPrice && (
                    <>
                      <div>{startPrice}</div>
                    </>
                  )}
                </InfoColumn>
                <InfoColumn>
                  <h4>Amount:</h4>
                  {amount && (
                    <>
                      <div>{amount}</div>
                    </>
                  )}
                </InfoColumn>
              </Info>
              <DescriptionMint>
                {socialLinks && (
                  <SocialNetwork>
                    {(gameCard?.social_links as SocialLink[]).map((item) => {
                      return (
                        <SocialNetworkIconComponent
                          key={Math.random() + item.type}
                          network={item.type}
                          link={item.link}
                        />
                      );
                    })}
                  </SocialNetwork>
                )}
                {description && (
                  <>
                    <h4>Description</h4>
                    <p>{description}</p>
                  </>
                )}
                {utility && (
                  <>
                    <h4>Utility</h4>
                    <p>{utility}</p>
                  </>
                )}
              </DescriptionMint>
            </MintWrapper>
            <GamePageWrapper>
              <div>
                <GamePageHeader>
                  <LogoWrapper>
                    <ImageComponent
                      link={logo}
                      LCP={false}
                      styleWrapper={LogoImageWrapper}
                      shadow={false}
                    />
                  </LogoWrapper>
                  <Link href={routes.games + '/' + title}>
                    <MintButton>Game page</MintButton>
                  </Link>
                </GamePageHeader>
                <DescriptionGamePage>
                  <DescriptionTable items={descriptionTableItems} />
                </DescriptionGamePage>
              </div>
              <BlocksWrapper>
                <ContractsTitleBlock isOpen={isContractsOpened} onClick={handleContractsClick}>
                  {'Contracts'}
                  <ContractLeft>
                    <SvgChevronDown />
                  </ContractLeft>
                  <Link
                    href={
                      routes.marketplace + '/' + title + decodeURIComponent('?gameCode=' + gameCode)
                    }>
                    <ShopButton>Shop Items</ShopButton>
                  </Link>
                </ContractsTitleBlock>
                <BlockDropdown isContractsOpened={isContractsOpened}>
                  {gameCardMint?.contract && (
                    <ContractWrapper>
                      <Link href={{ pathname: gameCardMint.contract }} passHref={true}>
                        <a target="_blank" rel="noreferrer">
                          <ContractDetail>
                            <ContractTitle>
                              {title}{' '}
                              <BlockchainIconComponent blockchain={gameCardMint.blockchain} />
                            </ContractTitle>
                            <ContractWallet>
                              <AddressSliceComponent
                                address={gameCardMint.contract.toLowerCase()}
                              />
                            </ContractWallet>
                          </ContractDetail>
                          <ExternalLinkWrapper>
                            <SvgExternal />
                          </ExternalLinkWrapper>
                        </a>
                      </Link>
                    </ContractWrapper>
                  )}
                </BlockDropdown>
                <div />
              </BlocksWrapper>
            </GamePageWrapper>
          </MainContainer>
          <MediaContainer>
            <TrailerWrapper>
              <h2>Trailer</h2>
              {videoLink && (
                <ClassicCarouselOnlyMedia
                  data={[
                    {
                      src: videoLink,
                      video: true,
                      poster: imageLink,
                      youtube: false,
                    },
                  ]}
                />
              )}
            </TrailerWrapper>
            <PicsWrapper>
              <h2>Game pics</h2>
              <ClassicCarouselOnlyMedia
                data={images.map((image: string) => ({ src: image, alt: title, video: false }))}
              />
            </PicsWrapper>
          </MediaContainer>
          <RoadmapContainer>
            <h2>Project roadmap</h2>
            <CarouselRoadmap items={gameCardMint?.roadmap} />
          </RoadmapContainer>

          <Reviews gameCode={gameCode} />
        </Wrapper>
      </Container>
    </LaunchpadDetailGame>
  );
}
