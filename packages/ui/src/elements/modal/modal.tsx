import React, { useState, useEffect, useRef, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash/debounce';
import { SvgCloseOutline } from '@game-trade/icons';

import { COLORS } from '../../styles';

import { IPropsModal } from './interfaces';
import {
  ModalScrollWrapper,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
} from './style';
import { ClickAwayListener } from '@mui/material';

export function ModalComponent(props: IPropsModal) {
  const {
    title,
    onClose,
    children,
    isCloseOutside = true,
    hasHeader,
    hasCloseButton,
    isPadding,
    padding,
    isCenter,
    size,
    dataTestId,
    zIndex,
    isHideModalCss,
  } = props;
  const [isMounted, setMounted] = useState(false);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [modalWrapperHeight, setModalWrapperHeight] = useState<number>(0);
  const modalRef: RefObject<HTMLDivElement> = useRef(null);
  const modalWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const resizeModalHandler = debounce(setModalHeight, 10);
  const resizeObserverRef = useRef(
    new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        if (entry.target === modalRef.current) {
          resizeModalHandler(entry.contentRect.height);
        }
      }
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const modalElement: HTMLDivElement | null = modalRef.current;
    const modalWrapperElement: HTMLDivElement | null = modalWrapperRef.current;
    const resizeObserver = resizeObserverRef.current;

    if (modalElement && modalWrapperElement && resizeObserver) {
      const initModalHeight: number = modalElement.getBoundingClientRect().height;
      const initModalWrapperHeight: number = modalWrapperElement.getBoundingClientRect().height;

      setModalHeight(initModalHeight);
      setModalWrapperHeight(initModalWrapperHeight);
      resizeObserver.observe(modalElement);
    }
  }, []);

  const closeHandler = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    onClose && onClose(e);
  };

  // const handleOutside = isCloseOutside ? closeHandler : () => null;

  return (
    <ModalScrollWrapper
      ref={modalWrapperRef}
      isCenter={isCenter}
      modalHeight={modalHeight}
      isHideModalCss={isHideModalCss}
      modalWrapperHeight={modalWrapperHeight}
      zIndex={zIndex}
      data-test-id={dataTestId || ''}
      isMounted={isMounted}>
      <ClickAwayListener onClickAway={() => (isCloseOutside ? onClose() : null)}>
        <ModalWrapper ref={modalRef} className={props.className || ''} size={size}>
          {hasCloseButton && (
            <CloseButton onClick={closeHandler}>
              <SvgCloseOutline size={16} color={COLORS.blue} />
            </CloseButton>
          )}
          {hasHeader && (
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
          )}
          <ModalContent padding={padding} isPadding={isPadding}>
            {children}
          </ModalContent>
        </ModalWrapper>
      </ClickAwayListener>
    </ModalScrollWrapper>
  );
}
