import React, { useState } from 'react';
import { Content, SupportedWrapper, RightBlock } from './style';
// import { SearchFieldComponent } from './components/searchField';
import { GameSupportedComponent } from '@game-trade/ui/modals/game-supported';
// import SvgMouse from '@root/public/imgs/home/mouse-home.svg';

export const PromoHeadline = () => {
  // const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  // const isMobile = useMediaQuery('(max-width:768px)');
  // const title = t('headline') ? t('headline') : 'Buy and sell your game items for cryptocurrency';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalGamesNotFoundVisible, setIsModalGamesNotFoundVisible] = useState(false);

  const hideModal = () => {
    setIsModalVisible(false);
    setIsModalGamesNotFoundVisible(false);
  };

  return (
    <Content>
      {/* <Title data-text={title}>{title}</Title> */}
      {/* {isMobile && (
        <SearchFieldComponent setIsModalGamesNotFoundVisible={setIsModalGamesNotFoundVisible} />
      )} */}
      <RightBlock>
        {/* <IconsWrapper>
          <Binance>
            <SvgBinance />
          </Binance>
          <Polygon>
            <SvgPolygon />
          </Polygon>
          <Ethereum>
            <SvgEthereum />
          </Ethereum>
        </IconsWrapper> */}
        <SupportedWrapper>
          {/* {!isMobile && (
            <SearchFieldComponent setIsModalGamesNotFoundVisible={setIsModalGamesNotFoundVisible} />
          )} */}
          {/* <Supported onClick={() => setIsModalVisible(true)}>{t('gameSupported')}</Supported> */}
          {/*<SvgMouse />*/}
        </SupportedWrapper>
      </RightBlock>
      {(isModalVisible || isModalGamesNotFoundVisible) && (
        <GameSupportedComponent hideModal={hideModal} />
      )}
    </Content>
  );
};
