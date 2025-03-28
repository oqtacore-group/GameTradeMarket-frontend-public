import React from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import BgRoadmap from '@root/public/imgs/roadmap/bg_roadmap.webp';

import {
  Wrapper,
  Header,
  List,
  BackgroundWrap,
  ListItem,
  ItemLabel,
  ItemContent,
  ItemDot,
  ItemPart,
  // ContentTitle,
  ContentRow,
  ContentFlex,
} from './style';
import { useTranslation } from 'next-i18next';

// import { BreadCrumbs, ICrumb } from '@game-trade/ui';

// const targetBreadCrumbs: ICrumb[] = [
//   {
//     label: 'Marketplace',
//     href: '/marketplace',
//   },
//   {
//     label: 'Roadmap',
//     href: '/roadmap',
//   },
// ];

const listData = [
  {
    label: 'calendarQ3_2021',
    list: [
      { text: 'contentQ3_2021.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ3_2021.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ3_2021.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ3_2021.part_4', isDone: true, colStart: 1 },
      { text: 'contentQ3_2021.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ3_2021.part_6', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ4_2021',
    list: [
      { text: 'contentQ4_2021.part_1', isDone: true, colStart: 1 },
      {
        text: 'contentQ4_2021.part_2',
        isDone: true,
        colStart: 1,
      },
      { text: 'contentQ4_2021.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_4', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_6', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_7', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_8', isDone: true, colStart: 1 },
      { text: 'contentQ4_2021.part_9', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ1_2022',
    list: [
      { text: 'contentQ1_2022.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_4', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_6', isDone: true, colStart: 1 },
      { text: 'contentQ1_2022.part_7', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ2_2022',
    list: [
      { text: 'contentQ2_2022.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_4', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_6', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_7', isDone: true, colStart: 1 },
      { text: 'contentQ2_2022.part_8', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ3_2022',
    list: [
      { text: 'contentQ3_2022.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_4', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_6', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_7', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_8', isDone: true, colStart: 1 },
      { text: 'contentQ3_2022.part_9', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ4_2022',
    list: [
      { text: 'contentQ4_2022.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_5', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_6', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_9', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_10', isDone: true, colStart: 1 },
      { text: 'contentQ4_2022.part_11', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ1_2023',
    list: [
      { text: 'contentQ1_2023.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ1_2023.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ1_2023.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ1_2023.part_4', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ2_2023',
    list: [
      { text: 'contentQ2_2023.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ2_2023.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ2_2023.part_3', isDone: true, colStart: 1 },
      { text: 'contentQ2_2023.part_4', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ3_2023',
    list: [
      { text: 'contentQ3_2023.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ3_2023.part_2', isDone: true, colStart: 1 },
      { text: 'contentQ3_2023.part_3', isDone: true, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ4_2023',
    list: [
      { text: 'contentQ4_2023.part_1', isDone: true, colStart: 1 },
      { text: 'contentQ4_2023.part_2', isDone: false, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ1_2024',
    list: [
      { text: 'contentQ1_2024.part_1', isDone: false, colStart: 1 },
      { text: 'contentQ1_2024.part_2', isDone: false, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ2_2024',
    list: [
      { text: 'contentQ2_2024.part_1', isDone: false, colStart: 1 },
      { text: 'contentQ2_2024.part_2', isDone: false, colStart: 1 },
      { text: 'contentQ2_2024.part_3', isDone: false, colStart: 1 },
      { text: 'contentQ2_2024.part_4', isDone: false, colStart: 1 },
    ],
  },
  {
    label: 'calendarQ3_2024',
    list: [
      { text: 'contentQ3_2024.part_1', isDone: false, colStart: 1 },
      { text: 'contentQ3_2024.part_2', isDone: false, colStart: 1 },
    ],
  },
  {
    label: 'calendarLater',
    list: [
      { text: 'contentLater.part_1', isDone: false, colStart: 1 },
      { text: 'contentLater.part_2', isDone: false, colStart: 1 },
      { text: 'contentLater.part_3', isDone: false, colStart: 1 },
      { text: 'contentLater.part_4', isDone: false, colStart: 1 },
      { text: 'contentLater.part_5', isDone: false, colStart: 1 },
      { text: 'contentLater.part_6', isDone: false, colStart: 1 },
    ],
  },
];

export const RoadmapContainer = () => {
  const isSlim = useMediaQuery('(max-width:768px)');
  const { t } = useTranslation('roadmapPage', { keyPrefix: 'translation' });

  return (
    <>
      {/*<BreadCrumbs crumbs={targetBreadCrumbs} />*/}

      <Wrapper>
        <Header>{t('title')}</Header>

        <List>
          {listData.map((item, itemIndex) => (
            <ListItem key={itemIndex}>
              {itemIndex % 2 && !isSlim ? (
                <>
                  <ItemPart>
                    <ItemContent isFirst={itemIndex === 9} isLeft={true}>
                      {/* {item.title && <ContentTitle>{item.title}</ContentTitle>} */}

                      <ContentFlex>
                        {item.list.map(({ text, colStart, rowStart, isDone }: any, index) => (
                          <ContentRow
                            colStart={colStart}
                            rowStart={rowStart}
                            key={index}
                            isDone={isDone}>
                            {t(text)}
                          </ContentRow>
                        ))}
                      </ContentFlex>
                    </ItemContent>
                  </ItemPart>

                  <ItemDot isFirst={itemIndex === 9} />

                  <ItemPart>
                    <ItemLabel content={t(item?.label)}>{t(item?.label)}</ItemLabel>
                  </ItemPart>
                </>
              ) : (
                <>
                  <ItemPart>
                    <ItemLabel content={t(item?.label)}>{t(item?.label)}</ItemLabel>
                  </ItemPart>

                  <ItemDot isFirst={itemIndex === 9} />

                  <ItemPart>
                    <ItemContent isFirst={itemIndex === 9}>
                      {/* {item.title && <ContentTitle>{item.title}</ContentTitle>} */}

                      <ContentFlex>
                        {item.list.map(({ text, colStart, rowStart, isDone }: any, index) => (
                          <ContentRow
                            colStart={colStart}
                            rowStart={rowStart}
                            key={index}
                            isDone={isDone}>
                            {t(text)}
                          </ContentRow>
                        ))}
                      </ContentFlex>
                    </ItemContent>
                  </ItemPart>
                </>
              )}
            </ListItem>
          ))}
        </List>

        <BackgroundWrap>
          <Image layout="fill" objectFit="cover" src={BgRoadmap} alt="background roadmap" />
        </BackgroundWrap>
      </Wrapper>
    </>
  );
};
