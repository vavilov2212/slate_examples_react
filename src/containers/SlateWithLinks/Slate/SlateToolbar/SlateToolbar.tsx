import React from 'react';
import LinkButton from './LinkButton';

import styles from './SlateToolbar.module.scss';

export default function SlateProviderWrapper(props: any) {
  const {  } = props;

  return (
    <div className={styles.slateToolbar}>
      <LinkButton />
    </div>
  )
}



