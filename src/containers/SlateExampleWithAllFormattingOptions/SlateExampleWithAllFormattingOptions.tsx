import React, { useState, useMemo } from 'react';
import { Node, Editor, Element as SlateElement, Descendant, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { unified } from "unified";
import stringify from "remark-stringify";
import { slateToRemark } from "remark-slate-transformer";
import { SlateProviderWrapper, SlateEditable, SlateToolbar } from 'SlateExample';

import styles from './SlateExampleWithAllFormattingOptions.module.scss';

export default function IndexPage() {
  const [value, setValue] = useState<any>([
    {
      type: 'paragraph',
      children: [
        { text: 'This text is underlined.', underline: true },
      ],
    }
  ])

  const editor = useMemo(() => withInlines(withReact(withHistory(createEditor()))), [])

  return (
    <div className={styles.pageContainer}>
      <p>Slate editor with most common formatting options</p>
      <div className={styles.columnsContainer}>
        <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
          <SlateToolbar formattingOptions={['link', 'strong', 'emphasis', 'underline' ]} />
          <SlateEditable />
        </SlateProviderWrapper>
        <div className={styles.serializedCotainer}>
          <span>Serialized value:</span>
          {serialize(value)}
          <div className={styles.slateJsonCotainer}>
            <span>Slate JSON value:</span>
              {JSON.stringify(value)}
          </div>
        </div>
      </div>
    </div>
  )
};

const serialize = (value: Descendant[]) => {
  const processor = unified().use(slateToRemark, {
    overrides: {
      // https://github.com/inokawa/remark-slate-transformer/issues/31#issuecomment-1146665213
      paragraph: (node: Node, next) => {
        const children = node.children.map(child => {
          if (child.text && child.underline) {
            const { text, ...modifiedChild } = child;
            return { ...modifiedChild, type: 'html', children: [ { text: `<u>${child.text}</u>` }] }
          }
          return child;
        });
        return ({
          type: "paragraph",
          children: next(children),
        });
      },
    },}).use(stringify);

  const ast = processor.runSync({
    type: "root",
    children: value,
  });
  const mdText = processor.stringify(ast);

  return mdText;
};

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) => {
    return ['link'].includes(element.type) || isInline(element)
  }

  return editor;
};
