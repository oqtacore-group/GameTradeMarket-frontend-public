import styled from 'styled-components';
import { shadowBorderEdgeGradient } from '@game-trade/ui/src/styles/mixins';
import { Button } from '@game-trade/ui';

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Headline = styled.div`
  padding: 20px 30px;
  width: 100%;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  background-color: #22172a;
  display: flex;
  justify-content: space-between;

  > *:nth-child(2) {
    text-transform: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const WrapperComments = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 30px;
  background-color: rgba(15, 9, 18, 0.6);
`;

export const PostCommentWrapper = styled.div`
  margin-bottom: 25px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(242, 72, 184, 1) 0%, rgba(102, 139, 239, 1) 100%);
    background-color: #ff41b3;
  }

  div {
    width: 100%;
  }

  input {
    background: transparent;
    border: 0;
    outline: 0;
    width: calc(100% - 60px);
    color: #fff;
  }

  button {
    width: 80px;

    span {
      margin: 0 !important;
    }
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 30px;
  }
`;

export const CommentsListWrapper = styled.div`
  max-height: 1000px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AvatarAndMetadataWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #379fff;
  border: 1px solid #fff;
  flex-shrink: 0;
  margin-right: 15px;
  object-fit: cover;
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 100%;
`;

export const NameAndDateWrapper = styled.div`
  display: flex;
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #ff41b3;
  margin-right: 10px;
`;

export const Date = styled.div`
  font-size: 14px;
  color: #a073a7;
`;

export const Nickname = styled.div``;

export const DeleteComment = styled.div`
  cursor: pointer;
`;

export const Text = styled.div``;

export const ModalContent = styled.div`
  padding: 25px;
  ${shadowBorderEdgeGradient()};
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ConfirmModalRowButtons = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px auto;
  justify-content: flex-end;
`;

export const ModalButton = styled(Button)`
  margin-right: 24px;
  position: relative;

  :last-child {
    margin-right: 0;
  }
`;
