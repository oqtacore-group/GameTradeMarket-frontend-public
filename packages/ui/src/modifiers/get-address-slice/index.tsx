import React, { useEffect, useState } from 'react';
import { SvgCopy } from '@game-trade/icons';

import { AddressTextWrapper, AddressText, AddressWrapper, Clipboard } from './style';

export const AddressSliceComponent = ({
  address,
  copy = true,
}: {
  address: string;
  copy?: boolean;
}) => {
  const [hiddenTooltipCopy, setHiddenTooltipCopy] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setHiddenTooltipCopy(true);
    }, 5000);
  }, [hiddenTooltipCopy]);
  return (
    <AddressWrapper copy={copy}>
      <AddressTextWrapper
        onClick={() => {
          navigator.clipboard.writeText(address);
          setHiddenTooltipCopy(false);
        }}>
        <AddressText>
          <span>{address}</span>
        </AddressText>
        {address?.slice(address?.length - 6, address?.length)}
      </AddressTextWrapper>
      {copy && (
        <Clipboard
          hiddenTooltip={hiddenTooltipCopy}
          onClick={() => {
            navigator.clipboard.writeText(address);
            setHiddenTooltipCopy(false);
          }}>
          <SvgCopy size={20} />
        </Clipboard>
      )}
    </AddressWrapper>
  );
};
