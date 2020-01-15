import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        errorState: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => ingredients[key]).reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');

    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(res => {
        //     if (this.state.ingredients !== res.data) {
        //         let newTotalPrice = this.state.totalPrice + Object.keys(res.data).map((key) => {
        //             return INGREDIENT_PRICES[key] * res.data[key];
        //         }).reduce((el, cur) => {
        //             return cur + el;
        //         });
        //         this.setState({ ingredients: res.data, totalPrice: newTotalPrice });
        //         this.updatePurchaseState(res.data);
        //     }
        // }).catch(err => {
        //     this.setState({ errorState: true });
        // })
    }

    render() {

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }

        let burger = this.state.errorState ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelledHandler} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchase={this.purchaseHandler}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} />
                </Aux>);
        }


        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ing}),
        onIngredientRemoved: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ing})
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));