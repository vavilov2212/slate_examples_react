import { Editor, Element as SlateElement } from 'slate';

const isCode = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      SlateElement.isElementType(n, 'code')
  });

  return match;
};

export default isCode;
