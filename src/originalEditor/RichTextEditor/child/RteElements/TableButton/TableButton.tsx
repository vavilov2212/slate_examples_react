import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement, Node } from 'slate';
import { Text } from '../../../../ui/elements/Text';
import markIcons from '../../icons';
import withTables from './withTables';

import style from './TableButton.module.scss';

interface IRteTableButtonProps {
  theme?: string;
}

const RteTableButton = (props: IRteTableButtonProps) => {
  const { theme } = props;

  const [tableColValue, setTableColValue] = useState(3);
  const [tableRowValue, setTableRowValue] = useState(2);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stateSelection, setStateSelection] = useState<any>();

  const tableInput = useRef<HTMLInputElement>();

  const editor = withTables(useSlate());

  useEffect(() => {
    if (isOpen) {
      tableInput.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      e.stopPropagation();
      const targetClass = (e.target as Element).className;

      if (targetClass && typeof(targetClass) === 'string' && targetClass.indexOf('rteTable') === -1) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', outSideClick);

    return () => document.removeEventListener('click', outSideClick);
  }, []);

  const removeTable = () => {
    Transforms.removeNodes(editor, {
      match: n => {
        return !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table';
      },
    });
  };

  const insertTable = () => {
    const tableBlock: any = [{ type: 'table', children: [] as Node[] }, { type: 'paragraph', children: [] }];

    for (let i = 0; i < tableRowValue; i++) {
      const tableRow: Node = { type: 'table_row', children: [] as Node[] };

      for (let j = 0; j < tableColValue; j++) {
        tableRow.children.push({ type: 'table_cell', children: [{ text: 'Col ' + j }] });
      }

      ((tableBlock[0] as Node).children as Node[]).push(tableRow);
    }

    Transforms.insertNodes(editor, tableBlock, { at: stateSelection });
    setStateSelection(undefined);
  };

  const isBlockActive = (): boolean => {
    const nodes = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'table',
    });

    return !!nodes.next().value;
  };

  const TableCheckIcon = markIcons.table_check;
  const TableIcon = markIcons.table;

  return (
    <div className={style.rteTableButtonWrapper}>
      <div className={cn(style.rteTableInputWrapper, {[style.open]: isOpen}, theme)}>
        <Text>Columns: </Text>

        <input
          value={tableColValue}
          onChange={event => {
            setTableColValue(Number((event.target as HTMLInputElement).value));
          }}
          type={'number'}
          className={cn(style.rteTableFloatingControl, theme)}
        />

        <Text>Rows: </Text>
        <input
          ref={el => tableInput.current = el }
          value={tableRowValue}
          onChange={event => {
            setTableRowValue(Number((event.target as HTMLInputElement).value));
          }}
          className={cn(style.rteTableFloatingControl, theme)}
        />

        <TableCheckIcon
          className={style.rteTableApply}
          onClick={() => {
            setIsOpen(false);
            insertTable();
          }}
        />
      </div>

      <div
        onMouseDown={event => {
          event.preventDefault();
          if (isBlockActive()) {
            removeTable();
          } else {
            setStateSelection(editor.selection);
            setIsOpen(true);
          }
        }}
      >
        <TableIcon
          className={cn(
            style.rteTableBlockButton,
            {
              [style.active]: isBlockActive(),
              [style.disabled]: isOpen,
            },
            theme
          )}
        />
      </div>
    </div>

  );
};

export default RteTableButton;
/*
 * Example of Table with 2 rows and 3 columns;
 *
const block: any =
  [
      {
        type: 'table',
        children: [
          {
            type: 'table_row',
            children: [
              {
                type: 'table_cell',
                children: [{ text: 'Human', bold: true }],
              },
              {
                type: 'table_cell',
                children: [{ text: 'Dog', bold: true }],
              },
              {
                type: 'table_cell',
                children: [{ text: 'Cat', bold: true }],
              },
            ],
          },
          {
            type: 'table_row',
            children: [
              {
                type: 'table_cell',
                children: [{ text: 'Human', bold: true }],
              },
              {
                type: 'table_cell',
                children: [{ text: 'Dog', bold: true }],
              },
              {
                type: 'table_cell',
                children: [{ text: 'Cat', bold: true }],
              },
            ],
          },
        ],
    },
    { type: 'paragraph', children: [] },
  ]; */
