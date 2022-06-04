import React from 'react';
import dynamic from 'next/dynamic'
import { italic, bold, underline, strikethrough } from './icons';

import styles from './SlateToolbar.module.scss';

export type FormattingOption =
  'link'
  | 'strong'
  | 'emphasis'
  | 'underline'
  | 'strikethrough'
  | 'numbered-list'
  | 'bulleted-list';

interface SlateProviderWrapper {
  formattingOptions: FormattingOption[];
}

const MarkButton = dynamic(() => import('SlateExample/FormattingOptions/MarkButton/MarkButton'));

export default function SlateProviderWrapper(props: any) {
  const { formattingOptions = ['link', 'strong' ] } = props;

  const formatOptionsLists = {
    link: dynamic(() => import('SlateExample/FormattingOptions/LinkButton/LinkButton')),
    strong: (props: never) => <MarkButton format={'strong'} icon={bold} {...props} />,
    emphasis: (props: never) => <MarkButton format={'emphasis'} icon={italic} {...props} />,
    underline: (props: never) => <MarkButton format={'underline'} icon={underline} {...props} />,
    strikethrough: (props: never) => <MarkButton format={'strikethrough'} icon={strikethrough} {...props} />,
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



