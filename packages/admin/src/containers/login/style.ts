import styled from 'styled-components';

import bg from './bg.jpg';

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg.src});
  background-size: cover;
`;

export const LoginInner = styled.div`
  width: 500px;
  color: #fff;
`;
