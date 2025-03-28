import React from 'react';
import Image from 'next/image';
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
  ItemDate,
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
    label: 'label_1',
    date: 'date_1',
    list: [
      { text: 'content_1.text_1' },
      { text: 'content_1.text_2' },
      { text: 'content_1.text_3' },
      { text: 'content_1.text_4' },
      { text: 'content_1.text_5' },
    ],
  },
  {
    label: 'label_2',
    date: 'date_2',
    list: [
      { text: 'content_2.text_1' },
      { text: 'content_2.text_2' },
      { text: 'content_2.text_3' },
      { text: 'content_2.text_4' },
    ],
  },
  {
    label: 'label_3',
    date: 'date_3',
    list: [{ text: 'content_3.text_1' }, { text: 'content_3.text_2' }],
  },
];

export const ChangelogContainer = () => {
  const { t } = useTranslation('changelogPage', { keyPrefix: 'translation' });

  return (
    <>
      {/*<BreadCrumbs crumbs={targetBreadCrumbs} />*/}

      <Wrapper>
        <Header>{t('headline')}</Header>

        <List>
          {listData.map((item, itemIndex) => (
            <ListItem key={itemIndex}>
              <>
                <ItemPart>
                  <ItemLabel content={t(item?.label)}>{t(item?.label)}</ItemLabel>
                  <ItemDate content={t(item?.date)}>{t(item?.date)}</ItemDate>
                </ItemPart>

                <ItemDot isFirst={itemIndex === 5} />

                <ItemPart>
                  <ItemContent isFirst={itemIndex === 5}>
                    {/* {item.title && <ContentTitle>{item.title}</ContentTitle>} */}

                    <ContentFlex>
                      {item.list.map(({ text, colStart, rowStart, isDone }: any, index) => (
                        <ContentRow key={index}>{t(text)}</ContentRow>
                      ))}
                    </ContentFlex>
                  </ItemContent>
                </ItemPart>
              </>
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
