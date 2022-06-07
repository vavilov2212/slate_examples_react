import * as React from 'react';
import Icon, { IGlyph, IIconExternalProps } from '../../Icon';
import IconArrowBottom from './arrow-bottom.svg';
import IconArrowTop from './arrow-top.svg';

interface IIconArrowProps extends IIconExternalProps {
  glyph?: IGlyph;
  direction: 'top' | 'bottom';
}

export const IconArrow = (props: IIconArrowProps) => {
  const { direction, glyph, ...otherProps } = props;

  return (
    <Icon
      Image={
        glyph !== undefined
          ? glyph
          : direction === 'top'
            ? IconArrowTop
            : IconArrowBottom
      }
      hasState={true}
      {...otherProps}
    />
  );
};
