'use client';

import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  // ..................................................
  // Variables

  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  // ..................................................
  // Render

  return (
    <Text textStyle='label' textAlign='center' color='colorPalette.100' mt='8'>
      {t('FOOTER_TEXT', { currentYear })}
    </Text>
  );
}
