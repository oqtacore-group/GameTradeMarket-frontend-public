import { Modal } from '../elements/modal';
import React from 'react';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import styled from 'styled-components';
import { shadowBorderEdgeGradient } from '../styles/mixins';

export const List = styled.ul``;
export const Item = styled.li`
  font-size: 20px;
`;

const ModalContent = styled.div`
  padding: 25px;
  align-items: center;
  justify-content: start;
  ${shadowBorderEdgeGradient()};
`;
const ModalHeader = styled.h3``;
const Paragraph = styled.p`
  margin-top: 20px;
`;

export const GameSupportedComponent = ({ hideModal }: { hideModal: () => any }) => {
  const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  return (
    <Modal onClose={hideModal} isCloseOutside={true} hasHeader={false} isPadding={false}>
      <ModalContent>
        <ModalHeader>{t('gameSupported')}</ModalHeader>
        <Paragraph>{t('gameTrade')}</Paragraph>
        <Paragraph style={{ fontStyle: 'italic' }}>{t('whatDoesItMean')}</Paragraph>
        <Paragraph>{t('web3')}</Paragraph>
        <Paragraph>{t('also')}</Paragraph>
        <List>
          <Item>{t('beingScammed')}</Item>
          <Item>{t('beingBlocked')}</Item>
        </List>
        <Paragraph style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          {t('web3IsMuchBetter')}
        </Paragraph>
        <Paragraph>{t('web3Games')}</Paragraph>
        <List>
          <Item>{t('buyItems')}</Item>
          <Item>{t('sellItems')}</Item>
          <Item>{t('rentItems')}</Item>
          <Item>{t('borrowItems')}</Item>
          <Item>{t('destroyItems')}</Item>
        </List>
        <Paragraph>{t('allTheTransactions')}</Paragraph>
        <Paragraph>{t('weAreStanding')}</Paragraph>
        <Paragraph>{t('gtmIsJust')}</Paragraph>
      </ModalContent>
    </Modal>
  );
};
