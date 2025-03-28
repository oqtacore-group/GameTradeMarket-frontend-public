import styled from 'styled-components';
import { COLORS } from '../../index';

export const Ul = styled.ul`
  margin: 42px 0 24px;

  & > li {
    margin-bottom: 15px;
  }

  & + h2 {
    margin-top: 40px;
  }

  & + h3 {
    margin-top: 40px;
  }
`;

export const H2 = styled.h2`
  & + h3 {
    margin-top: 20px;
  }

  & + h2 {
    margin-top: 20px;
  }

  & + h4 {
    margin-top: 20px;
  }
`;

export const Img = styled.img`
  margin: 30px 0;
  width: 100%;

  & + img {
    margin: 0;
  }
`;

export const Link = styled.a`
  color: ${COLORS.pink};
  text-decoration: underline;
  word-break: break-all;

  &:hover {
    color: ${COLORS.white};
  }
`;

export const Paragraph = styled.p`
  & + h2 {
    margin-top: 45px;
  }
`;
