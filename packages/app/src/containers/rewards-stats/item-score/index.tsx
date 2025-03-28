import { MenuItem, Navigation, ReferralLink, Score, ScoreWrapper, WrapperItemScore } from './style';
import { SvgCopy, SvgDiamond } from '@game-trade/icons';
import {
  useRewardNavigationContext,
  WINDOW_TYPES,
} from '@game-trade/lib/providers/reward-navigation';

export const ItemScore = () => {
  const { onShowRewardsNavigationWindow } = useRewardNavigationContext();

  const handleCopyReferalLink = () => {
    try {
      navigator.clipboard.writeText('gametrade.market?ref=basil_bulgakov_test');
    } catch (e) {
      console.warn('navigator.clipboard.writeText', e);
    }
  };

  return (
    <WrapperItemScore>
      <ScoreWrapper>
        Your score:{' '}
        <Score>
          <SvgDiamond />
          0/25
        </Score>
      </ScoreWrapper>
      <ReferralLink onClick={handleCopyReferalLink}>
        Your referral link: gametrade.market?ref=xxxx
        <SvgCopy />
      </ReferralLink>
      <Navigation>
        <MenuItem onClick={() => onShowRewardsNavigationWindow(WINDOW_TYPES.RULES)}>Rules</MenuItem>
        <MenuItem onClick={() => onShowRewardsNavigationWindow(WINDOW_TYPES.ABOUT)}>
          About GTM NFTs
        </MenuItem>
        <MenuItem onClick={() => onShowRewardsNavigationWindow(WINDOW_TYPES.TUTORIAL)}>
          Tutorial
        </MenuItem>
      </Navigation>
    </WrapperItemScore>
  );
};
