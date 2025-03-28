import styled from 'styled-components';

export const BackgroundSpaceStyle = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  height: 140rem;

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
