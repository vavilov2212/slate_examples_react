import React, { useState, useMemo } from 'react';
import { Editor, Element as SlateElement, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { SlateProviderWrapper, SlateEditable, SlateToolbar } from './Slate';

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
      <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
        <SlateToolbar />
        <SlateEditable />
      </SlateProviderWrapper>
    </div>
  )
}

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) =>
    ['link'].includes(element.type) || isInline(element)

  return editor;
};
