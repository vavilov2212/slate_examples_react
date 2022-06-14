import React from 'react';
import dynamic from 'next/dynamic'
import {
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
} from 'SlateExample/icons';

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
    link: dynamic(() => import('SlateExample/FormattingOptions/LinkButton/LinkButton')),
    strong: (props: any) => <MarkButton format={'strong'} Icon={bold} {...props} />,
    emphasis: (props: any) => <MarkButton format={'emphasis'} Icon={italic} {...props} />,
    underline: (props: any) => <MarkButton format={'underline'} Icon={underline} {...props} />,
    strikethrough: (props: any) => <MarkButton format={'strikethrough'} Icon={strikethrough} {...props} />,
    code: (props: any) => <CodeButton format={'code'} Icon={code} {...props} />,
    inlineCode: (props: any) => <MarkButton format={'inlineCode'} Icon={inlineCode} {...props} />,
    heading1: (props: any) => <BlockButton format={'heading1'} Icon={heading1} {...props} />,
    heading2: (props: any) => <BlockButton format={'heading2'} Icon={heading2} {...props} />,
    heading3: (props: any) => <BlockButton format={'heading3'} Icon={heading3} {...props} />,
    ['numbered-list']: (props: any) => <BlockButton format={'numbered-list'} Icon={numberedList} {...props} />,
    ['bulleted-list']: (props: any) => <BlockButton format={'bulleted-list'} Icon={bulletedList} {...props} />,
    left: (props: any) => <BlockButton format={'left'} Icon={alignLeft} {...props} />,
    center: (props: any) => <BlockButton format={'center'} Icon={alignCenter} {...props} />,
    right: (props: any) => <BlockButton format={'right'} Icon={alignRight} {...props} />,
    justify: (props: any) => <BlockButton format={'justify'} Icon={alignJustify} {...props} />,
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

const MarkButton = ({ format, Icon, ...rest }) => {
  const Component = dynamic(() => import('SlateExample/FormattingOptions/MarkButton/MarkButton'));

  return <Component format={format} Icon={Icon} {...rest} />;
};

const BlockButton = ({ format, Icon }) => {
  const Component = dynamic(() => import('SlateExample/FormattingOptions/BlockButton/BlockButton'));

  return <Component format={format} Icon={Icon} />;
};

const CodeButton = ({ format, Icon }) => {
  const Component = dynamic(() => import('SlateExample/FormattingOptions/BlockCodeButton/CodeButton'));

  return <Component format={format} Icon={Icon} />;
};
