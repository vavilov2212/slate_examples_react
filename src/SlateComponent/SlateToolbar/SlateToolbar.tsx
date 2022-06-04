import React from 'react';
import dynamic from 'next/dynamic'

import styles from './SlateToolbar.module.scss';

type FormatOption = 'link';

interface SlateProviderWrapper {
  formatOptions: FormatOption[];
}

export default function SlateProviderWrapper(props: any) {
  const { formatOptions = ['link'] } = props;

  const formatOptionsLists = {
    link: dynamic (() => import('SlateComponent/FormatOptions/LinkButton/LinkButton'))
  };

  return (
    <div className={styles.slateToolbar}>
      {
        formatOptions?.map((option: string) => {
          const Component = formatOptionsLists[option];
          return <Component />;
        })
      }
    </div>
  )
}



