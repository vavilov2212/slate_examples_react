import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Editor, Range, Element as SlateElement } from 'slate';
import { Text } from '../../../../../../ui/elements/Text';
import { IconArrow } from '../../../../../../ui/elements/Icon';

import style from './HeadingSelect.module.scss';

interface IHeadingSelectProps {
  theme?: string;
  editor: Editor;
  toggleBlock: (selection: Range, activeHeading: number) => void;
}

const headingIndex = (type: string) => {
  let index = 0;
  switch (type) {
    default:
    case '': break;
    case 'heading1': index = 1; break;
    case 'heading2': index = 2; break;
    case 'heading3': index = 3; break;
  }

  return index;
};

const HEADING_OPTIONS = ['Regular', 'Heading 1', 'Heading 2', 'Heading 3'];

const HeadingSelect = (props: IHeadingSelectProps) => {
  const { theme, editor, toggleBlock } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [savedSelection, setSavedSelection] = useState<Range>();
  const [activeHeading, setActiveHeading] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      const { selection } = editor;
      setSavedSelection(selection);
    }
  }, [isOpen]);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      e.stopPropagation();
      const targetClass = (e.target as Element).className;

      if (targetClass && typeof(targetClass) === 'string' && targetClass.indexOf('rteHeading') === -1) {
        setIsOpen(false);
        setSelectedHeading('');
      }

      return e;
    };

    document.addEventListener('click', outSideClick);

    return () => document.removeEventListener('click', outSideClick);
  }, []);

  const setSelectedHeading = (type: string): boolean => {
    switch (type) {
      case 'heading1': {
        if (activeHeading !== 1) {
          setActiveHeading(1);
        }
        return;
      }
      case 'heading2': {
        if (activeHeading !== 2) {
          setActiveHeading(2);
        }
        return;
      }
      case 'heading3': {
        if (activeHeading !== 3) {
          setActiveHeading(3);
        }
        return;
      }
      default: {
        if (activeHeading) {
          setActiveHeading(0);
        }
        return;
      }
    }
  };

  const getHeadingType = (): string => {
    const { selection } = editor;

    if (selection) {
      const nodes = Editor.nodes(editor,
        {
          match: (n) =>
            !Editor.isEditor(n) && SlateElement.isElement(n) &&
              (n.type as string[]).indexOf('heading') !== -1,
        }
      );

      const node = nodes.next().value;

      if (node) {
        const [heading] = node;
        return heading.type as string;
      }
    }

    return '';
  };

  return (
    <div className={style.rteHeadinContainer}>
      <div
        className={cn(style.rteHeadingLabelContainer, theme)}
        onMouseDown={(event: React.MouseEvent) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <Text
          variant={'text-small'}
          colorVariant={'tertiary'}
          className={style.rteHeadingAvitve}
        >
          {HEADING_OPTIONS[headingIndex(getHeadingType())]}
        </Text>
        <IconArrow direction={isOpen ? 'top' : 'bottom'} size={'s'}/>
      </div>
      {isOpen &&
        <div className={cn(style.contentContainer, theme)}>
          {HEADING_OPTIONS.map((heading: string, i: number) => {
            return (
            <Text
              key={i}
              variant={'text-small'}
              colorVariant={'tertiary'}
              className={cn(style.rteHeadingOption, {[style.activeHeading]: activeHeading === i})}
              onClick={() => {
                setActiveHeading(i);
                toggleBlock(savedSelection, i);
                setIsOpen(false);
                setSavedSelection(undefined);
              }}
            >
              {heading}
            </Text>
            );
          }
          )}
        </div>
      }
    </div>
  );

};

export default HeadingSelect;
