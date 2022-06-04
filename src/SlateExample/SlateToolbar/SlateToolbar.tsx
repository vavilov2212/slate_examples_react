import React from 'react';
import dynamic from 'next/dynamic'
import {
  italic,
  bold,
  underline,
  strikethrough,
  numberedList,
  bulletedList,
  alignLeft,
  alignRight,
  alignCenter,
  alignJustify
} from 'SlateExample/icons';

import styles from './SlateToolbar.module.scss';

export type FormattingOption =
  'link'
  | 'strong'
  | 'emphasis'
  | 'underline'
  | 'strikethrough'
  | 'numbered-list'
  | 'bulleted-list'
  | 'left'
  | 'center'
  | 'right'
  | 'justify';

interface SlateProviderWrapper {
  formattingOptions: FormattingOption[];
}

export default function SlateProviderWrapper(props: any) {
  const { formattingOptions = ['link', 'strong' ] } = props;

  const formatOptionsLists = {
    link: dynamic(() => import('SlateExample/FormattingOptions/LinkButton/LinkButton')),
    strong: (props: any) => <MarkButton format={'strong'} icon={bold} {...props} />,
    emphasis: (props: any) => <MarkButton format={'emphasis'} icon={italic} {...props} />,
    underline: (props: any) => <MarkButton format={'underline'} icon={underline} {...props} />,
    strikethrough: (props: any) => <MarkButton format={'strikethrough'} icon={strikethrough} {...props} />,
    ['numbered-list']: (props: any) => <BlockButton format={'numbered-list'} icon={numberedList} {...props} />,
    ['bulleted-list']: (props: any) => <BlockButton format={'bulleted-list'} icon={bulletedList} {...props} />,
    left: (props: any) => <BlockButton format={'left'} icon={alignLeft} {...props} />,
    center: (props: any) => <BlockButton format={'center'} icon={alignCenter} {...props} />,
    right: (props: any) => <BlockButton format={'right'} icon={alignRight} {...props} />,
    justify: (props: any) => <BlockButton format={'justify'} icon={alignJustify} {...props} />,
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

const MarkButton = ({ format, icon, ...rest }) => {
  const Component = dynamic(() => import('SlateExample/FormattingOptions/MarkButton/MarkButton'));

  return <Component format={format} icon={icon} {...rest} />;
};

const BlockButton = ({ format, icon }) => {
  const Component = dynamic(() => import('SlateExample/FormattingOptions/BlockButton/BlockButton'));

  return <Component format={format} icon={icon} />;
};
