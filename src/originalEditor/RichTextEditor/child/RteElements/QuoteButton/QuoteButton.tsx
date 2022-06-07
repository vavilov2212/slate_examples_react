import React from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Location, Path, Editor, Transforms, Element as SlateElement } from 'slate';
import markIcons from '../../icons';
import withQuote from './withQuote';

import style from './QuoteButton.module.scss';

interface IRteQuoteButtonProps {
  theme?: string;
}

const RteQuoteButton = (props: IRteQuoteButtonProps) => {
  const { theme } = props;

  const editor = withQuote(useSlate());

  const atRoot = (selection: Location) => {
    const path = selection && Editor.path(editor, selection);

    try {
      const parentPath = Path.parent(path);
      let parent: any = false;
      try {
        parent = selection && Editor.parent(editor, selection);
      } catch (e) {
        return true;
      }

      if (parent && parent[0].type.indexOf('heading') !== -1 && Editor.hasBlocks(editor, parent[0])) {
        return true;
      } else {
        return !(parentPath.length > 0);
      }
    } catch (e) {
      return true;
    }
  };

  const unwrapBlock = () => {
      const { selection } = editor;
      if (selection) {
        Transforms.deselect(editor);
        Transforms.setNodes(editor, { type: 'paragraph' }, { at: selection,
          match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'block_quote',
      });
    }
  };

  const toggleBlock = () => {
    if (!isBlockActive()) {
      const block: any = { type: 'block_quote' };
      const { selection } = editor;

      if (selection) {
        if (atRoot) {
          try {
            const path = selection && Editor.path(editor, selection);
            const parentPath = path && Path.parent(path);
            const parent = Editor.node(editor, parentPath);

            if ((parent[0].type as string[]).indexOf('heading') === -1) {
              Transforms.deselect(editor);
              Transforms.setNodes(editor, block, { at: parentPath });
            }
          } catch (e) {
            console.warn('At root.');
          }
        }
      }
    } else {
      unwrapBlock();
    }
  };

  const isBlockActive = (): boolean => {
    const nodes = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'block_quote',
    });

    return !!nodes.next().value;
  };

  const QuoteIcon = markIcons.block_quote;

  return (
    <div
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock();
      }}
    >
      <QuoteIcon
        className={cn(style.blockButton, {[style.active]: isBlockActive() }, theme)}
      />
    </div>
  );
};

export default RteQuoteButton;
