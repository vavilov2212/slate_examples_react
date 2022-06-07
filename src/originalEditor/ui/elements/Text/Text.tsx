import cn from 'classnames';
import * as React from 'react';
import {PureComponent, ReactNode, ReactType, SyntheticEvent} from 'react';
import styles from './Text.module.scss';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h4dot5'
  | 'h5'
  | 'h6'
  | 'text-normal'
  | 'text-small'
  | 'subtitle-normal'
  | 'subtitle-small'
  | 'btn-text-small'
  | 'caption1'
  | 'caption2'
  | 'caption3'
  | 'caption4'
  | 'table-header'
  | 'table-cell'
  | 'exchange-h1'
  | 'exchange-h3'
  | 'exchange-h4'
  | 'exchange-normal'
  | 'exchange-small'
  | 'exchange-tab-header'
  | 'exchange-big-tab-header'
  | 'exchange-table-header'
  | 'exchange-table-cell-header'
  | 'exchange-table-cell'
  | 'exchange-button'
  | 'exchange-input'
  | 'exchange-instruments-price';

export type TextColorVariant =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'buy'
  | 'sell'
  | 'wait'
  | 'stable'
  | 'exchange-buy'
  | 'exchange-sell'
  | 'white'
  | 'brand'
  | 'error'
  | 'reverse'
  | 'link'
  | 'swap';

export interface ITextProps {
  /** Тип начертания */
  variant?: TextVariant;

  /** Если равно true, все буквы будут заглавными */
  upperCase?: boolean;

  /** Используемый html тег для контейнера */
  tag?: string;

  /** Устанавливает насыщенность шрифта. */
  weight?: 'light' | 'normal' | 'medium';

  /** Тип цвета */
  colorVariant?: TextColorVariant;

  /** Шрифт текста */
  font?: 'primary' | 'secondary';

  /** Имя класса */
  className?: string;

  onClick?: (event: SyntheticEvent) => void;

  children: ReactType | ReactNode;

  align?: 'left' | 'right' | 'center';

  id?: string;
}

class Text extends PureComponent<ITextProps> {
  static defaultProps: Partial<ITextProps> = {
    upperCase: false,
    colorVariant: 'primary',
  };

  element: string;

  componentWillMount() {
    this.element = this.getElement();
  }

  render() {
    const {
      colorVariant,
      upperCase,
      children,
      variant,
      onClick,
      weight,
      className,
      theme,
      align,
      font,
      id,
    } = this.props;
    const Element = this.element as keyof JSX.IntrinsicElements;

    return (
      <Element
        onClick={onClick}
        id={id}
        className={cn(styles[variant], styles[colorVariant], className, theme, {
          [styles[`font-${font}`]]: font,
          [styles.uppercase]: upperCase,
          [styles[`${weight}Weight`]]: weight,
          [styles.clicked]: onClick,
          [styles[`align-${align}`]]: align,
        })}
      >
        {children}
      </Element>
    );
  }

  getElement(): any {
    const { variant, tag } = this.props;

    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return tag || variant;
    }

    if (tag) {
      return tag;
    }

    return 'div'; // используем div посколько у p неможет быть потомков div
  }
}

export default Text;
