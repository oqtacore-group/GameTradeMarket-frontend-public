import styled from 'styled-components';

export const BackgroundBinaryStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 96vw;
  height: 90rem;
  z-index: -1;

  > span:first-child {
    display: block !important;
  }

  > span:nth-child(2) {
    display: none !important;
  }

  @media (max-width: 767px) {
    > span:first-child {
      display: none !important;
    }

    > span:nth-child(2) {
      display: block !important;
    }
  }
`;
