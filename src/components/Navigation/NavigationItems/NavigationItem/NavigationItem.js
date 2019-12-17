import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    return <li className={classes.NavigatinItem}>
        <a
            href={props.link}
            className={props.active ? classes.active : null}>{props.children}</a>
    </li>
}

export default navigationItem;