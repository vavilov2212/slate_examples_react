import React from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import markIcons from '../../icons';
import { IRteFormat } from '../../interfaces/general';

import style from './BlockButton.module.scss';

const LIST_TYPES = ['list_numbered', 'list_bulleted'];

interface IRteBlockButtonProps {
  format: IRteFormat;
  theme?: string;
}

const RteBlockButton = (props: IRteBlockButtonProps) => {
  const { format, theme } = props;

  const editor = useSlate();

  /** Unwrap selected node of existing block type. */
  const unwrapBlock = () => {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.indexOf(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type as string
        ) !== -1,
      split: true,
    });
  };

  const toggleBlock = (bFormat: IRteFormat) => {
    const isActive = isBlockActive(bFormat);
    const isListNumbered = bFormat === 'list_numbered' && LIST_TYPES.indexOf(bFormat) !== -1;
    const isListBulleted = bFormat === 'list_bulleted' && LIST_TYPES.indexOf(bFormat) !== -1;

    let bType: string;

    unwrapBlock();

    if (isListNumbered) {
      bType = 'list_item_numbered';
    } else if (isListBulleted) {
      bType = 'list_item_bulleted';
    } else {
      bType = bFormat;
    }

    const elementFormatProps: Partial<SlateElement> = {
      type: isActive ? 'paragraph' : bType,
    };

    Transforms.setNodes(editor, elementFormatProps);

    if (!isActive) {
      unwrapBlock();
      const block: any = { type: bFormat, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (bFormat: IRteFormat): boolean => {
    const nodes = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === bFormat,
    });

    return !!nodes.next().value;
  };

  const BlockIcon = markIcons[format];

  if (!BlockIcon) return null;

  return (
    <div
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(format);
      }}
    >
      <BlockIcon
        className={cn(style.blockButton, {[style.active]: isBlockActive(format) }, theme)}
      />
    </div>
  );
};

export default RteBlockButton;
