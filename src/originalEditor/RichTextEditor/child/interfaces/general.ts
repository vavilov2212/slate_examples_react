import { Element } from 'slate';

export type IRteFormat =
  'bold'
  | 'italic'
  | 'underline'
  | 'sup'
  | 'sub'
  | 'link'
  | 'list_numbered'
  | 'list_bulleted'
  | 'heading'
  | 'block_quote'
  | 'table'
  | 'image'
  | 'video'
  | 'regular'
;

export interface IRteElementProps {
  children?: JSX.Element;
  attributes?: any;
  element?: Element;
  leaf?: any;
}
