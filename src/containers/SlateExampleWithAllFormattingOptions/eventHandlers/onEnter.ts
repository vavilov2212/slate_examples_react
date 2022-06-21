import { Transforms, Editor } from 'slate';
import { getIndent, isCode } from '../utils';
import { paragraphBlock } from 'constants/slate/blocks';

export const onEnter = (editor: Editor, e: React.KeyboardEvent,) => {
  if (isCode(editor)) {
    if (e.metaKey) {
      Transforms.move(editor, { distance: 1, edge: 'end' });
      Transforms.deselect(editor);

      return Transforms.insertNodes(editor, paragraphBlock);
    }

    if (e.shiftKey) {
      e.preventDefault();
      const { selection } = editor;
      const indent = getIndent(editor, '');

      return Transforms.insertText(editor, `\n${indent}`, { at: Editor.end(editor, selection) });
    }
  }
};

export default onEnter;
