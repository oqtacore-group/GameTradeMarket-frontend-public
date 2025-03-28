import styled, { css } from 'styled-components';
import { StyledButton, ButtonContent } from '@game-trade/ui/forms/button/style';
import { COLORS } from '@game-trade/ui';
import { Textarea } from '@/containers/developers/write-to-us/style';

export const MessageWrapper = styled.div<{ error: boolean }>`
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  flex-direction: row;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ error }) => (error ? COLORS.pink : COLORS.grayPurple)};
    display: block;
    position: absolute;
    bottom: -5px;
  }

  ${Textarea} {
    width: 100%;
    border: initial;
    background: initial;
    padding-left: 0;
    margin-right: 10px;
  }

  ${StyledButton} {
    width: 100px;

    & > ${ButtonContent} {
      margin: 0 !important;
    }
  }
`;

export const ButtonMobile = styled.button`
  color: ${COLORS.blue};
`;

export const FormReview = styled.form`
  display: flex;
  flex-direction: column;
`;

export const HeadlineRate = styled.div`
  font-size: 16px;
  padding: 16px 0 10px;
`;

export const HeadlineMessageSent = styled.div`
  font-size: 24px;
  margin: 20px 0 35px;
  display: flex;

  button {
    width: 200px;
    margin-left: 20px;
  }
`;

export const PillsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const PillsRate = styled.div<{ error: boolean; selected: boolean }>`
  padding: 3px 10px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${({ selected }) => (selected ? COLORS.pink : COLORS.grayPurple)};

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${COLORS.pink};
    `};

  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
`;

export const ErrorRate = styled.div`
  font-size: 16px;
  color: ${COLORS.pink};
`;

export const ErrorMessage = styled.div`
  font-size: 16px;
  color: ${COLORS.pink};
  margin-top: 10px;
`;
