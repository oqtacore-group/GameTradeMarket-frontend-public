import styled, { css } from 'styled-components';
import { ImageShadow } from '@game-trade/ui/modifiers/get-image-optimization/style';

export const Block = styled.div`
  width: 50%;
  padding: 0;
  background-repeat: no-repeat;
  background-image: linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(
      to top left,
      rgb(24 15 29 / 20%) calc(50% - 1px),
      rgb(24 15 29 / 20%) calc(50% - 1px),
      black calc(50% - 1px),
      black calc(50% + 0.5px),
      #19101f calc(25% + 1px)
    ),
    linear-gradient(#19101f, #19101f), linear-gradient(#19101f, #19101f);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 5rem 5rem, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -5rem, 0% 0%, -5rem 100%, 100% 100%, -5rem 0%, 0% -5rem;
  z-index: 5;
  position: relative;
`;

export const Wrapper = () => css`
  position: relative;
  height: 100%;
  min-height: 530px;
  margin: 0 auto;

  & > ${ImageShadow} {
    filter: blur(25px);
    border-radius: 0 0 30% 0;
  }
`;
