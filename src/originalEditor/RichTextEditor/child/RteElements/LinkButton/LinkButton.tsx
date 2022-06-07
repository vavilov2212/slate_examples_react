import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Range, Path, Element as SlateElement } from 'slate';
import markIcons from '../../icons';

import style from './LinkButton.module.scss';

interface IRteLinkButtonProps {
  theme?: string;
}

const RteLinkButton = (props: IRteLinkButtonProps) => {
  const { theme } = props;

  /* Current selection (editor.selection) */
  const [stateSelection, setStateSelection] = useState<Editor['selection']>();
  const [isLinkInputFocused, setIsLinkInputFocused] = useState(false);
  const [linkValue, setLinkValue] = useState('');

  const linkInput = useRef<HTMLInputElement>();
  const linkInputWrapper = useRef<HTMLDivElement>();

  const atRoot = (selection: Range) => {
    const path = selection && Editor.path(editor, selection);

    try {
      const parentPath = Path.parent(path);
      let parent: any = false;
      try {
        parent = selection && Editor.parent(editor, selection);
      } catch (e) {
        return true;
      }

      if (parent && Editor.hasBlocks(editor, parent[0])) {
        return true;
      } else {
        return !(parentPath.length > 0);
      }
    } catch (e) {
      return true;
    }
  };

  const editor = useSlate();

  const toggleShowLinkInput = (show: boolean) => {
    if (show) {
      if (!atRoot(stateSelection)) {
        if (linkInputWrapper && linkInputWrapper.current) {
          linkInputWrapper.current.style.display = 'block';
        }
      }
    } else {
      if (linkInputWrapper && linkInputWrapper.current) {
        linkInputWrapper.current.style.display = 'none';
      }
    }
  };

  const changeLink = (url: string) => {
    const [node, path] = Editor.node(editor, stateSelection);

    Transforms.setNodes(editor,
      {
        link: {
          ...node.link as {[key: string]: string},
          url: url,
        },
      },
      {
        at: path,
        match: (n: SlateElement) => !!n.link,
        split: false,
    });
  };

  const insertLink = (iEditor: Editor) => {
    if (iEditor.selection) {
      wrapLink(iEditor);
    }
  };

  const wrapLink = (wEditor: Editor) => {
    if (isLinkActive(wEditor)) {
      unwrapLink(wEditor);
    } else {
      const { selection } = wEditor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      if (!isCollapsed) {
        const nodes = Editor.nodes(wEditor, {
          match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && !!n.type,
        });
        const node = nodes.next().value;

        if (node) {
          const [linkNode, path] = node;

          if (path.length > 0) {
            const link = {
              type: 'link',
              url: '',
              children: [linkNode.children],
            };

            Editor.addMark(wEditor, 'link', link);
            setStateSelection(wEditor.selection);
            setLinkValue('');
          }
        }
      }
    }
  };

  const unwrapLink = (uEditor: Editor) => {
    const nodes = Editor.nodes(uEditor, {
      match: n => !Editor.isEditor(n) && !!n.link,
    });
    const node = nodes.next().value;

    if (node) {
      const path = node[1];

      if (path.length > 0) {
        // const [, path] = Editor.node(editor, uEditor.selection);
        Transforms.select(uEditor, path);
        Editor.removeMark(uEditor, 'link');
        linkInput.current.blur();
      }
    }
  };

  const isLinkActive = (aEditor: Editor) => {
    const marks = Editor.marks(aEditor);

    if (marks && !!marks.link) {
      toggleShowLinkInput(true);
      if (marks.link.url !== linkValue) {
        setLinkValue(marks.link.url);
      }
    } else {
      if (!isLinkInputFocused) {
        toggleShowLinkInput(false);
      }
    }

    return marks ? !!marks.link : false;
  };

  const LinkIcon = markIcons.link;

  return (
    <div className={style.linkButtonWrapper}>
      <div
        className={style.linkInputWrapper}
        ref={el => {
          linkInputWrapper.current = el;
          if (linkInput.current) {
            linkInput.current.onfocus = () => {
              setStateSelection(editor.selection);
              setIsLinkInputFocused(true);
            };

            linkInput.current.onblur = () => {
              setIsLinkInputFocused(false);
            };
          }
        }}
      >
        <input
          ref={el => linkInput.current = el }
          value={linkValue}
          onChange={event => {
            setLinkValue((event.target as HTMLInputElement).value);
            changeLink((event.target as HTMLInputElement).value);
          }}
          className={cn(style.floatingControl, theme)}
        />
      </div>

      <div
        onMouseDown={() => {
          event.preventDefault();
          insertLink(editor);
        }}
      >
        <LinkIcon
          className={cn(
            style.linkButton,
            {
              [style.active]: isLinkActive(editor),
              [style.disabled]: isLinkInputFocused,
            },
            theme
          )}
        />
      </div>
    </div>
  );

};

export default RteLinkButton;
