import React from 'react';
import cn from 'classnames';
import markIcons from './icons';
import { Icon } from '../../../ui/elements/Icon';
import { Link as ExLink } from '../../../ui/elements/Link';
import { Text as ExText, TextVariant } from '../../../ui/elements/Text';
import { manageProtocol } from './helper';
import { Text, Node, Element } from 'slate';

import style from './RteControls.module.scss';

const serializeChildren = (node: Node, className?: string) => {
  if (Text.isText(node)) {
    if (node.text.length > 0) {

      let children: any = node.text;
      if (node.bold) {
        children = <strong>{children}</strong>;
      }
      if (node.code) {
        children = <code>{children}</code>;
      }
      if (node.italic) {
        children = <em>{children}</em>;
      }
      if (node.underline) {
        children = <u>{children}</u>;
      }
      if (node.sup) {
        children = <sup>{children}</sup>;
      }
      if (node.sub) {
        children = <sub>{children}</sub>;
      }
      if (node.link) {
        const { url } = node.link as {[key: string]: string};
        const href = manageProtocol(url);

        children = (
          <ExLink
            className={style.link}
            rel={'nofollow noopener'}
            target={'_blank'}
            href={href}
          >
            {children}
          </ExLink>
        );
      }

      return <SpanWrapper className={className}>{children}</SpanWrapper>; // inline element
    } else {
      return <TextWrapper className={style.leafText}>&nbsp;</TextWrapper>; // block element
    }
  }

  if (!node.children) {
    return node;
  }

  node.children.map(n => {
    return serializeChildren(n);
  });

};

export const serialize: any = (node: Node) => {
  if (Text.isText(node)) {
    return node;
  }

  if (!node.children) {
    return node;
  }

  const children = node.children.map((n: Element) => serialize(n));

  switch (node.type) {
    case 'image': {
      return (
        <Image element={node}>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </Image>
      );
    }
    case 'video': {
      return (
        <Video element={node}>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </Video>
      );
    }
    case 'table':
      return (
        <Table>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </Table>
      );
    case 'table_row':
      return (
        <TableRow>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </TableRow>
      );
    case 'table_cell':
      return (
        <TableCell>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </TableCell>
      );
    case 'block_quote':
      return (
        <BlockQuote>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </BlockQuote>
      );
    case 'list_item_numbered': {
      const ItemNumbered = (props: any) => {
        return (
          <li className={cn(style.list_item_numbered)}>
            <div className={style.listItemWrapper}>
              {children && children.map((child, i) => <ItemWrapper key={i}>{child}</ItemWrapper>)}
            </div>
          </li>
        );
      };

      return <ItemNumbered/>;
    }
    case 'list_item_bulleted': {
      const ItemBulleted = (props: any) => {
        return (
          <li className={cn(style.list_item_bulleted)}>
            <div className={style.listItemWrapper}>
              {children && children.map((child, i) => <ItemWrapper key={i}>{child}</ItemWrapper>)}
            </div>
          </li>
        );
      };

      return <ItemBulleted/>;
    }
    case 'list_numbered': {
      return (
        <ol className={style.list_numbered}>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </ol>
      );
    }
    case 'nested_list_numbered':
      return (
        <ul className={style.nested_list_numbered}>
          {children}
        </ul>
      );
    case 'list_bulleted': {
      return (
        <ul className={style.list_bulleted}>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </ul>
      );
    }
    case 'nested_list_bulleted':
      return (
        <ol className={style.nested_list_bulleted}>
          {children}
        </ol>
      );
    case 'nested_list_item_bulleted':
      return (
        <li className={style.nested_list_item_bulleted} >
          <div className={style.listItemWrapper}>
            {children && children.map((child, i) => <ItemWrapper key={i}>{child}</ItemWrapper>)}
          </div>
        </li>
      );
    case 'paragraph':
     return (
        <div>
          {children && children.map((child, i) => <React.Fragment key={i}>{serializeChildren(child)}</React.Fragment>)}
        </div>
      );
    case 'link': return (
      <>
        {children && children.map((child, i) => child.text.length > 0 && <Link key={i} url={node.url}>{child}</Link>)}
      </>
    );
    case 'heading1': {
      return (
        <div style={{ marginBottom: '32px' }} id={node.anchor as string}>
          {children && children.map((child: Node, i: number) =>
            <React.Fragment key={i}>{serializeChildren(child, style.heading1)}</React.Fragment>
          )}
        </div>
    );
    }
    case 'heading2': {
      return (
        <div style={{ marginBottom: '32px' }} id={node.anchor as string}>
          {children && children.map((child: Node, i: number) =>
            <React.Fragment key={i}>{serializeChildren(child, style.heading2)}</React.Fragment>
          )}
        </div>
    );
    }
    case 'heading3': {
      return (
        <div style={{ marginBottom: '32px' }} id={node.anchor as string}>
          {children && children.map((child: Node, i: number) =>
            <React.Fragment key={i}>{serializeChildren(child, style.heading3)}</React.Fragment>
          )}
        </div>
    );
    }
    default: return children;
  }
};

