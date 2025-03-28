import { SvgBinance, SvgEthereum, SvgPolygon } from '@game-trade/icons';
import React from 'react';
import { Blockchain } from './style';
import { Pills } from '../../components/game/game-card-slide-home-page/style';

export enum BLOCKCHAIN_NETWORK {
  Ethereum = 'ETHEREUM_MAINNET',
  Binance = 'BINANCE',
  Polygon = 'POLYGON',
}

export const BlockchainIconComponent = ({
  blockchain,
  text = false,
  pills = false,
}: {
  blockchain: string;
  text?: boolean;
  pills?: boolean;
}) => {
  const getIcon = (code: string) => {
    switch (code.toUpperCase()) {
      case BLOCKCHAIN_NETWORK.Binance:
        return <SvgBinance />;
      case BLOCKCHAIN_NETWORK.Ethereum:
        return <SvgEthereum />;
      case BLOCKCHAIN_NETWORK.Polygon:
        return <SvgPolygon />;
      default:
        return <></>;
    }
  };

  const getText = (code: string) => {
    switch (code.toUpperCase()) {
      case BLOCKCHAIN_NETWORK.Binance:
        return 'Binance Smart Chain';
      case BLOCKCHAIN_NETWORK.Ethereum:
        return 'Ethereum';
      case BLOCKCHAIN_NETWORK.Polygon:
        return 'Polygon';
      default:
        return code;
    }
  };

  const getPills = (blockchain: string) => {
    if (!blockchain) return;
    switch (blockchain.toUpperCase()) {
      case BLOCKCHAIN_NETWORK.Binance:
        return (
          <Pills color={'white'} key={Math.random() + BLOCKCHAIN_NETWORK.Binance} svg={true}>
            <SvgBinance />
          </Pills>
        );
      case BLOCKCHAIN_NETWORK.Ethereum:
        return (
          <Pills color={'pink'} key={Math.random() + BLOCKCHAIN_NETWORK.Ethereum} svg={true}>
            <SvgEthereum />
          </Pills>
        );
      case BLOCKCHAIN_NETWORK.Polygon:
        return (
          <Pills color={'blue'} key={Math.random() + BLOCKCHAIN_NETWORK.Polygon} svg={true}>
            <SvgPolygon />
          </Pills>
        );
    }
  };

  if (pills) {
    return <>{getPills(blockchain)}</>;
  }

  return (
    <Blockchain>
      {getIcon(blockchain)}
      {text ? getText(blockchain) : ''}
    </Blockchain>
  );
};
