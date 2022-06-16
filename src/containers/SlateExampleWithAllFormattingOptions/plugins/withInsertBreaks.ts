import { Path, Transforms, Range, Editor, Element as SlateElement, Node } from 'slate';

export default function withInsertBreaks(editor: Editor){

  editor.insertBreak = () => {
    Transforms.insertNodes(
      editor,
      { type: 'paragraph', children: [ { text: ''} ] },
      {
        match: n =>
          !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            !Editor.isInline(editor, n) &&
            SlateElement.isElementType(n, 'paragraph')
      }
    );
  };

  editor.insertSoftBreak = () => {
    Transforms.insertText(editor, '\n');
  };

  return editor;
};