interface ITextWrapperProps {
  children?: React.ReactType | React.ReactNode;
  className?: string;
  textVariant?: TextVariant;
}

export const TextWrapper = ({ children, className, textVariant }: ITextWrapperProps) => {
  const variant = textVariant || 'text-normal';

  return <ExText variant={variant} className={className}>{children}</ExText>;
};

interface ISpanWrapperProps {
  children?: React.ReactType | React.ReactNode;
  className?: string;
}

export const SpanWrapper = ({ children, className }: ISpanWrapperProps) => {
  return (
    <span
      className={
        cn(
          style.defaultText,
          style.serializeParagraphWrapper,
          className,
        )
      }
    >
      {children}
    </span>
  );
};

interface IItemWrapperProps {
  children?: Node;
  className?: string;
}

export const ItemWrapper = ({ children, className }: IItemWrapperProps) => {
  return (
    <TextWrapper
      className={cn(
        {
          [style.bold]: children.bold,
          [style.italic]: children.italic,
          [style.underline]: children.underline,
          [style.sub]: children.sub,
          [style.sup]: children.sup,
        },
        style.paragraphWrapper,
        className
      )}
    >
      {serializeChildren(children)}
    </TextWrapper>
  );
};

export const Link = ({ url, children }: any) => {
  const href = manageProtocol(url);

  return (
      <ExLink
        className={cn(
          {
            [style.bold]: children.bold,
            [style.italic]: children.italic,
            [style.underline]: children.underline,
            [style.sub]: children.sub,
            [style.sup]: children.sup,
          },
          style.link,
          style.serializeParagraphWrapper
        )}
        rel={'nofollow noopener'}
        target={'_blank'}
        href={href}
      >
        {children.text}
      </ExLink>
  );
};

export const Paragraph = ({ children, className }: any) => {
  return (
    <TextWrapper
      className={cn(
        {
          [style.bold]: children.bold,
          [style.italic]: children.italic,
          [style.underline]: children.underline,
          [style.sub]: children.sub,
          [style.sup]: children.sup,
        },
        style.paragraphWrapper,
        className
      )}
    >
      {children.text}
    </TextWrapper>
  );
};

export const BlockQuote = (({ children, className }: any) => {
  return (
    <div className={cn(style.blockQuote, className)}>
      <Icon glyph={markIcons.block_quote} className={style.quoteIcon}/>
      <blockquote>{children}</blockquote>
      <Icon glyph={markIcons.block_quote} className={style.quoteIcon}/>
    </div>
  );
});

export const Table = (({ children, className }: any) => {
  return (
    <table className={style.rteTable}>
      <tbody>{children}</tbody>
    </table>
  );
});

export const TableRow = (({ children, className }: any) => {
  return <tr className={style.rteTr}>{children}</tr>;
});

export const TableCell = (({ children, className }: any) => {
  return <td className={style.rteCell}>{children}</td>;
});

export const Image = (({ children, element, className }: any) => {
  const { image } = element;

  return (
    <div>
      <div contentEditable={false}>
        <img
          src={image}
          className={style.image}
        />
      </div>
        {children}
    </div>
  );
});

export const Video = (({ children, element, className }: any) => {
  const { url } = element;

  return (
    <div>
      <div contentEditable={false}>
        <iframe
          width="765"
          height="430"
          src={url}
          frameBorder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      </div>
      {children}
    </div>
  );
});
