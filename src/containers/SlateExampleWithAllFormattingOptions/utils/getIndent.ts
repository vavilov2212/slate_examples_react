import { Editor, Node } from 'slate';
import detectIndent from 'detect-indent';

const DEFAULT_INDENT = '  ';

const getIndent = (editor: Editor, defaultValue?: string) => {
  const [ node ] = Editor.node(editor, editor.selection, { depth: 2 });
  const location = Node.string(node);

  return detectIndent(location).indent || defaultValue || DEFAULT_INDENT;
};

export default getIndent;
