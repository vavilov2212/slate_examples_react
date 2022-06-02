import React from 'react';
import cn from 'classnames';
import LinkIcon from './link.svg';

import styles from './SlateToolbar.module.scss';

const LinkButton = (props: any) => {

  return (
    <div className={styles.linkButtonWrapper}>
      <div onMouseDown={() => { }}>
        <LinkIcon
          className={cn(
            styles.linkButton,
            /* { */
            /*   [styles.active]: isLinkActive(editor), */
            /*   [styles.disabled]: isLinkInputFocused, */
            /* }, */
          )}
        />
      </div>
    </div>
  );
}

export default LinkButton;
