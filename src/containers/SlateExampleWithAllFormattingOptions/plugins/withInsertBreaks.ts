import { Transforms, Editor, Element as SlateElement } from 'slate';
import { isCode } from '../utils';

export default function withInsertBreaks(editor: Editor){
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    if (isCode(editor)) {
      return Transforms.insertText(editor, '\n');
    }

    insertBreak();
  };

  return editor;
};
