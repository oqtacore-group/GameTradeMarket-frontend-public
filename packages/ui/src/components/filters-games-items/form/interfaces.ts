import { IGenreData } from './blocks/genres';
import { IBlockchainData } from './blocks/blockchains';
import { IReleaseYearOutput } from './blocks/release-year';
import { IPriceModelData } from './blocks/price-model';
import { IFloorPriceData } from './blocks/floor-price';
import { IGameStatusData } from './blocks/game-status';
import { IFriendInGameData } from './blocks/friends-in-game';
import { IDeviceData } from './blocks/device';
import { IPlayAndEarnData } from './blocks/play-and-earn';

export type FilterBlock =
  | 'genre'
  | 'blockchain'
  | 'releaseYear'
  | 'priceModel'
  | 'floorPrice'
  | 'gameStatus'
  | 'friendInGame'
  | 'device'
  | 'playAndEarn';

export interface IFilterFormInputs {
  genre?: IGenreData;
  blockchain?: IBlockchainData;
  releaseYear?: IReleaseYearOutput;
  playAndEarn?: IPlayAndEarnData;
  priceModel?: IPriceModelData;
  floorPrice?: IFloorPriceData;
  gameStatus?: IGameStatusData;
  friendInGame?: IFriendInGameData;
  device?: IDeviceData;
}
