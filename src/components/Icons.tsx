import { createIcon } from '@chakra-ui/react';

import DonaboonRectangularIconSvg from '../assets/svg/donaboon-rectangular-logo.svg?react';
import StripeWordmarkWhiteIconSvg from '../assets/svg/stripe-wordmark-white.svg?react';

export const DonaboonRectangularLogoIcon = createIcon({
  displayName: 'DonaboonIcon',
  path: <DonaboonRectangularIconSvg />,
  viewBox: '0 0 748 205',
  defaultProps: {
    color: 'colorPalette.600',
  },
});

export const StripeWordmarkWhiteIcon = createIcon({
  displayName: 'Stripe Wordmark Slate',
  path: <StripeWordmarkWhiteIconSvg />,
  viewBox: '0 0 360 151',
});
