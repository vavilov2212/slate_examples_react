import React, { useEffect, useState, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import SlateProviderWrapper from './SlateProviderWrapper/SlateProviderWrapper';
import SlateToolbar from './SlateToolbar/SlateToolbar';
import SlateEditable from './SlateEditable/SlateEditable';

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
      <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
        <SlateToolbar />
        <SlateEditable />
      </SlateProviderWrapper>
    </div>
  )
}

const withInlines = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element =>
    ['link'].includes(element.type) || isInline(element)

  return editor;
}

