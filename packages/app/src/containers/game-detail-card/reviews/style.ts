import styled from 'styled-components';
import { shadowBorderEdgeGradient } from '@game-trade/ui/styles/mixins';
import { Button, COLORS } from '@game-trade/ui';
import { Review } from '@/containers/game-detail-card/reviews/item-review/style';

export const ReviewsContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const Headline = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;

  small {
    font-size: 17px;
    padding-left: 20px;
    color: ${COLORS.grayPurple};
  }
`;

export const WrapperReviews = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 30px;
  background-color: rgba(15, 9, 18, 0.6);

  ${Review}:first-child {
    margin-top: -20px;
    &:before {
      display: none;
    }
  }
`;

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
