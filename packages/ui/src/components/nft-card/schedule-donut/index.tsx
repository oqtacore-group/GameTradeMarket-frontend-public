import React, { useState } from 'react';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import {
  WrapperContent,
  DonutChart,
  WrapperCounterCircle,
  CounterCircle,
  Information,
  Title,
  WrapperCounter,
  SvgCircle,
  CircleBack,
} from './style';

interface IDonutProps {
  count: number;
  maxCount: number;
  title: string;
}

export const ScheduleDonut = ({ count, maxCount, title }: IDonutProps) => {
  const [fillLength] = useState<number>(500);
  const { t } = useTranslation('elements', { keyPrefix: 'translation' });

  return (
    <WrapperContent>
      <DonutChart>
        <WrapperCounterCircle>
          <CounterCircle count={count}>{count}</CounterCircle>
        </WrapperCounterCircle>

        <SvgCircle viewBox="0 0 180 180" preserveAspectRatio="xMaxYMax meet">
          <CircleBack r="80" cx="90" cy="90" />
          <circle
            r="80"
            cx="90"
            cy="90"
            strokeLinecap="round"
            style={{
              strokeDashoffset: 500 - (count / maxCount) * 100 * (fillLength / 100),
              stroke: '#FF41B3',
              fill: 'none',
              strokeWidth: '1rem',
              strokeDasharray: 1 + fillLength + 'px',
            }}
          />
        </SvgCircle>
      </DonutChart>

      <Information>
        <Title>{title}</Title>
        <WrapperCounter>
          <span>{count}</span> {t('levels')} <span>{maxCount}</span>
        </WrapperCounter>
      </Information>
    </WrapperContent>
  );
};
