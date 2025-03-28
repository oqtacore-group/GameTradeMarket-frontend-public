import React, { Component, GetDerivedStateFromProps } from 'react';
import { createPortal } from 'react-dom';

import { ModalComponent } from './modal';
import { IProps, IState } from './interfaces';

export class Modal extends Component<IProps, IState> {
  modalsWrapper: HTMLDivElement | undefined;
  element: HTMLDivElement | undefined;

  static defaultProps = {
    hasHeader: true,
    hasCloseButton: true,
    isCenter: true,
    isPadding: true,
    size: 640,
  };

  state = {
    padding: {
      top: 24,
      right: 32,
      bottom: 24,
      left: 32,
    },
  };

  constructor(props: IProps) {
    super(props);
    if (typeof document !== 'undefined') {
      this.modalsWrapper = document.querySelector('.modals-wrapper') as HTMLDivElement;

      if (!this.modalsWrapper) {
        this.modalsWrapper = document.createElement('div');
        this.modalsWrapper.classList.add('modals-wrapper');
        document.body.append(this.modalsWrapper);
      }

      this.element = document.createElement('div');
    }
  }

  // this type format is mandatory
  public static getDerivedStateFromProps: GetDerivedStateFromProps<IProps, IState> = (
    nextProps: IProps,
    prevState: IState
  ) => {
    if (nextProps && nextProps.padding) {
      return {
        ...nextProps,
        padding: {
          ...prevState.padding,
          ...nextProps.padding,
        },
      };
    }

    return nextProps;
  };

  componentDidMount(): void {
    this.modalsWrapper && this.modalsWrapper.append(this.element as HTMLDivElement);
    this.element && this.element.classList.add('modal-component-wrapper');

    document.body.classList.add('disable-scroll');
  }

  componentWillUnmount(): void {
    this.element && this.element.remove();
    if (this.modalsWrapper && !this.modalsWrapper.querySelector('.modal-component-wrapper')) {
      document.body.classList.remove('disable-scroll');
    }
  }

  render() {
    return typeof document !== 'undefined'
      ? createPortal(
          <ModalComponent {...this.props} {...this.state} />,
          this.element as HTMLDivElement
        )
      : null;
  }
}
