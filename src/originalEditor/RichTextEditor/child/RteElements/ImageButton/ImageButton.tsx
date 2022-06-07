import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms, Element as SlateElement } from 'slate';
import markIcons from '../../icons';
import withImages from './withImages';

import style from './ImageButton.module.scss';

interface IRteImageButtonProps {
  theme?: string;
  imageCallback?: (image: File) => void;
  imageUrl?: string;
}

export interface IImageState {
  loading: boolean;
  image: File;
  fileName: string;
  index: number;
}

const RteImageButton = (props: IRteImageButtonProps) => {
  const { theme, imageCallback, imageUrl } = props;

  const [stateSelection, setStateSelection] = useState<Range>();

  let imageInputCallback: any;
  const setImageInputCallback = (element: any) => {
    imageInputCallback = element;
  };

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      insertImage();
    }
  }, [, imageUrl]);

  const editor = withImages(useSlate());

  const onSaveImage = (event: any) => {
    const pImage: File = event.target.files[0];

    imageCallback(pImage);
  };

  const insertImage = () => {
    if (imageUrl && imageUrl.length > 0) {
      const imageBlock: any = [
        { type: 'image', image: imageUrl, children: [{ text: '' }] },
        { type: 'paragraph', children: [{ text: '' }] },
      ];

      Transforms.insertNodes(editor, imageBlock, { at: stateSelection });
    }
  };

  const isBlockActive = (): boolean => {
    const nodes = Editor.nodes(editor, {
      match: n => {
        return !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'image';
      },
    });

    return !!nodes.next().value;
  };

  const ImageIcon = markIcons.image;

  return (
    <div className={style.rteImageButtonWrapper}>
      <input
        id={'image_input_id'}
        ref={setImageInputCallback}
        name={'image_input'}
        className={style.inputImage}
        type={'file'}
        accept={'image/*'}
        onChange={onSaveImage}
      />
      <div
        onMouseDown={event => {
          setStateSelection(editor.selection);
          imageInputCallback.click();
        }}
      >
        <ImageIcon
          className={cn(
            style.rteImageBlockButton,
            {
              [style.active]: isBlockActive(),
            },
            theme
          )}
        />
      </div>
    </div>

  );
};

export default RteImageButton;
