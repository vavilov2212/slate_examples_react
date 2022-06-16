import { Editor, Element as SlateElement } from 'slate';

export default function withInlines(editor: Editor){
  const { isInline } = editor

  editor.isInline = (element: SlateElement) => {
    return ['link'].includes(element.type) || isInline(element)
  }

  return editor;
};
