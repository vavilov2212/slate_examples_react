import { Transforms, Editor } from 'slate';
import isHotkey from 'is-hotkey';
import { getIndent } from '../utils';
import onEnter from './onEnter';
import { HistoryEditor } from 'slate-history';

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

const onKeyDown = (e: React.KeyboardEvent, editor: Editor) => {
  if (REDO_HOTKEYS.some(item => isHotkey(item, { byKey: true }, e as any))) {
    HistoryEditor.redo(editor as any);
  }
  if (UNDO_HOTKEYS.some(item => isHotkey(item, { byKey: true }, e as any))) {
    HistoryEditor.undo(editor as any);
  }

  switch (e.key) {
    case 'Enter': {
      onEnter(editor, e);
      break;
    }
    case 'Tab': {
      const indent = getIndent(editor);

      if (e.shiftKey) {
        return Transforms.delete(
          editor,
          {
            at: Editor.point(editor, editor.selection),
            reverse: true,
            distance: 2,
            unit: 'character'
          }
        );
      }

      return Transforms.insertText(
        editor,
        indent,
        {
          at: Editor.point(editor, editor.selection, { edge: 'start' })
        }
      );
    }
    default: return;
  }
};

export default onKeyDown;
