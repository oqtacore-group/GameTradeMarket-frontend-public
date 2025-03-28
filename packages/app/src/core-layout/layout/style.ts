import styled from 'styled-components';

export const ImpersonationModeNotification = styled.div`
  text-align: center;
  background-color: red;
`;

export const WrapperBottomBlocks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
  pointer-events: none;
`;
