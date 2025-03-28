import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { isMobile } from 'react-device-detect';
import { SvgCopy } from '@game-trade/icons';
import { Currency } from '@game-trade/lib/src/codegen-types';

import { CurrencyItem, FormatUnitsBalances, TooltipTitleStyled, TooltipStyled } from './style';

interface IParsedCurrency extends Currency {
  isValueLong: boolean;
  valueParsed: string;
}

export const CurrencyItemComponent = ({
  value,
  isValueLong,
  valueParsed,
  currency,
}: IParsedCurrency) => {
  const [open, setOpen] = useState(false);
  const [isMouseDown, setMouseDown] = useState(false);

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(value);
    } catch (e) {
      console.warn('navigator.clipboard.writeText', e);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const onMouseDown = () => {
    setMouseDown(true);
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  const tooltipProps = {} as any;
  if (isMobile) {
    tooltipProps['onClose'] = handleTooltipClose;
    tooltipProps['open'] = open;
    tooltipProps['disableFocusListener'] = true;
    tooltipProps['disableHoverListener'] = true;
    tooltipProps['disableTouchListener'] = true;
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <CurrencyItem onClick={handleTooltipOpen}>
        <TooltipStyled
          PopperProps={{
            disablePortal: true,
          }}
          title={
            <TooltipTitleStyled
              onClick={handleCopyAddress}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onTouchStart={onMouseDown}
              onTouchEnd={onMouseUp}
              isMouseDown={isMouseDown}>
              {value}
              &nbsp; &nbsp;
              <span>
                <SvgCopy size={12} />
              </span>
            </TooltipTitleStyled>
          }
          placement="top"
          arrow={true}
          {...tooltipProps}>
          <FormatUnitsBalances>
            <span>{isValueLong ? `${valueParsed}...` : valueParsed}</span>
            <span>{currency}</span>
          </FormatUnitsBalances>
        </TooltipStyled>
      </CurrencyItem>
    </ClickAwayListener>
  );
};
