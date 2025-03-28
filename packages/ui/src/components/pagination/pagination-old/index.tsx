import ReactPaginate from 'react-paginate';
import React from 'react';
import * as Scroll from 'react-scroll';

import { PaginationStyles, ButtonWrapper, ButtonStyles } from './style';
import { IPaginationProps } from './interface';

export const Pagination = ({
  isHideMore,
  setItemOffset,
  setItemsPerPage,
  itemsPerPage,
  itemsLength,
  setForcePage,
  forcePage,
}: IPaginationProps) => {
  const scroll = Scroll.animateScroll;

  function showMore() {
    setItemsPerPage(itemsPerPage + 20);
  }

  function handlePageClick(event: any) {
    setForcePage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % (itemsLength || 0);
    setItemOffset(newOffset);
    scroll.scrollToTop({ duration: 400, delay: 0 });
  }

  return (
    <div className="row p-0">
      <ButtonWrapper isHideMore={Boolean(isHideMore)}>
        <ButtonStyles onClick={() => showMore()}>{isHideMore && 'Show More'}</ButtonStyles>
      </ButtonWrapper>
      <PaginationStyles className={!itemsLength ? 'd-none' : ''}>
        <ReactPaginate
          onPageChange={handlePageClick}
          previousLabel={itemsLength && <i className="arrow arrow-left" />}
          nextLabel={itemsLength && <i className="arrow arrow-right" />}
          pageRangeDisplayed={2}
          className="justify-content-evenly w-100 align-items-center"
          activeClassName={'selected'}
          breakLabel="..."
          forcePage={forcePage}
          marginPagesDisplayed={1}
          pageCount={itemsLength ? itemsLength / itemsPerPage : 0}
        />
      </PaginationStyles>
    </div>
  );
};
