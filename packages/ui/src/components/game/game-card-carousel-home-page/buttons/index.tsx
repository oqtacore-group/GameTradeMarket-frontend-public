import { SvgArrowDown } from '@game-trade/icons';

import { PrevBtn, NextBtn } from './style';

export const PrevButton = ({ enabled, onClick }: { enabled: boolean; onClick?: () => void }) => {
  return (
    <PrevBtn onClick={onClick} disabled={!enabled}>
      <SvgArrowDown />
    </PrevBtn>
  );
};

export const NextButton = ({ enabled, onClick }: { enabled: boolean; onClick?: () => void }) => {
  return (
    <NextBtn onClick={onClick} disabled={!enabled}>
      <SvgArrowDown />
    </NextBtn>
  );
};
