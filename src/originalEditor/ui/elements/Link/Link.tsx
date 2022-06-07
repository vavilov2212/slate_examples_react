import cn from 'classnames';
import * as React from 'react';
import { ReactType, StatelessComponent } from 'react';
import styles from './Link.module.scss';

export interface ILinkProps {
  /**
   * Компонент, который будет использован вместо 'a'.
   * Может быть Link из react-router, 'button'
   * или другой интерактивный компонент-контейнер.
   */
  as?: ReactType;

  className?: string;

  onClick?: () => void;

  children: JSX.Element | string | React.ReactText[];

  href?: string;

  target?: string;

  rel?: string;
}

const Link: StatelessComponent<ILinkProps> = (props: any) => {
  const {
    as,
    className,
    children,
    ...otherProps
  } = props;

  const Component = as;

  return (
    <Component
      className={cn(
        styles.link,
        className
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

Link.defaultProps = {
  as: 'a',
};

export default Link;
