import React, { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import { Text, Node, Editor, Path } from 'slate';
import 'prismjs/themes/prism.css';
import { Editable, useSelected } from 'slate-react';

import styles from './SlateEditable.module.scss';

  let isCode = false;

interface SlateEditableProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}
export default function SlateEditable(props: SlateEditableProps) {
  const { onKeyDown } = props;

  const [language, setLanguage] = useState('plain')
  const [Prism, setPrism] = useState("")

  useEffect(() => {
    (async () => (await import('prismjs')).default)()
      .then(Prism => {
        Prism.manual = true;
        setPrism(Prism);
      })
  }, [])

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []

      if (node.type) {
        isCode = node.type === 'code' ? true : false;
      }

      if (!Text.isText(node) || Editor.isEditor(node)) {
        return ranges;
      }

      if (!isCode) return ranges;


      if (Prism) {
        const tokens = Prism?.tokenize(node.text, Prism?.languages?.[language]);
        let start = 0

        for (const token of tokens) {
          const length = getLength(token)
          const end = start + length

          if (typeof token !== 'string') {
            ranges.push({
              className: `prism-token token ${token.type}`,
              anchor: { path, offset: start },
              focus: { path, offset: end },
            })
          }

          start = end
        }
      }

      return ranges;
    },
    [language, Prism]
  );

  const getLength = token => {
    if (typeof token === 'string') {
      return token.length
    } else if (typeof token.content === 'string') {
      return token.content.length
    } else {
      return token.content.reduce((l, t) => l + getLength(t), 0)
    }
  }

  if (typeof window === undefined) return null;

  return (
    <div className={styles.slateEditable}>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        {
          Prism?.languages && Object.keys(Prism.languages).map(lang => {
            return <option value={lang}>{lang}</option>
          })
        }
      </select>
      <Editable
        renderElement={props => <Element {...props} language={language} />}
        renderLeaf={props => <Leaf {...props} />}
        placeholder="Enter some plain text..."
        className={styles.slateInput}
        decorate={decorate}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

const Element = (props: any) => {
  const { attributes, children, element, language } = props
  const style = { textAlign: element.align };

  switch (element.type) {
    case 'link': {
      const selected = useSelected()

      return (
        <a
          {...attributes}
          href={element.url}
          className={cn({[styles.selected]: selected})}
        >
          {children}
        </a>
      );
    }
    case 'code': {
      return (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`} style={style} {...attributes}>
            {children}
          </code>
        </pre>
      )
    }
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'list-item':
      return (
        <li {...attributes}>
          {children}
        </li>
      )
    case 'heading1':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading2':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'heading3':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    default: {
      return <div style={style} {...attributes}>{children}</div>
    }
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.strong) {
    children = <strong>{children}</strong>
  }
  if (leaf.emphasis) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }
  if (leaf.inlineCode) {
    children = <mark>{children}</mark>
  }

  return <span className={leaf.className} {...attributes}>{children}</span>;
};
