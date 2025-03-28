import styled from 'styled-components';
import { Button as ParentButton } from '@game-trade/ui';
import { BlockPrice } from '@game-trade/ui/modifiers/get-price/style';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: 1px solid black;

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;

    & > div {
      width: 100%;
    }
  }
`;

export const Information = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  border-right: 1px solid black;
`;

export const LoaderWrapper = styled.div`
  position: relative;
  height: 100px;
`;

export const WrapperActions = styled.div`
  display: flex;
  min-height: 100px;
  flex-direction: column;
  padding: 20px 0 20px 77px;
  border-top: 1px solid black;
  background-color: rgb(24 15 29 / 20%);
  justify-content: center;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }

  div:first-child {
    margin-left: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;

    & > div {
      width: 100%;
      margin-bottom: 15px;
    }
  }

  ${BlockPrice} {
    margin-right: 20px;
  }
`;

export const Button = styled(ParentButton)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;

  &:hover {
    background-image: linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(
        to left top,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgb(249, 138, 205) calc(50% - 1px),
        rgb(249, 138, 205) calc(50% + 0.5px),
        rgb(249, 138, 205) calc(25% + 1px)
      ),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205));
    a {
      color: white;
      opacity: 0.5;
    }
  }
`;

/*
 * Likes
 * */

// interface ILikeProps {
//   isAuthenticated: boolean;
// }
// export const Like = styled.div<ILikeProps>`
//   position: absolute;
//   top: 25px;
//   right: 25px;
//   color: #ff41b3;
//   font-size: 18px;
//   ${(p) => p.isAuthenticated && 'cursor: pointer'};
//   display: flex;
//   align-items: center;
//   z-index: 100;
//
//   > :first-child {
//     margin-right: 10px;
//   }
// `;
