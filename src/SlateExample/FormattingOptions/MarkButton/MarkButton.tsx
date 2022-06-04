import React from 'react';
import cn from 'classnames';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { FormattingOption } from 'SlateExample';

import styles from './MarkButton.module.scss';

interface MarkButtonProps {
  format: FormattingOption;
  icon: SVGElement;
}

const MarkButton = (props: MarkButtonProps) => {
  const { format, icon: Icon } = props;
  const editor = useSlate();

  const isMarkActive = (editor: Editor, format: FormattingOption) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const toggleMark = (editor: Editor, format: FormattingOption) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  return (
    <div className={styles.linkButtonWrapper}>
      <div onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
        <Icon
          className={cn(
            styles.linkButton,
            {
              [styles.active]: isMarkActive(editor, format),
              /* [styles.disabled]: isLinkInputFocused, */
            },
          )}
        />
      </div>
    </div>
  );
}

export default MarkButton;
