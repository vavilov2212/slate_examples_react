import React, { useState, useMemo } from 'react';
import { Editor, Element as SlateElement, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { SlateProviderWrapper, SlateEditable, SlateToolbar } from 'SlateExample';

import styles from './SlateWithLinks.module.scss';

export default function IndexPage() {
  const [value, setValue] = useState<any>([
    { 
      type: 'paragraph',
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ])

  const editor = useMemo(() => withInlines(withReact(withHistory(createEditor()))), [])

  return (
    <div className={styles.pageContainer}>
      <p>Slate editor with `add/remove` link button.</p>
      <div className={styles.columnsContainer}>
        <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
          <SlateToolbar formattingOptions={['link']}/>
          <SlateEditable />
        </SlateProviderWrapper>
        <div className={styles.slateJsonCotainer}>
          <span>Slate JSON value:</span>
            {JSON.stringify(value, null, 4)}
        </div>
      </div>
    </div>
  )
}

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) =>
    ['link'].includes(element.type) || isInline(element)

  return editor;
};
