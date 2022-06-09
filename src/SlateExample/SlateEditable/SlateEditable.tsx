import React from 'react';
import cn from 'classnames';
import { Editable, useSelected } from 'slate-react';

import styles from './SlateEditable.module.scss';

export default function IndexPage() {

  return (
    <div className={styles.slateEditable}>
      <Editable
        renderElement={props => <Element {...props} />}
        renderLeaf={props => <Leaf {...props} />}
        placeholder="Enter some plain text..."
        className={styles.slateInput}
      />
    </div>
  )
}

const Element = (props: any) => {
  const { attributes, children, element } = props
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
      return <p style={style} {...attributes}>{children}</p>
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
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.inlineCode) {
    children = <mark>{children}</mark>
  }

  return <span {...attributes}>{children}</span>;
};
