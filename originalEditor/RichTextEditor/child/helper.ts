import React from 'react';
import { IRteFormat } from './interfaces/general';
import { Editor, Transforms, Range, Element as SlateElement } from 'slate';

/**
 * When entering link address - appends 'https://' if not exist.
 */
export const manageProtocol = (url: string) => {
  let checkedUrl = url;

  if (url.indexOf('http') === -1) {
    checkedUrl = `https://${url}`;
  }

  return checkedUrl;
};

export const isMarkActive = (editor: Editor, mFormat: IRteFormat): boolean => {
  const marks = Editor.marks(editor);

  return marks ? marks[mFormat] === true : false;
};

export const convertSubstringToSup = (editor: Editor, event: React.KeyboardEvent) => {
  event.preventDefault();
  const format = 'sup';
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const convertSubstringToSub = (editor: Editor, event: React.KeyboardEvent) => {
  event.preventDefault();
  const format = 'sub';
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/**
 * Increase the depth of the current item by putting it in a sub-list of previous item.
 * For first items in a list, do nothing.
 */
export const increaseItemDepth = (editor: Editor, event: React.KeyboardEvent) => {
  const { selection } = editor;
  const currentItem = Editor.node(editor, selection); // Check if there is current item, otherwise the line is empty
  const previousItem = Editor.previous(editor); // Check if there is previus item, otherwise the line is first
  const parentItem = Editor.parent(editor, selection);
  const parentParentItem = Editor.parent(editor, parentItem[1]); // Get parent of depth 1.

  if (!currentItem || !previousItem || !parentItem || !parentParentItem) {
    return editor;
  }

  if (!parentParentItem[0] || !parentParentItem[0].type) {
    return editor;
  }

  const itemType = parentParentItem[0].type as string;

  /**
   * Check if current position is in a list and it's NOT already a nested list.
   * This prevents from multiple 'Tab' hits.
   */
  if (itemType.indexOf('list') !== -1 && itemType.indexOf('nested') === -1) {
    event.preventDefault();

    if (itemType.indexOf('numbered') !== -1) {
      return Transforms.wrapNodes(editor, {type: 'nested_list_numbered', children: []});
    } else {
      Transforms.wrapNodes(editor, {type: 'nested_list_item_bulleted', children: [] });
      Transforms.unwrapNodes(editor, { match: n => n.type === 'list_item_bulleted' });
      return Transforms.wrapNodes(editor, {type: 'nested_list_bulleted', children: [] });
    }
  }

  return;
};

export const decreaseItemDepth = (editor: Editor, event: React.KeyboardEvent) => {
  const { selection } = editor;
  const currentItem = Editor.node(editor, selection); // Check if there is current item, otherwise the line is empty
  const previousItem = Editor.previous(editor); // Check if there is previus item, otherwise the line is first

  const parentItem = Editor.parent(editor, selection);
  const parentParentItem = Editor.parent(editor, parentItem[1]); // Get parent of depth 1.

  if (!currentItem || !previousItem) {
    return editor;
  }

  if (!parentParentItem[0] || !parentParentItem[0].type) {
    return editor;
  }

  const itemType = parentParentItem[0].type as string;

  event.preventDefault();
  if (itemType.indexOf('numbered') !== -1) {
    return Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_numbered' });
  } else {
    Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_bulleted' });
    Transforms.wrapNodes(editor, {type: 'list_item_bulleted', children: [] });
    Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_item_bulleted' });
  }
};

export const resetItemDepth = (editor: Editor, event: React.KeyboardEvent) => {
  const { selection } = editor;
  const parentItem = Editor.parent(editor, selection);
  const parentParentItem = Editor.parent(editor, parentItem[1]); // Get parent of depth 1.

  if (!parentItem || !parentParentItem) {
    return editor;
  }

  if (!parentParentItem[0] || !parentParentItem[0].type) {
    return editor;
  }

  const itemType = parentParentItem[0].type as string;

  if (itemType.indexOf('nested_list') !== -1) {
    let emptyLine = true;

    /**
     * Iterate over current node siblings and
     * make shure at least one of them has text in it.
     */
    parentItem[0].children.map((child: {text: string}) => {
      if (child.text === undefined) {
        emptyLine = false;
        return;
      }

      if (child.text.length > 0) {
        emptyLine = false;
      }
    });

    if (emptyLine) {
      event.preventDefault();
      if (itemType.indexOf('numbered') !== -1) {
        Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_numbered' });
      } else {
        Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_bulleted' });
        Transforms.wrapNodes(editor, {type: 'list_item_bulleted', children: [] });
        Transforms.unwrapNodes(editor, { split: true, match: n => n.type === 'nested_list_item_bulleted' });
      }
    }
  }
};

export const toggleMark = (mFormat: IRteFormat, editor: Editor) => {
  const isActive = isMarkActive(editor, mFormat);

  if (isActive) {
    Editor.removeMark(editor, mFormat);
  } else {
    Editor.addMark(editor, mFormat, true);
  }
};

export const selectHeading = (tSelection: Range, tActiveHeading: number, editor: Editor) => {
  if (tSelection) {
    const nodes = Editor.nodes(editor, {
      at: tSelection,
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && !!n.type,
    });
    const node = nodes.next().value;

    if (node) {
      const path = node[1];

      if (path.length > 0) {
        switch (tActiveHeading) {
          case 1: {
            return Transforms.setNodes(editor, { type: 'heading1', anchor: `h1[${path}]` }, { at: path });
          }
          case 2: {
            return Transforms.setNodes(editor, { type: 'heading2', anchor: `h2[${path}]` }, { at: path });
          }
          case 3: {
            return Transforms.setNodes(editor, { type: 'heading3', anchor: `h3[${path}]` }, { at: path });
          }
          default: deselectHeading(tSelection, editor);
        }
      }
    }
  }
};

export const deselectHeading = (selection: Range, editor: Editor) => {
  Transforms.setNodes(editor, { type: 'paragraph', anchor: '' }, { at: selection });
};
