import React from 'react';
import cn from 'classnames';
import LinkIcon from './link.svg';
import { Editor, Transforms, Range, Descendant, Element as SlateElement} from 'slate';
import { useSlate } from 'slate-react';

import styles from './SlateToolbar.module.scss';

interface LinkElement {
  type: 'link';
  url: string;
  children: Descendant[];
}
const LinkButton = (props: any) => {
  const editor = useSlate();

  const isLinkActive = (editor: Editor) => {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
  }

  const insertLink = (editor: Editor, url: string) => {
    if (editor.selection) {
      wrapLink(editor, url);
    }
  };

  const wrapLink = (editor: Editor, url: string) => {
    if (isLinkActive(editor)) {
      return unwrapLink(editor);
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: LinkElement = {
      type: 'link',
      url: url,
      children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }
  };

  const unwrapLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  };

  return (
    <div className={styles.linkButtonWrapper}>
      <div onMouseDown={(event) => {
        event.preventDefault();
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        } else {
          const url = window.prompt('Enter the URL of the link:')
          if (!url) return
          insertLink(editor, url);
        }
      }}>
        <LinkIcon
          className={cn(
            styles.linkButton,
            {
              [styles.active]: isLinkActive(editor),
              /* [styles.disabled]: isLinkInputFocused, */
            },
          )}
        />
      </div>
    </div>
  );
}

export default LinkButton;
