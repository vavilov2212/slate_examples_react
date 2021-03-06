import React from 'react';
import { paragraphBlock } from 'constants/slate/blocks';
import cn from 'classnames';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { FormattingOption } from 'SlateExample';

import styles from './CodeButton.module.scss';

interface CodeButtonProps {
  format: FormattingOption;
  icon: SVGElement;
}

const CodeButton = (props: CodeButtonProps) => {
  const { format, icon: Icon } = props;
  const editor = useSlate();

  const isCodeActive = (editor: Editor, format: FormattingOption) => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n['type'] === format,
    });

    return !!match
  }

  const toggleCode = (editor: Editor, format: FormattingOption) => {
    const isActive = isCodeActive(editor, format)

    if (format === 'code') {
      Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          SlateElement.isElementType(n, 'code'),
        split: true,
      });

      const attributes = isActive ? { type: 'paragraph' } : { type: format, lang: 'javascript' };
      Transforms.setNodes<SlateElement>(editor, attributes);

      if (!isActive) {
        Transforms.wrapNodes(editor, paragraphBlock);
      }
    }
  };

  return (
    <div className={styles.markButtonWrapper}>
      <Icon
        onMouseDown={(event) => {
          event.preventDefault();
          toggleCode(editor, format);
        }}
        className={cn(
          styles.markButton,
          {
            [styles.active]: isCodeActive(editor, format),
            /* [styles.disabled]: isLinkInputFocused, */
          },
        )}
      />
    </div>
  );
}

export default CodeButton;
