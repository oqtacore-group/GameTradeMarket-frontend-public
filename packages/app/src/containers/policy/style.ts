import styled from 'styled-components';
import { FONTS } from '@game-trade/ui';

export const Wrapper = styled.div`
  margin: 0 20px 58px 20px;
`;

export const Content = styled.div`
  max-width: 1064px;
  margin: 0 auto 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 47px;
  margin-top: 60px;
  margin-bottom: 22px;
`;

export const RevisedBlock = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const RevisedRow = styled.div`
  ${FONTS.baiJamjuree};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 180%;
`;

export const List = styled.div`
  padding-left: 30px;
`;

export const Item = styled.div`
  display: flex;
  margin-bottom: 40px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const ItemNumber = styled.div`
  height: 100%;
  margin-right: 6px;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  color: #379fff;
`;

export const ItemSpanLabel = styled.span`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  color: #ff41b3;
  margin-right: 4px;
`;

export const ItemDivLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  color: #ff41b3;
`;

export const ItemText = styled.div`
  ${FONTS.baiJamjuree};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 29px;
`;

export const ItemLink = styled.a`
  text-decoration: none;
  color: #379fff;
  ${FONTS.baiJamjuree};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 29px;
`;

export const SubItem = styled.div`
  display: flex;
  margin-left: 60px;
  margin-top: 20px;
`;

export const SubNumber = styled(ItemNumber)`
  color: inherit;
  font-size: 16px;
`;

export const SubDivLabel = styled(ItemDivLabel)`
  color: inherit;
  font-size: 16px;
`;

export const SubSpanLabel = styled(ItemSpanLabel)`
  color: inherit;
  font-size: 16px;
`;

export const SubText = styled(ItemText)``;

export const Separate = styled.div`
  height: 10px;
  width: 100%;
`;
