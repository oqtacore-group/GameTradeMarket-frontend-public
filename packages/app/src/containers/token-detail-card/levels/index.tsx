import { useMediaQuery } from 'react-responsive';
import { CardLevel } from '@game-trade/lib/src/codegen-types';
import { ScheduleDonut } from '@game-trade/ui';
import { WrapperColumns, Headline, WrapperContent, Column } from './style';

import { setDonuts } from './helpers';
import { useTranslation } from 'next-i18next';

interface IProps {
  data: CardLevel[];
}

// todo: wait for the backend to provide the necessary fields in the levels parameter
export const Levels = (props: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const { data } = props;

  const col3 = useMediaQuery({ query: '(max-width: 1100px)' });
  const col2 = useMediaQuery({ query: '(max-width: 850px)' });
  const col1 = useMediaQuery({ query: '(max-width: 600px)' });

  const columnsDonuts = setDonuts(data, { col3, col2, col1 });

  return (
    <WrapperContent>
      <Headline>{t('levels')}</Headline>

      <WrapperColumns>
        {columnsDonuts.map((columns: []) => (
          <Column key={Math.random()}>
            {columns.map((donut: any) => (
              <ScheduleDonut
                key={Math.random()}
                title={donut.trait_type}
                count={donut.value}
                maxCount={donut.max_count || 1}
              />
            ))}
          </Column>
        ))}
      </WrapperColumns>
    </WrapperContent>
  );
};
