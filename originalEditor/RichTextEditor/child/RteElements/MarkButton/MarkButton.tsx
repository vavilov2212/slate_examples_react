import React from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import markIcons from '../../icons';
import { toggleMark, isMarkActive } from '../../helper';
import { Icon } from '../../../../../ui/elements/Icon';
import { IRteFormat } from '../../interfaces/general';

import style from './MarkButton.module.scss';

interface IRteMarkButtonProps {
  format: Partial<IRteFormat>;
  theme?: string;
}

const RteMarkButton = (props: IRteMarkButtonProps) => {
  const { format, theme } = props;

  const editor = useSlate();

  const MarkIcon = markIcons[format];

  console.log('format', format)
  console.log('markIcons', markIcons)
  console.log('MarkIcon', MarkIcon)
  if (!MarkIcon) return null;

  return (
    <div
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(format, editor);
      }}
    >
      <MarkIcon
        className={cn(style.markButton, {[style.active]: isMarkActive(editor, format) }, theme)}
      />
    </div>
  );

};

export default RteMarkButton;
