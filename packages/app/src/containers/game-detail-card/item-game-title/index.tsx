import { TitleGameName, TitleGameItemWrapper, TitleGameVerification } from './style';
import { SvgVerification } from '@game-trade/icons';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameName?: string;
  verify?: boolean | null;
}

export const TitleGameItem = (props: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation' });
  return (
    <TitleGameItemWrapper>
      <TitleGameName>{props.gameName}</TitleGameName>
      {props.verify && (
        <TitleGameVerification>
          <SvgVerification />
          {t('admitted')}
        </TitleGameVerification>
      )}
    </TitleGameItemWrapper>
  );
};
