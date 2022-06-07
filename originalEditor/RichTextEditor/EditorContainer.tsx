import React from 'react';
import cn from 'classnames';
import { Descendant, Node } from 'slate';
import { Slate, ReactEditor } from 'slate-react';

import style from './EditorStyle.module.scss';

interface IEditorContainerProps {
  editorInstance: ReactEditor;
  children: React.ReactNode;
  /**
   * Maximum characters. Only characters are counted, not the internal structure.
   * If set - indicator will be shown in the bottom-right corner of the Editor.
   */
  maxLength?: number;

  /** Function to handle onChange event. */
  onContentChange: (content: Descendant[]) => void;

  /** Array of children containing structure of the data beeing edited. */
  content: Descendant[];

  wrapperClassName?: string;
}

/**
 * Wrapper to pass editors context to children.
 *
 * This is needed because instance of the editor is mutable - that means,
 * that when the onChange event fires - editors context is modified. Hense we need to pass it to children.
 * Instanse of the Slate editor only initialized once in this component.
 */
const EditorContainer = (props: IEditorContainerProps) => {
  const { children, editorInstance, onContentChange, content, maxLength, wrapperClassName } = props;

  return (
    <div className={cn(style.rteWrapper, wrapperClassName)}>
      <Slate
        editor={withInputConstraint(editorInstance, maxLength)}
        onChange={onContentChange}
        value={content}
      >
        {children}
      </Slate>
    </div>
  );
};

export default EditorContainer;

const withInputConstraint = (editor: ReactEditor, maxContentLength: number) => {
  if (maxContentLength) {
    const { insertFragment, insertText } = editor;

    editor.insertFragment = (fragment: Node[]) => {
      const combinedLength = Node.string({children: fragment}).length + Node.string(editor).length;

      if (combinedLength < maxContentLength) {
        insertFragment(fragment);
      }
    };

    editor.insertText = (text: string) => {
      if (Node.string(editor).length < maxContentLength) {
        insertText(text);
      }
    };
  }

  return editor;
};
