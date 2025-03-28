import React from 'react';
import { SvgBurger } from '@game-trade/icons';
import { COLORS } from '@game-trade/ui';

import { Burger } from './style';

interface BurgerIconProps {
  onClick: () => void;
}

export const BurgerIcon = React.forwardRef<HTMLDivElement, BurgerIconProps>(({ onClick }, ref) => {
  return (
    <Burger ref={ref} onClick={onClick}>
      <SvgBurger size={40} color={COLORS.white} />
    </Burger>
  );
});
