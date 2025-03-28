import React from 'react';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { ItemButtonBuy } from './style';

import { Card } from '@game-trade/lib/codegen-types';
import { trackEventsPixel } from '@game-trade/lib';

export interface ItemListBuyButtonProps {
  card: Card;
  fontSize: string;
}

export function ItemListBuyButton({ card, fontSize }: ItemListBuyButtonProps) {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation.marketplace' });

  const handleClick = () => {
    trackEventsPixel('token_list_purchase', {
      content_type: 'card',
      content_ids: `${card.contract}/${card.id}`,
      value: card?.coin_info?.price,
      currency: card?.coin_info?.blockchain,
      platform: card.platform,
      blockchain: card.blockchain,
    });
  };

  return (
    <div>
      <ItemButtonBuy
        fontSize={fontSize}
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
        className="buy-button">
        {t('buy')}
      </ItemButtonBuy>
    </div>
  );
}
