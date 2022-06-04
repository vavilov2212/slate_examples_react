import React from 'react';
import dynamic from 'next/dynamic'

import styles from './SlateToolbar.module.scss';

export type FormattingOption = 'link' | 'bold';

interface SlateProviderWrapper {
  formattingOptions: FormattingOption[];
}

export default function SlateProviderWrapper(props: any) {
  const { formattingOptions = ['link', 'bold' ] } = props;

  const formatOptionsLists = {
    link: dynamic (() => import('SlateExample/FormattingOptions/LinkButton/LinkButton')),
    bold: dynamic (() => import('SlateExample/FormattingOptions/BoldButton/BoldButton')),
    /* italic: dynamic (() => import('SlateExample/FormattingOptions/ItalicButton/ItalicButton')), */
    /* underline: dynamic (() => import('SlateExample/FormattingOptions/UnderlineButton/UnderlineButton')), */
    /* strikethrough: dynamic (() => import('SlateExample/FormattingOptions/StrikethroughButton/StrikethroughButton')), */
  };

  return (
    <div className={styles.slateToolbar}>
      {
        formattingOptions?.map((option: string, i: number) => {
          const Component = formatOptionsLists[option];
          return <Component key={`${option}_${i}`} />;
        })
      }
    </div>
  )
}



