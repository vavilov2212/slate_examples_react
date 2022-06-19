import React from 'react';
import cn from 'classnames';
import { Slate } from 'slate-react';

import styles from './SlateProviderWrapper.module.scss';

export default function SlateProviderWrapper(props: any) {
  const { editor, value, onChange, containerClassName } = props;

  return (
    <div className={cn(styles.slateProviderContainer, containerClassName)}>
      <Slate editor={editor} value={value} onChange={onChange}>
        {props.children}
      </Slate>
    </div>
  )
}
