import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const SubscribeStyled = styled.div``;
export const Errors = styled.div`
  display: none;
  margin-top: 1rem;
  margin-bottom: 3rem;

  p {
    position: absolute;
    color: ${COLORS.pink};
    font-size: 12px;
  }
`;
export const SubscribeForm = styled.form`
  margin-top: 1rem;
  display: flex;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
