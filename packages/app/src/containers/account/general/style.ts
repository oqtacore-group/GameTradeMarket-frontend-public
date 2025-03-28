import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS } from '@game-trade/ui';

export const GeneralForm = styled.form`
  max-width: 800px;
`;

export const FormBlock = styled.div`
  margin-bottom: 20px;
  flex-basis: 100%;
  ${FONTS.chakra};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  :last-child {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

export const FormBlockTitle = styled.label`
  display: inline-block;
  margin-bottom: 10px;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: ${COLORS.pink};
`;

export const FormBlockContent = styled.div``;

export const RichEditorWrapper = styled.div`
  color: black;
`;

export const Row = styled.div<{ direction?: string; justifyContent?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  width: 100%;

  a {
    color: ${COLORS.blue};
  }
`;
export const CustomUrl = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  ${FONTS.chakra};
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.blue};
`;

export const AddLinks = styled.div`
  display: flex;
  align-items: center;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.pink};
  cursor: pointer;
  margin-top: 20px;
`;

export const RemoveLinks = styled.span`
  align-items: center;
  display: inline-block;
  margin-right: 17px;
  margin-left: -5px;
`;

export const Select = styled.select`
  margin-right: 13px;
  width: 164px;
  height: 42px;
  padding: 10px;
  background-color: ${rgba('#0f0912', 0.2)};
  border: 1px solid ${COLORS.black90};
  color: ${COLORS.white};

  :hover,
  :focus,
  :focus-visible,
  :active {
    background-color: ${rgba('#0f0912', 0.2)};
    border: 1px solid ${COLORS.black90};
    color: ${COLORS.white};
    outline: none;
  }
`;

export const UserImageContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const UserImage = styled.div<{ isUpdatingLoader?: boolean }>`
  border-radius: 50%;
  width: 122px;
  height: 122px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${COLORS.pink};

  svg {
    width: 122px;
    height: 122px;
  }

  ${({ isUpdatingLoader }) =>
    isUpdatingLoader &&
    css`
      :after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${COLORS.black90};
        opacity: 0.3;
      }
    `}
`;

export const UploadImage = styled.div`
  width: 122px;
  height: 122px;
  margin-right: 37px;
  margin-top: 4px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-right: 0;
    width: 100%;
    align-items: end;
    ${UserImage} {
      margin-right: 20px;
    }
  }
`;

export const Upload = styled.label`
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
  color: ${COLORS.pink};
  cursor: pointer;
  display: block;
`;

export const Plus = styled.span`
  display: flex;
  align-items: center;
  margin-right: 18px;
  ${FONTS.chakra};
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: ${COLORS.blue};
`;
export const LinkBlock = styled.div`
  display: flex;
  align-items: center;
  ${FONTS.baiJamjuree};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.blue};
  flex-basis: 100%;
  margin-bottom: 10px;
`;
export const SocialTitle = styled.div`
  display: inline-block;
  width: 130px;
  margin-right: 10px;
  color: ${COLORS.white};
`;
export const SocialValue = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  flex: 1 1 0;
`;

export const FormErrors = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  align-self: center;
  color: ${COLORS.red60};
`;
