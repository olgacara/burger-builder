import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }, isSignup: true
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /\S+@\S+\.\S+/i;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {

        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <Spinner />;
        if (!this.props.loading) {
            form = formElements.map(el => (
                <Input
                    key={el.id} changed={(event) => this.inputChangedHandler(event, el.id)}
                    elementType={el.config.elementType}
                    touched={el.config.touched}
                    shouldValidate={el.config.validation}
                    invalid={!el.config.valid}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value} />))
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.authRedirect) authRedirect = <Redirect to='/checkout' />;
        if (this.props.isAuth) authRedirect = <Redirect to={this.props.authRedirectPath} />;

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType='Danger'>Switch to {this.state.isSignup ? 'signing in' : 'signing up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, method) => dispatch(actions.auth(email, pass, method)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);