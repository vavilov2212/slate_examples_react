import React, { useState, useMemo  } from 'react';
import { EditorContainer, EditorEditable, EditorToolbar } from './RichTextEditor';
import { withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { Editor, Element as SlateElement, createEditor } from 'slate';

import styles from './ExampleRichTextEditor.module.scss';

interface ExampleRichTextEditorProps {
}

function ExampleRichTextEditor(_props: ExampleRichTextEditorProps){

  const [articleContent, setArticleContent] = useState<any>([
    {
      type: 'paragraph',
      children: [ { text : '' } ]
    },
  ]);

  const editor: Editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), []);

  return(
    <div className={styles.pageContainer}>
      <EditorContainer
         editorInstance={editor as ReactEditor}
         onContentChange={setArticleContent}
         content={articleContent}
         wrapperClassName={styles.container}
       >
         <EditorToolbar />
         <EditorEditable
           wrapperClassName={styles.editable}
           inputClassName={styles.input}
         />
       </EditorContainer>

    </div>
  );
}

export default ExampleRichTextEditor

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) => {
    return ['link'].includes(element.type) || isInline(element)
  }

  return editor;
};

