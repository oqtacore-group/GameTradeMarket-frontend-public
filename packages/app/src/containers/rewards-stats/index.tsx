import { Wrapper, WrapperReward } from './style';
import { NFTCounter } from './NFT-counter';
import { ItemScore } from './item-score';
import { TimeLine } from './time-line';
import { Reward } from './reward';
import { Actions } from './actions';
import { RewardNavigationProvider } from '@game-trade/lib/providers/reward-navigation';

export interface IServerSideProps {
  rewards: any;
}

export const StatsContainer = ({ serverSideData }: { serverSideData: IServerSideProps }) => {
  return (
    <Wrapper>
      <NFTCounter />
      <RewardNavigationProvider>
        <ItemScore />
      </RewardNavigationProvider>
      <TimeLine />
      <WrapperReward>
        <Reward />
        <Actions />
      </WrapperReward>
    </Wrapper>
  );
};
