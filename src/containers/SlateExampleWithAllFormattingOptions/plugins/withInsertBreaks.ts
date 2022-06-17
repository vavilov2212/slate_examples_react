import { Transforms, Editor, Element as SlateElement } from 'slate';
import { paragraphBlock } from 'constants/slate/blocks';

export default function withInsertBreaks(editor: Editor){
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const [match] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        SlateElement.isElementType(n, 'code')
    });

    if (match) {
      return Transforms.insertNodes(editor, paragraphBlock, { mode: 'highest' });
    }

    insertBreak();
  };

  editor.insertSoftBreak = () => {
    Transforms.insertText(editor, '\n');
  };

  return editor;
};
