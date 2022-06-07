import cn from 'classnames';
import * as React from 'react';
import { StatelessComponent } from 'react';
import styles from './Icon.module.scss';

export interface IGlyph {
  content: string;
  id: string;
  node: any;
  viewBox: string;
}

export type TIconSize = 't' | 's' | 'm' | 'l' | 'b';

export interface IIconExternalProps {
  id?: string;
  /** Фукция обратного вызова срабатывает на клик по иконки */
  onClick?: (evt: React.MouseEvent) => void;
  /** Имя css класса */
  className?: string;
  /** Выбраное состояние */
  active?: boolean;
  /** Фукция обратного вызова срабатывает при уходе курсора с иконки */
  onMouseLeave?: () => void;
  /** Фукция обратного вызова срабатывает при наведении курсора на иконку */
  onMouseEnter?: () => void;
  /** Размер */
  size?: TIconSize;
  /** Включение состояния: Normal, Hover, Active  */
  hasState?: boolean;
  /** Задавать stroke вместо fill */
  stroke?: boolean;
  /** Индикатор проекта */
  hallon?: boolean | undefined;
  /** Позволяет заблокировать иконку */
  disabled?: boolean;

  /**
   * Варианты иконки с заполнением внутренней части (не прозрачный контур).
   * В директории положены отдельные .svg файлы для каждого варианта.
   */
  filled?: 'grey' | 'green';
}

export interface IIconProps extends IIconExternalProps {
  /** Иконка */
  glyph?: IGlyph;
}

const Icon: StatelessComponent<IIconProps> = (props) => {
  const {
    id,
    onMouseLeave,
    onMouseEnter,
    size,
    stroke,
    Image,
    onClick,
    hasState,
    active,
    className,
    disabled,
  } = props;

  return (
    <Image
      id={id}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={cn(
        styles.icon,
        styles[size],
        {
          [styles.state]: hasState,
          [styles.stroke]: stroke,
          [styles.clicked]: !!onClick,
          [styles.active]: active,
          [styles.disabled]: disabled,
        },
        className,
      )}
    />
  );
};

Icon.defaultProps = {
  size: 'm',
  hasState: false,
};

export default Icon;
