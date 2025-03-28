import styled from 'styled-components';
import { COLORS, smallfontSize } from '@game-trade/ui/src';
import { shadowBorderEdgeGradient, shadowTextStroke } from '@game-trade/ui/src/styles/mixins';

export const BorderCutEdgeBlack = styled.div`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 0.1)),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.black} calc(25%)
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const ModalContent = styled.div`
  padding: 32px;
  position: relative;
  ${shadowBorderEdgeGradient()};
  align-items: center;
  text-align: center;
  font-size: 20px;
  justify-content: center;
`;

export const FormSubscribe = styled.form`
  width: 100%;
  margin-top: 2rem;
`;
export const Title = styled.h3`
  position: relative;
  font-size: 3.6rem;
  ${shadowTextStroke()};
  text-align: center;

  span {
    position: relative;
    z-index: 2;
    display: block;
  }

  &:after {
    width: 100%;
  }
`;

export const CardWriteToUs = styled(BorderCutEdgeBlack)`
  padding: 6rem 5rem;
  margin-top: 6rem;

  p {
    font-size: ${smallfontSize};
    text-align: center;
  }
`;
export const Block = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
`;

export const Row = styled.div<{ direction?: string; justifyContent?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
`;

export const Text = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`;

export const Errors = styled.div`
  display: block;
  margin-top: 5px;
  margin-bottom: 3rem;
  position: absolute;

  p {
    color: ${COLORS.pink};
    font-size: 16px;
    margin: 0;
    text-align: left;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid #a073a7;
  box-sizing: border-box;
  color: white;
  position: relative;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  line-height: 20px;
  font-size: 16px;

  padding: 1.3rem 2.2rem;

  &::placeholder {
    color: #a073a7;
  }

  &:focus {
    color: white;
    border: 1px solid #ff41b3;
    outline: initial;
  }
`;
