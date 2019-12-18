import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        purchasable: false,
        purchasing: false,
        totalPrice: 4,
        loading: false,
        errorState: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => ingredients[key]).reduce((sum, el) => sum + el, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        if (this.state.ingredients[type] > 0) {
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
            });
        }
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Olga',
                address: {
                    street: 'Teststreet',
                    zipCode: '820',
                    country: 'Denmark'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(res => {
            console.log(res);
            this.setState({ loading: false, purchasing: false });
        }).catch(err => {
            console.log(err);
            this.setState({ loading: false, purchasing: false });
        });
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        }).catch(err => {
            this.setState({ errorState: true });
        })
    }

    render() {

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }

        let burger = this.state.errorState ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelledHandler} />;
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} />
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

export default withErrorHandler(BurgerBuilder, axios);