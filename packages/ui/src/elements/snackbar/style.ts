import { AddressWrapper } from '../../modifiers/get-address-slice/style';
import styled from 'styled-components';

// import { COLORS, FONTS } from '../palette';

export const Text = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-right: 25px;

  ${AddressWrapper} {
    display: inline-block;
  }
`;

export const SvgWrapper = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  cursor: pointer;
`;
