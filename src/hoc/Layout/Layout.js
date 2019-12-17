import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    sidedrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false });
    }

    sidedrawerOpenedHandler = () => {
        this.setState({ showSidedrawer: true });
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sidedrawerOpenedHandler} />
                <Sidedrawer
                    closed={this.sidedrawerClosedHandler}
                    open={this.state.showSidedrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }

}

export default Layout;