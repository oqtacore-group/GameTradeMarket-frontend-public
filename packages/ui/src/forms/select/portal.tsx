import { Component } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: any;
  cssClass?: string;
}

export default class Portal extends Component<IProps> {
  element: HTMLDivElement | null;

  constructor(props: IProps) {
    super(props);
    this.element = null;
  }

  componentDidMount() {
    this.element = document && document?.createElement('div');
    this.element?.classList.add('portal-component-wrapper');
    document && document?.body.append(this.element);
  }

  componentWillUnmount(): void {
    this.element?.remove();
  }

  render() {
    return this.element && createPortal(this.props.children, this.element);
  }
}
