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
        { text: 'This', strong: true },
        { text: ' ' },
        { text: 'text', emphasis: true },
        { text: ' ' },
        { text: 'is', underline: true },
        { text: ' ' },
        { text: 'formatted', strikethrough: true },
        { text: ' .' }
      ],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'This is regular text' },
      ],
    }
  ])

  const editor = useMemo(() => withInlines(withReact(withHistory(createEditor()))), [])

  return (
    <div className={styles.pageContainer}>
      <p>Slate editor with most common formatting options</p>
      <div className={styles.columnsContainer}>
        <SlateProviderWrapper editor={editor} value={value} onChange={setValue}>
          <SlateToolbar formattingOptions={['link', 'strong', 'emphasis', 'underline', 'strikethrough', 'code', 'inlineCode'/*, 'heading1'*/, 'heading2'/*, 'heading3'*/, 'numbered-list', 'bulleted-list'/*, 'left', 'center', 'right', 'justify'*/ ]} />
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
      ['numbered-list']: (node: Node, next) => {
        return ({
          type: 'list',
          ordered: true,
          children: next(node.children),
        })
      },
      ['bulleted-list']: (node: Node, next) => {
        return ({
          type: 'list',
          ordered: false,
          children: next(node.children),
        })
      },
      ['list-item']: (node: Node, next) => {
        return ({
          type: 'listItem',
          children: next(getSeralizedChildren(node.children)),
        })
      },
      heading1: (node: any, next) => {
        return ({
          type: 'heading',
          depth: 1,
          children: next(node.children),
        });
      },
      heading2: (node: any, next) => {
        return ({
          type: 'heading',
          depth: 2,
          children: next(node.children),
        });
      },
      heading3: (node: any, next) => {
        return ({
          type: 'heading',
          depth: 3,
          children: next(node.children),
        });
      },
      // https://github.com/inokawa/remark-slate-transformer/issues/31#issuecomment-1146665213
      paragraph: (node: Node, next) => {
        return ({
          type: "paragraph",
          children: next(getSeralizedChildren(node.children)),
        });
      },
    },}).use(stringify);

  const ast = processor.runSync({
    type: "root",
    children: value,
  });
  const mdText = processor.stringify(ast);

  return mdText.replace(/\\(?=<|~)/g, '');
};

const withInlines = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element: SlateElement) => {
    return ['link'].includes(element.type) || isInline(element)
  }

  return editor;
};

const getSeralizedChildren = (children: any) => {
  return children.map(child => {
    let rChild = { ...child };
    let rText = rChild.text;

    if (child.text && child.underline) {
      rText = `<u>${rText}</u>`;

      delete rChild.text;
      rChild = { ...rChild, text: rText };
    }
    if (child.text && child.strikethrough) {
      rText = `~~${rText}~~`;

      delete rChild.text;
      rChild = { ...rChild, text: rText };

      /*
        * This works without replacing escape characters afterwards, but requires 
        * that each mark is proccessed here. Otherwise this will override other marks
        * applied to this node (eg. it can't be bold and strikethrough at the same time)
        *
        * return { ...modifiedChild, type: 'html', children: [ { text: `~${child.text}~` }] }
      */
    }
    if (child.text && child.code) {
      const quotations = '```';

      rText = `${quotations}Shell\n${rText}\n${quotations}`;

      delete rChild.text;
      rChild = { ...rChild, text: rText };
    }
    if (child.text && child.highlight) {
      const quotations = '`';

      rText = `${quotations}${rText}${quotations}`;

      delete rChild.text;
      rChild = { ...rChild, text: rText };
    }
    return rChild;
  });
};
