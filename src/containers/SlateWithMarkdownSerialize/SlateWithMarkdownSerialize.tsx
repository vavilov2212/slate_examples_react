import React, { useState, useMemo } from 'react';
import { Editor, Element as SlateElement, Descendant, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { unified } from "unified";
import stringify from "remark-stringify";
import { slateToRemark } from "remark-slate-transformer";
import { SlateProviderWrapper, SlateEditable, SlateToolbar } from 'SlateExample';

import styles from './SlateWithMarkdownSerialize.module.scss';

export default function IndexPage() {
  const [value, setValue] = useState<any>([
    { 
      type: 'paragraph',
      children: [
        { text: 'This is ' },
        {
          type: "link",
          url: "http://example.com",
          children: [
            { text: 'editable' }
          ]
        },
        { text: ' plain text, just like a <textarea>!' },
      ],
    },
  ])

  const editor = useMemo(() => withInlines(withReact(withHistory(createEditor()))), [])

  return (
    <div className={styles.pageContainer}>
      <p>
        Slate editor with `add/remove` link button, which serializes to markdown with
        &nbsp;
        <a
          href="https://github.com/inokawa/remark-slate-transformer"
          target="_blank"
        >
          remark-slate-transformer
        </a>
      </p>
      <div className={styles.columnsContainer}>
        <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
          <SlateToolbar formattingOptions={['link']} />
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
}

const serialize = (value: Descendant[]) => {
  const processor = unified().use(slateToRemark).use(stringify);
  const ast = processor.runSync({
    type: "root",
    children: value,
  });
  const mdText = processor.stringify(ast);

  return mdText;
};

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) =>
    ['link'].includes(element.type) || isInline(element)

  return editor;
};
