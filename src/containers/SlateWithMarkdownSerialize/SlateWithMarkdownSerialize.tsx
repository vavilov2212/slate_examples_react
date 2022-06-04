import React, { useState, useMemo } from 'react';
import { Editor, Element as SlateElement, Descendant, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { unified } from "unified";
import stringify from "remark-stringify";
import { slateToRemark } from "remark-slate-transformer";
import { SlateProviderWrapper, SlateEditable, SlateToolbar } from './Slate';

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
        <a
          href="https://github.com/inokawa/remark-slate-transformer"
          target="_blank"
        >
          remark-slate-transformer
        </a>
      </p>
      <span>Serialized value:</span>
      <div className={styles.serializedCotainer}>
        <p>{serialize(value)}</p>
      </div>
      <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
        <SlateToolbar />
        <SlateEditable />
      </SlateProviderWrapper>
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
  console.log('mdText', mdText);
  return mdText;
};

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) =>
    ['link'].includes(element.type) || isInline(element)

  return editor;
};
