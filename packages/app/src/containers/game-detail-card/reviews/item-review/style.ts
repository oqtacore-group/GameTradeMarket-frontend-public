import styled from 'styled-components';

export const Avatar = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: #379fff;
  border: 1px solid #fff;
  flex-shrink: 0;
  margin-right: 15px;
  object-fit: cover;
`;

export const AvatarAndMetadataWrapper = styled.div`
  display: flex;

  @media (max-width: 960px) {
    width: 100% !important;
  }
`;

export const Date = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Icons = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    margin-left: 28px;
  }

  @media (max-width: 900px) {
    svg {
      margin-left: 0;
      &:last-child {
        margin-left: 10px;
      }
    }
  }
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NameAndReviewsCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 47px;
  justify-content: space-between;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: #ff41b3;
    margin-bottom: 15px;

    @media (max-width: 960px) {
      margin-bottom: 10px !important;
      margin-top: 25px;
    }
  }

  @media (max-width: 960px) {
    textarea {
      margin: 20px 0;
    }
  }
`;

export const Review = styled.div`
  display: flex;
  position: relative;
  padding-top: 20px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }

  & + & {
    margin-top: 30px;
  }

  > *:nth-child(1) {
    width: 30%;
  }

  > *:nth-child(2) {
    width: calc(73% - 40px);

    @media (max-width: 960px) {
      width: 100%;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(242, 72, 184, 1) 0%, rgba(102, 139, 239, 1) 100%);
    background-color: #ff41b3;
  }
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #ff41b3;
  margin-right: 10px;
`;

export const DeleteMessage = styled.div`
  font-size: 24px;
  display: flex;
  position: relative;
  padding: 40px 0;
  justify-content: center;
  margin-top: 30px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(242, 72, 184, 1) 0%, rgba(102, 139, 239, 1) 100%);
    background-color: #ff41b3;
  }
`;

export const Buttons = styled.div`
  display: flex;

  button {
    width: 120px;
    margin-right: 20px;
  }
`;

export const Warning = styled.div`
  position: relative;

  ${Buttons} {
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export const Text = styled.div``;

export const ReviewsCount = styled.div``;

export const Content = styled.div``;
