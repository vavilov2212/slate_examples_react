import React, { useState, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import SlateProviderWrapper from './SlateProviderWrapper/SlateProviderWrapper';
import SlateToolbar from './SlateToolbar/SlateToolbar';

import styles from './SlateWithLinks.module.scss';

export default function IndexPage() {
  const editor = useMemo(() => withReact(withHistory(createEditor())), [])
  const [value, setValue] = useState<any>([
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ])

  return (
    <div className={styles.pageContainer}>
      <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
        <SlateToolbar />
        <Editable placeholder="Enter some plain text..." />
      </SlateProviderWrapper>
    </div>
  )
}

