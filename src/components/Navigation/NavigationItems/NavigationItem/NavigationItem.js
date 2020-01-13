import React from 'react';

import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    // return <li className={classes.NavigatinItem}>
    //     <a
    //         href={props.link}
    //         className={props.active ? classes.active : null}>{props.children}</a>
    // </li>
    return (
        <li className={classes.NavigatinItem}>
            <NavLink exact to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    )
}

export default navigationItem;