import { Editor } from 'slate';

const withTables = (editor: Editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const nodes = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          n.type === 'table',
        }
      );
      const table = !!nodes.next().value;

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

export default withTables;
