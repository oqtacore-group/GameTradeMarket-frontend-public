import { AddressSliceComponent, Button, ImageComponent } from '@game-trade/ui';
import { SvgChevronDown, SvgExternal, SvgVerification } from '@game-trade/icons';
import React, { useCallback, useState } from 'react';
import {
  TextContentWrapper,
  Headline,
  Logo,
  BlocksWrapper,
  BlockMain,
  BlockFooter,
  ContractsTitleBlock,
  BlockDropdown,
  ContractWallet,
  ContractTitle,
  ContractWrapper,
  ExternalLinkWrapper,
  ContractDetail,
  ButtonsWrapper,
} from './style';
import Link from 'next/link';
import {
  AppLink,
  GameCard,
  GameCardContract,
  // useGetGameStatsQuery,
} from '@game-trade/lib/codegen-types';
import { routes, useGameDownloadsContext } from '@game-trade/lib';
import { BlockchainIconComponent } from '@game-trade/ui/modifiers/get-blockchain-icon-and-text';
import { DescriptionTable, IItem } from '@game-trade/ui/elements/description-table';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameCard?: GameCard | null;
  game?: any;
}

export const DescriptionContent = (props: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.description' });
  const { setShowWindow, handleSetTempData } = useGameDownloadsContext();
  const { gameCard, game } = props;
  const contracts = gameCard?.contracts;
  const app_links = gameCard?.app_links;

  // const { data: getTxUAWGameCard, loading: loadingTxUAW } = useGetGameStatsQuery({
  //   variables: { gameCode: props.game?.code as string },
  //   fetchPolicy: 'no-cache',
  //   returnPartialData: true,
  // });

  const logo = gameCard?.logo;

  const [isContractsOpened, setIsContractsOpened] = useState(false);

  const handleContractsClick = useCallback(
    () => setIsContractsOpened(!isContractsOpened),
    [isContractsOpened]
  );

  const openApps = () => {
    setShowWindow(true);
    handleSetTempData({ app_links });
  };

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
    {
      key: t('floorPrice'),
      value: gameCard?.floor_price,
      price: true,
      blockchain: gameCard?.blockchainNames[0],
    },
    // {
    //   key: t('tx7d'),
    //   value: getTxUAWGameCard?.gameStats?.tx_7d,
    //   price: false,
    //   loader: true,
    //   loadingState: loadingTxUAW,
    // },
    // {
    //   key: t('tx30d'),
    //   value: getTxUAWGameCard?.gameStats?.tx_30d,
    //   price: false,
    //   loader: true,
    //   loadingState: loadingTxUAW,
    // },
    // {
    //   key: t('uaw7d'),
    //   value: getTxUAWGameCard?.gameStats?.uaw_7d,
    //   price: false,
    //   loader: true,
    //   loadingState: loadingTxUAW,
    // },
    // {
    //   key: t('uaw30d'),
    //   value: getTxUAWGameCard?.gameStats?.uaw_30d,
    //   price: false,
    //   loader: true,
    //   loadingState: loadingTxUAW,
    // },
  ];

  return (
    <TextContentWrapper>
      <Headline>
        <Logo>
          <ImageComponent
            link={logo}
            alt={game}
            LCP={false}
            objectFit={'contain'}
            styleWrapper={{
              position: 'initial',
            }}
          />
        </Logo>

        <ButtonsWrapper>
          {app_links && app_links.length > 0 ? (
            <Button onClick={openApps} appearance="primary" dimension="m">
              {t('play')}
            </Button>
          ) : app_links?.length === 1 ? (
            <Link href={{ pathname: (app_links[0] as AppLink).link }} passHref={true}>
              <a target="_blank" rel="noreferrer">
                <Button appearance="primary" dimension="m">
                  {t('play')}
                </Button>
              </a>
            </Link>
          ) : (
            ''
          )}

          {game?.name && (
            <Link
              href={{ pathname: routes.marketplaceGameName }}
              as={`${routes.marketplace}/${game.name.replace(
                /\s+/g,
                '-'
              )}?gameCode=${encodeURIComponent(game.code.replaceAll(/\s/g, '_').toUpperCase())}`}
              passHref={true}>
              <a target="_blank">
                <Button appearance="primary" dimension="m">
                  {t('shopItems')}
                </Button>
              </a>
            </Link>
          )}
        </ButtonsWrapper>
      </Headline>

      <BlocksWrapper>
        <BlockMain>
          <DescriptionTable items={descriptionTableItems} />
        </BlockMain>
        <BlockFooter>
          <ContractsTitleBlock isOpen={isContractsOpened} onClick={handleContractsClick}>
            {t('contracts')}
            <SvgChevronDown />
          </ContractsTitleBlock>
        </BlockFooter>
        <BlockDropdown isContractsOpened={isContractsOpened}>
          {contracts &&
            contracts?.map((item: GameCardContract, id) => (
              <ContractWrapper key={id + ' ' + item.link}>
                <Link href={{ pathname: item.link }} passHref={true}>
                  <a target="_blank" rel="noreferrer">
                    <ContractDetail>
                      <ContractTitle>
                        {item.title} <BlockchainIconComponent blockchain={item.blockchain} />
                      </ContractTitle>
                      <ContractWallet>
                        <AddressSliceComponent address={item.contract_address.toLowerCase()} />
                        {item.verify && <SvgVerification />}
                      </ContractWallet>
                    </ContractDetail>
                    <ExternalLinkWrapper>
                      <SvgExternal />
                    </ExternalLinkWrapper>
                  </a>
                </Link>
              </ContractWrapper>
            ))}
        </BlockDropdown>
      </BlocksWrapper>
    </TextContentWrapper>
  );
};
