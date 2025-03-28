import React, { useState, useEffect, useCallback } from 'react';
import { SvgChevronRight } from '@game-trade/icons';
import { Loader, SIZE, ALIGN } from '../../../index';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { IProps } from './interface';
import {
  PaginationBlock,
  ArrowLeftWrap,
  ArrowRightWrap,
  PageNumber,
  PagesBlock,
  PagesList,
  Button,
} from './style';

const initialList = [1, 2, 3, 4, 5, 6, 7];

export const PaginationNew = ({
  offsetStep,
  total,
  onPageChange,
  buttonTitle,
  page,
  onClickButton,
  showButton,
  isHideArrow,
  isLoading,
  buttonMoreRender,
}: IProps) => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation' });

  const [maxPage, setMaxPage] = useState<number>(total ? total / offsetStep : 0);
  const [paginationList, setPaginationList] = useState<number[]>(initialList);

  useEffect(() => {
    const pagesCount = Math.ceil(total / offsetStep);
    setMaxPage(pagesCount);
  }, [total, offsetStep]);

  useEffect(() => {
    let correctedArr = initialList;

    // if there are more than 7 pages, we need an ellipsis
    if (maxPage > 7) {
      // if a page up to 5 is selected, we collect the pagination array 1,2,3,4,5,6,last page;
      if (page <= 4) {
        correctedArr = correctedArr.map((item: number) => {
          return item === 7 ? maxPage : item;
        });
      } else {
        // if a page close to the end is selected, we collect the array first page, max - 5, max -4, max - 3, max - 2, max - 1, max page;
        if (page + 5 > maxPage) {
          let correctNextStep = 7;
          correctedArr = correctedArr.map((item: number) => {
            --correctNextStep;
            if (correctNextStep > 0) {
              return item === 1 ? item : maxPage - correctNextStep;
            }
            return maxPage;
          });
        }

        // if a page somewhere in the middle is selected, we collect the array first page, page - 2, page - 1, page, page + 1, page + 2, max page;
        if (page >= 5 && page <= maxPage - 5) {
          let correctNextStep = -3;
          correctedArr = correctedArr.map((item: number) => {
            if (item === 1) {
              return item;
            }
            if (item === 7) {
              return maxPage;
            }
            if (correctNextStep < 2) {
              ++correctNextStep;
              return page + correctNextStep;
            }
            return item;
          });
        }
      }
      setPaginationList(correctedArr);
    } else {
      setPaginationList(correctedArr.filter((item: number) => item <= maxPage));
    }
  }, [page, maxPage]);

  const onClickPage = useCallback(
    (page: number) => () => {
      onPageChange(page);
    },
    [onPageChange]
  );

  const onClickLeftArrow = useCallback(() => {
    const nextPage = page - 1 > 0 ? page - 1 : 1;
    if (page !== 1 && maxPage !== 0) {
      onPageChange(nextPage);
    }
  }, [page]);

  const onClickRightArrow = useCallback(() => {
    const nextPage = page + 1 > maxPage ? maxPage : page + 1;
    if (page !== maxPage && maxPage !== 0) {
      onPageChange(nextPage);
    }
  }, [page, maxPage]);

  return (
    <PaginationBlock showButton={showButton} isHide={maxPage <= 1}>
      <div
        style={{
          opacity: maxPage <= 1 ? 0 : 1,
          pointerEvents: maxPage <= 1 ? 'none' : 'all',
        }}>
        {maxPage !== page && showButton ? (
          <>
            {buttonMoreRender ? (
              buttonMoreRender()
            ) : (
              <Button onClick={onClickButton}>
                {isLoading ? (
                  <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
                ) : (
                  buttonTitle || t('showMore', { ns: 'elements' })
                )}
              </Button>
            )}
          </>
        ) : (
          ''
        )}
      </div>

      <PagesBlock isLoading={isLoading} showButton={showButton}>
        {!isHideArrow && maxPage > 1 && (
          <ArrowLeftWrap>
            <SvgChevronRight onClick={onClickLeftArrow} size={14} />
          </ArrowLeftWrap>
        )}

        <PagesList>
          {maxPage > 1 &&
            paginationList.map((item: number, index, arr) => (
              <PageNumber onClick={onClickPage(item)} isSelected={item === page} key={item}>
                {/* if the bordering pagination elements differ by more than 1 and it's not the first or last element, then it's an ellipsis ... */}
                {(item - arr[index - 1] > 1 && index !== arr.length - 1) ||
                (item - arr[index + 1] < -1 && index !== 0)
                  ? '...'
                  : item}
              </PageNumber>
            ))}
        </PagesList>

        {!isHideArrow && maxPage > 1 && (
          <ArrowRightWrap>
            <SvgChevronRight onClick={onClickRightArrow} size={14} />
          </ArrowRightWrap>
        )}
      </PagesBlock>
    </PaginationBlock>
  );
};
