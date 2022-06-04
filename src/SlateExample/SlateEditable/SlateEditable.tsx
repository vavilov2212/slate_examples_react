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
  switch (element.type) {
    case 'link': {
      return <LinkComponent {...props} />
    }
    default: {
      return <p {...attributes}>{children}</p>
    }
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  return <span {...attributes}>{children}</span>;
};

const LinkComponent = ({ attributes, children, element }) => {
  const selected = useSelected()

  return (
    <a
      {...attributes}
      href={element.url}
      className={cn({[styles.selected]: selected})}
    >
      {children}
    </a>
  )
}
