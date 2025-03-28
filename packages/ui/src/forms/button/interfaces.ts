import type { ButtonHTMLAttributes } from 'react';

import type { Appearance, Dimension } from './utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** External appearance of the button */
  appearance?: Appearance;
  isShadow?: boolean;
  isLoader?: boolean;
  isGradientText?: boolean;

  /** Button size */
  dimension?: Dimension;

  /** Remaining active to be clicked, the button is displayed in a blocked style */
  displayAsDisabled?: boolean;

  /** Display the button as a square */
  displayAsSquare?: boolean;

  /** Display the icon */
  icon?: React.Component;

  /** id of the component */
  idGoogleTM?: string;
}
