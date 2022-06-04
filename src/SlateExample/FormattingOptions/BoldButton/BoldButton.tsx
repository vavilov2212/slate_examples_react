import React from 'react';
import cn from 'classnames';
import BoldIcon from './bold.svg';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { FormattingOption } from 'SlateExample';

import styles from './BoldButton.module.scss';

const BoldButton = (_props: any) => {
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
        toggleMark(editor, 'bold');
      }}>
        <BoldIcon
          className={cn(
            styles.linkButton,
            {
              [styles.active]: isMarkActive(editor, 'bold'),
              /* [styles.disabled]: isLinkInputFocused, */
            },
          )}
        />
      </div>
    </div>
  );
}

export default BoldButton;
