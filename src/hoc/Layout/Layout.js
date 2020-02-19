import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import { connect } from 'react-redux';
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
                <Toolbar isAuth={this.props.isAuthenticated} clicked={this.sidedrawerOpenedHandler} />
                <Sidedrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sidedrawerClosedHandler}
                    open={this.state.showSidedrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);