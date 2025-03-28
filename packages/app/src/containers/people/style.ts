import styled from 'styled-components';

export const UsersContainerWrapper = styled.div`
  display: flex;
`;

export const UsersContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const UsersContentStyled = styled.div`
  padding: 0 20px;
`;

export const DesktopTitleWrapper = styled.div`
  @media (max-width: 576px) {
    padding-left: 33px;
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const SearchUserWrapper = styled.div`
  height: 65px;
  position: relative;
  min-width: 400px;
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    min-width: 300px;
  }

  @media (max-width: 575px) {
    width: 100%;
    min-width: auto;
    margin-right: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    left: 0;
    top: 0;
    background: #150c19;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);

    @media (max-width: 575px) {
      right: 20px;
    }
  }
`;

export const SearchUserInput = styled.input`
  line-height: 65px;
  font-size: 16px;
  padding: 0 50px 0 33px;
  background-color: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  width: 100%;

  &::placeholder {
    color: #a073a7;
  }
`;
