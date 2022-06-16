import React from 'react';
import dynamic from 'next/dynamic'
import {
  link,
  italic,
  bold,
  underline,
  strikethrough,
  code,
  inlineCode,
  heading1,
  heading2,
  heading3,
  numberedList,
  bulletedList,
  alignLeft,
  alignRight,
  alignCenter,
  alignJustify,
} from './icons';

import styles from './SlateToolbar.module.scss';

export type FormattingOption =
  'link'
  | 'strong'
  | 'emphasis'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'inlineCode'
  | 'heading1'
  | 'heading2'
  | 'heading3'
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
    link: (props: any) => <LinkButton format={'link'} icon={link} {...props} />,
    strong: (props: any) => <MarkButton format={'strong'} icon={bold} {...props} />,
    emphasis: (props: any) => <MarkButton format={'emphasis'} icon={italic} {...props} />,
    underline: (props: any) => <MarkButton format={'underline'} icon={underline} {...props} />,
    strikethrough: (props: any) => <MarkButton format={'strikethrough'} icon={strikethrough} {...props} />,
    code: (props: any) => <CodeButton format={'code'} icon={code} {...props} />,
    inlineCode: (props: any) => <MarkButton format={'inlineCode'} icon={inlineCode} {...props} />,
    heading1: (props: any) => <BlockButton format={'heading1'} icon={heading1} {...props} />,
    heading2: (props: any) => <BlockButton format={'heading2'} icon={heading2} {...props} />,
    heading3: (props: any) => <BlockButton format={'heading3'} icon={heading3} {...props} />,
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
  const Component = dynamic(() => import('./FormattingButtons/MarkButton/MarkButton'));

  return <Component format={format} icon={icon} {...rest} />;
};

const BlockButton = ({ format, icon }) => {
  const Component = dynamic(() => import('./FormattingButtons/BlockButton/BlockButton'));

  return <Component format={format} icon={icon} />;
};

const CodeButton = ({ format, icon }) => {
  const Component = dynamic(() => import('./FormattingButtons/BlockCodeButton/CodeButton'));

  return <Component format={format} icon={icon} />;
};

const LinkButton = ({ format, icon }) => {
  const Component = dynamic(() => import('./FormattingButtons/LinkButton/LinkButton'));

  return <Component format={format} icon={icon} />;
};
