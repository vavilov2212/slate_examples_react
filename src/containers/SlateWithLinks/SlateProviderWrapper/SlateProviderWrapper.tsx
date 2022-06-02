import React from 'react';
import { Slate } from 'slate-react';

import styles from '../SlateWithLinks.module.scss';

export default function SlateProviderWrapper(props: any) {
  const { editor, value, onChange } = props;

  return (
    <div className={styles.slateProviderWrapper}>
      <Slate editor={editor} value={value} onChange={onChange}>
        {props.children}
      </Slate>
    </div>
  )
}


