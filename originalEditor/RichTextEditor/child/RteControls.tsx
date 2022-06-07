import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { manageProtocol } from './helper';
import { Link } from '../../../ui/elements/Link';
import { serialize, BlockQuote, ItemWrapper, TextWrapper, Table, TableRow, TableCell, Image, Video } from './StyledNodes';
import RteBlockButton from './RteElements/BlockButton/BlockButton';
import RteMarkButton from './RteElements/MarkButton/MarkButton';
import RteLinkButton from './RteElements/LinkButton/LinkButton';
import RteHeadingButton from './RteElements/HeadingButton/HeadingButton';
import RteVideoButton from './RteElements/VideoButton/VideoButton';
import RteQuoteButton from './RteElements/QuoteButton/QuoteButton';
import RteTableButton from './RteElements/TableButton/TableButton';
import RteImageButton from './RteElements/ImageButton/ImageButton';
import { IRteElementProps } from './interfaces/general';

import style from './RteControls.module.scss';

const RteElement = ({ attributes, children, element }: IRteElementProps | RenderElementProps) => {
  switch (element.type) {
    case 'image':
      return (
        <Image element={element}>{children}</Image>
      );
    case 'table':
      return (
        <Table>{children}</Table>
      );
    case 'table_row':
      return (
        <TableRow>{children}</TableRow>
      );
    case 'table_cell':
      return (
        <TableCell>{children}</TableCell>
      );
    case 'block_quote':
      return (
        <BlockQuote>{children}</BlockQuote>
      );
    case 'list_numbered':
      return (
        <ol {...attributes} className={style.list_numbered}>
          {children}
        </ol>
      );
    case 'nested_list_numbered':
      return (
        <ul {...attributes} className={style.nested_list_numbered}>
          {children}
        </ul>
      );
    case 'list_bulleted':
      return (
        <ul {...attributes} className={style.list_bulleted} >
          {children}
        </ul>
      );
    case 'nested_list_bulleted':
      return (
        <ol {...attributes} className={style.nested_list_bulleted}>
          {children}
        </ol>
      );
    case 'list_item_numbered':
      return (
        <li {...attributes} className={style.list_item_numbered} >
          <div className={style.listItemWrapper}>
            <ItemWrapper>{children}</ItemWrapper>
          </div>
        </li>
      );
    case 'list_item_bulleted':
      return (
        <li {...attributes} className={style.list_item_bulleted} >
          <div className={style.listItemWrapper}>
            <ItemWrapper>{children}</ItemWrapper>
          </div>
        </li>
      );
    case 'nested_list_item_bulleted':
      return (
        <li {...attributes} className={style.nested_list_item_bulleted} >
          <div className={style.listItemWrapper}>
            <ItemWrapper>{children}</ItemWrapper>
          </div>
        </li>
      );
    case 'heading1':
      return (
        <ItemWrapper className={style.editHeading1}>
          {children}
        </ItemWrapper>
      );
    case 'heading2':
      return (
        <ItemWrapper className={style.editHeading2}>
          {children}
        </ItemWrapper>
      );
    case 'heading3':
      return (
        <ItemWrapper className={style.editHeading3}>
          {children}
        </ItemWrapper>
      );
    case 'video':
      return (
        <Video element={element}>{children}</Video>
      );
    case 'link':
      const href = manageProtocol(element.url as string);

      return (
        <Link
          className={style.link}
          rel={'nofollow noopener'}
          target={'_blank'}
          href={href}
          {...attributes}
        >
          {children}
        </Link>
      );
    default: {
      return <TextWrapper className={style.leafText} {...attributes}>{children}</TextWrapper>;
    }
  }
};

const RteLeaf = ({ attributes, children, leaf }: IRteElementProps | RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }
  if (leaf.sup) {
    children = <sup {...attributes}>{children}</sup>;
  }
  if (leaf.sub) {
    children = <sub {...attributes}>{children}</sub>;
  }
  if (leaf.code) {
    children = <code {...attributes}>{children}</code>;
  }
  if (leaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }
  if (leaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }
  if (leaf.link) {
    const { url } = leaf.link;
    const href = manageProtocol(url);

    children = (
      <Link
        className={style.link}
        rel={'nofollow noopener'}
        target={'_blank'}
        href={href}
        {...attributes}
      >
        {children}
      </Link>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const RteControls = {
  BlockButton: RteBlockButton,
  MarkButton: RteMarkButton,
  LinkButton: RteLinkButton,
  HeadingButton: RteHeadingButton,
  VideoButton: RteVideoButton,
  QuoteButton: RteQuoteButton,
  TableButton: RteTableButton,
  ImageButton: RteImageButton,
  Element: RteElement,
  Leaf: RteLeaf,
  serialize: serialize,
};

/*
 * Example of data structure
 *
  const editor = {
    children: [
      {
        type: 'paragraph',
        children: [
          { text: 'An opening paragraph with a ' },
          {
            type: 'link',
            url: 'https://example.com',
            children: [{ text: 'link' }],
          },
          { text: ' in it.' },
        ],
      },
      {
        type: 'quote',
        children: [{ text: 'A wise quote.' }],
      },
      {
        type: 'paragraph',
        children: [{ text: 'A closing paragraph!' }],
      },
    ],
  };
*/

export default RteControls;
