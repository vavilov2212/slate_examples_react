import React from 'react';
import cn from 'classnames';
import { Editor, Element as SlateElement, Transforms,  } from 'slate';
import { useSlate } from 'slate-react';

import { FormattingOption } from 'SlateExample';

import styles from './BlockButton.module.scss';

interface BlockButtonProps {
  format: FormattingOption;
  Icon: any;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const BlockButton = (props: BlockButtonProps) => {
  const { format, Icon } = props;
  const editor = useSlate();

  const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    )

    return !!match
  };

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  };

  return (
    <div className={styles.blockButtonWrapper}>
      <Icon
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        className={cn(
          styles.blockButton,
          {
            [styles.active]: isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')
            /* [styles.disabled]: isLinkInputFocused, */
          },
        )}
      />
    </div>
  );
}

export default BlockButton;
