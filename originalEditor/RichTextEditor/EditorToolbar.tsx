import React from 'react';
import cn from 'classnames';
import RteControls from './child/RteControls';
import { IRteFormat } from './child/interfaces/general';

import style from './EditorStyle.module.scss';

const MARK_FORMATS: Array<Partial<IRteFormat>> = ['bold', 'italic', 'underline'];
const BLOCK_FORMATS: Array<Partial<IRteFormat>> = ['list_numbered', 'list_bulleted'];

interface IRteToolbarProps {
  controls?: Array<Partial<IRteFormat>>;
  className?: string;
  theme?: string;
  children?: JSX.Element;
  imageCallback?: (image: File) => void;
  imageUrl?: string;
}

const RteToolbar: (props: IRteToolbarProps) => JSX.Element = (props: IRteToolbarProps) => {
  const {
    controls,
    className,
    theme,
    children: toolbarExtra,
    imageCallback,
    imageUrl,
  } = props;

  const mFormats = controls ? controls.filter(c => MARK_FORMATS.find(m => m === c )) : MARK_FORMATS;
  const bFormats = controls ? controls.filter(c => BLOCK_FORMATS.find(b => b === c )) : BLOCK_FORMATS;
  const lFormat = controls ? controls.filter(c => c === 'link') : 'link';
  const hFormat = controls ? controls.filter(c => c === 'heading') : 'heading';
  const qFormat = controls ? controls.filter(c => c === 'block_quote') : 'block_quote';
  const tFormat = controls ? controls.filter(c => c === 'table') : 'table';
  const iFormat = controls ? controls.filter(c => c === 'image') : 'image';
  const vFormat = controls ? controls.filter(c => c === 'video') : 'video';

  console.log('mFormats', mFormats)

  return (
    <div className={cn(style.rteToolbar, className, theme)}>
      {(mFormats && mFormats.length) && mFormats.map((format: IRteFormat, index: number) =>
        <RteControls.MarkButton key={index} format={format}/>
      )}
      {(bFormats && bFormats.length) && bFormats.map((format: IRteFormat, index: number) =>
        <RteControls.BlockButton key={index} format={format}/>
      )}
      {(lFormat && lFormat.length) ? <RteControls.LinkButton/> : null}
      {(qFormat && qFormat.length) ? <RteControls.QuoteButton/> : null}
      {(tFormat && tFormat.length) ? <RteControls.TableButton/> : null}
      {(hFormat && hFormat.length) ? <RteControls.HeadingButton/> : null}
      {(iFormat && iFormat.length) ? <RteControls.ImageButton imageUrl={imageUrl} imageCallback={imageCallback}/> : null}
      {(vFormat && vFormat.length) ? <RteControls.VideoButton/> : null}
      <div className={style.extra}>
        {toolbarExtra}
      </div>
    </div>
  );

};

export default RteToolbar;
