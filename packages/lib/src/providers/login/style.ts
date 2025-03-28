import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { FONTS, COLORS, shadowBorderEdgeGradient, shadowTextStroke } from '@game-trade/ui';

export const ModalLoginContent = styled.div`
  padding: 67px 32px 47px;
  ${shadowBorderEdgeGradient()};
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ModalHeader = styled.div`
  margin-bottom: 22px;
`;

export const ReflectText = styled.div`
  ${FONTS.chakra};
  position: relative;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  display: inline-block;
  text-align: left;

  span {
    position: relative;
    z-index: 2;
    display: block;
  }

  ${shadowTextStroke()};
  @media only screen and (min-width: 768px) {
    font-size: 36px;
    line-height: 43.2px;
  }
`;

export const OR = styled.div`
  padding: 10px;
  text-align: center;
  ${FONTS.chakra}
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${COLORS.gray};
`;

export const TimeToShow = styled.div`
  padding: 10px;
  text-align: center;
  ${FONTS.chakra}
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${COLORS.pink};
`;

export const TextInfo = styled.div<{ isWarning?: boolean }>`
  ${FONTS.baiJamjuree}
  font-weight: 400;
  font-size: ${({ isWarning }) => (isWarning ? '14px' : '16px')};
  line-height: ${({ isWarning }) => (isWarning ? '17px' : '20px')};
  color: ${({ isWarning }) => (isWarning ? COLORS.gray : COLORS.white)};
  text-align: center;
`;

export const Row = styled.div<{ direction?: string; justifyContent?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  margin-bottom: 21px;

  a {
    color: ${COLORS.blue};
  }
`;

export const RowIcon = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px 0;
`;

export const ForGot = styled.div`
  ${FONTS.baiJamjuree};
  font-weight: 400;
  color: ${COLORS.blue};
  cursor: pointer;
`;

export const ButtonGoogleLogin = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 14px;
  background: #0f0912;
  border: 1px solid rgba(160, 115, 167, 0.3);
  cursor: pointer;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: default;
        background: ${rgba(COLORS.neutral90, 0.6)};
        pointer-events: none;
      `;
    }
  }};
`;
export const RegisterText = styled.span`
  ${FONTS.baiJamjuree};
  align-self: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.white};
`;

export const RegisterButton = styled.span`
  ${FONTS.chakra};
  align-self: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 20.8px;
  color: ${COLORS.blue};
  margin: 3px 5px 0;
  cursor: pointer;
`;
export const FormErrors = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${COLORS.pink};
`;

export const PromoCodeText = styled.div`
  text-align: left;
  margin-bottom: 5px;
`;
