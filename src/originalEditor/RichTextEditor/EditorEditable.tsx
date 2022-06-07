import React, { useCallback } from 'react';
import cn from 'classnames';
import isHotkey from 'is-hotkey';
import { HistoryEditor } from 'slate-history';
import { toggleMark, selectHeading } from './child/helper';
import { IRteFormat } from './child/interfaces/general';
import { Range } from 'slate';
import { Editable, useSlate, RenderElementProps, RenderLeafProps } from 'slate-react';
import { IRteElementProps } from './child/interfaces/general';
import {
  increaseItemDepth,
  decreaseItemDepth,
  resetItemDepth,
  convertSubstringToSup,
  convertSubstringToSub,
} from './child/helper';
import RteControls from './child/RteControls';

import style from './EditorStyle.module.scss';

interface IEditorEditableProps {
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  validated?: boolean;
  theme?: string;
}

const MARKS_HOTKEYS: {[key: string]: IRteFormat} = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'regular',
};

const HEADINGS_HOTKEYS: {[key: string]: number} = {
  'mod+1': 1,
  'mod+2': 2,
  'mod+3': 3,
};

const REDO_HOTKEYS = [
  'mod+shift+z',
  'mod+shift+я',
  'mod+y',
  'mod+н',
];

const UNDO_HOTKEYS = [
  'mod+z',
  'mod+я',
];

const EditorEditable = (props: IEditorEditableProps) => {
  const {
    placeholder = '',
    validated = true,
    inputClassName,
    wrapperClassName,
    theme,
  } = props;

  const renderElement = useCallback((eProps: IRteElementProps | RenderElementProps) => (
    <RteControls.Element {...eProps} />
  ), []);

  const renderLeaf = useCallback((lProps: IRteElementProps | RenderLeafProps) => (
    <RteControls.Leaf {...lProps} />
  ), []);

  const editor = useSlate();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (REDO_HOTKEYS.some(item => isHotkey(item, { byKey: true }, e as any))) {
      HistoryEditor.redo(editor as any);
    }
    if (UNDO_HOTKEYS.some(item => isHotkey(item, { byKey: true }, e as any))) {
      HistoryEditor.undo(editor as any);
    }

    /** Hot keys for bold, italic, underline or regular */
    for (const marksHotKey in MARKS_HOTKEYS) {
      if (isHotkey(marksHotKey, e as any)) {
        e.preventDefault();
        const mark: IRteFormat = MARKS_HOTKEYS[marksHotKey];
        if (mark === 'regular') {
          Object.values(MARKS_HOTKEYS).map((mMark: string) => editor.removeMark(mMark));
        } else {
          toggleMark(mark, editor);
        }
      }
    }

    /** Hot keys for heading1, heading2, heading3 */
    for (const headingsHotKey in HEADINGS_HOTKEYS) {
      if (isHotkey(headingsHotKey, e as any)) {
        e.preventDefault();
        const headingIndex: number = HEADINGS_HOTKEYS[headingsHotKey];
        selectHeading((editor.selection as Range), headingIndex, editor);
      }
    }

    switch (e.key) {
      case '^': {
        return convertSubstringToSup(editor, e);
      }
      case '_': {
        return convertSubstringToSub(editor, e);
      }
      case 'Enter': {
        return resetItemDepth(editor, e);
      }
      case 'Tab': {
        if (e.shiftKey) {
          return decreaseItemDepth(editor, e);
        }

        return increaseItemDepth(editor, e);
      }
      default: return;
    }
  };

  return (
    <div className={cn(style.rteContentWrapper, wrapperClassName, theme)}>
      <Editable
        placeholder={placeholder}
        className={cn(style.rteInput, inputClassName, {[style.inValid]: !validated}, theme)}
        onKeyDown={onKeyDown}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </div>
  );
};

export default EditorEditable;
