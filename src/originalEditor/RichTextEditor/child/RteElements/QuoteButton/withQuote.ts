import { Editor, Element as SlateElement, Transforms, Path } from 'slate';

const withQuote = (editor: Editor) => {
  const { deleteForward, deleteBackward } = editor;

  editor.deleteBackward = unit => {
    if (editor.selection) {
      const nodes = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n),
      });

      const node = nodes.next().value;

      if (node) {
        const path = node[1];

        if (path[path.length - 1] > 0) {
          const previousPath = Path.previous(path);

          if (Editor.node(editor, previousPath)[0].type === 'block_quote') {
            Transforms.deselect(editor);
            return Transforms.setNodes(editor, { type: 'paragraph' }, { at: previousPath });
          }
        }
      }
    }

    return deleteBackward(unit);
  };

  editor.deleteForward = unit => {
    if (editor.selection) {
      const nodes = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n),
      });

      const node = nodes.next().value;

      if (node) {
        const path = node[1];
        const nextPath = Path.next(path);

        if (Editor.node(editor, nextPath)[0].type === 'block_quote') {
          Transforms.deselect(editor);
          return Transforms.setNodes(editor, { type: 'paragraph' }, { at: nextPath });
        }
      }
    }

    return deleteForward(unit);
  };

  return editor;
};

export default withQuote;
