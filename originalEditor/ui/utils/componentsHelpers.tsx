import * as React from 'react';
import { IconAlert, IconSuccess } from '../elements/Icon';

export function getInfoVariantIcon(infoVariant: 'error' | 'success' | ''): JSX.Element {
  switch (infoVariant) {
    case 'error':
      return <IconAlert size="m" />;

    case 'success':
      return <IconSuccess size="m" />;

    default:
      return null;
  }
}
