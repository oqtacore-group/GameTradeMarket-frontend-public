import styled from 'styled-components';

export const EmptyTokenImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  border-radius: inherit;
  filter: blur(30px);
`;

export const ImageWrapper = styled.div<{ styleWrapper: any }>`
  position: relative;
  overflow: hidden;
  ${({ styleWrapper }) => (styleWrapper ? styleWrapper : '')}
`;
