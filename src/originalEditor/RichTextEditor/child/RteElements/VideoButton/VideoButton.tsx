import React, { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import markIcons from '../../icons';

import style from './VideoButton.module.scss';

interface IRteVideoButtonProps {
  theme?: string;
}

const RteVideoButton = (props: IRteVideoButtonProps) => {
  const { theme } = props;

  /* Current selection (editor.selection) */
  const [stateSelection, setStateSelection] = useState<Editor['selection']>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLinkInputFocused, setIsLinkInputFocused] = useState(false);
  const [videoUrlValue, setVideoUrlValue] = useState('');

  const videoInput = useRef<HTMLInputElement>();
  const videoInputWrapper = useRef<HTMLDivElement>();

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      e.stopPropagation();
      const targetClass = (e.target as Element).className;

      if (targetClass && typeof(targetClass) === 'string' && targetClass.indexOf('video') === -1) {
        setIsOpen(false);
        setVideoUrlValue('');
      }
      return e;
    };

    document.addEventListener('click', outSideClick);

    return () => document.removeEventListener('click', outSideClick);
  }, []);

  const withVideo = (vEditor: Editor): Editor => {
    const { isVoid } = vEditor;

    vEditor.isVoid = element => {
      return element.type === 'video' ? true : isVoid(element);
    };

    return vEditor;
  };

  const editor = withVideo(useSlate());

  const toggleShowVideoInput = (show: boolean) => {
    if (show) {
      if (videoInputWrapper && videoInputWrapper.current) {
        videoInputWrapper.current.style.display = 'flex';
      }
    } else {
      if (videoInputWrapper && videoInputWrapper.current) {
        videoInputWrapper.current.style.display = 'none';
      }
    }
  };

  const insertVideo = () => {
    if (videoUrlValue.length) {
      const videoBlock = [
        { type: 'video', url: videoUrlValue, children: [{text: ''}] },
        { type: 'paragraph', children: [{ text: '' }] },
      ];

      Transforms.insertNodes(editor, videoBlock, { at: stateSelection });
    }
  };

  const removeVideo = () => {
    Transforms.removeNodes(editor, {
      match: n => {
        return !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'video';
      },
    });
    setVideoUrlValue('');
    videoInput.current.blur();
  };

  const isVideoActive = () => {
    const nodes = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'video',
    });

    const video = nodes.next().value;

    if (video) {
      const [node] = video;

      if (node) {
        toggleShowVideoInput(true);
        const { url } = node as {[key: string]: string};

        if (url && url.length > 0 && videoUrlValue.length === 0) {
          setVideoUrlValue(url);
        }

        return true;
      }
    } else {
      if (!isLinkInputFocused) {
        toggleShowVideoInput(false);
      }

      return false;
    }
  };

  const TableCheckIcon = markIcons.table_check;
  const VideoIcon = markIcons.video;

  return (
    <div className={style.videoButtonWrapper}>
      <div
        className={cn(style.videoInputWrapper, {[style.active]: isOpen})}
        ref={el => {
          videoInputWrapper.current = el;
          if (videoInput.current) {
            videoInput.current.onfocus = () => {
              setIsLinkInputFocused(true);
            };

            videoInput.current.onblur = () => setIsLinkInputFocused(false);
          }
        }}
      >
        <input
          ref={el => videoInput.current = el }
          value={videoUrlValue}
          onChange={event => {
            setVideoUrlValue((event.target as HTMLInputElement).value);
          }}
          className={cn(style.videoFloatingControl, theme)}
        />
        <TableCheckIcon
          className={style.videoApply}
          onClick={() => {
            setIsOpen(false);
            insertVideo();
          }}
        />
      </div>

      <div
        onMouseDown={(event: React.MouseEvent) => {
          event.preventDefault();
          if (isVideoActive()) {
            removeVideo();
            setIsOpen(false);
          } else {
            setStateSelection(editor.selection);
            setIsOpen(true);
          }
        }}
      >
        <VideoIcon
          className={cn(
            style.videoButton,
            {
              [style.active]: isVideoActive(),
              [style.disabled]: isLinkInputFocused,
            },
            theme
          )}
        />
      </div>
    </div>
  );

};

export default RteVideoButton;
