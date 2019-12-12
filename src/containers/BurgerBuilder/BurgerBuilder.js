import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        purchasing: false,
        totalPrice: 4
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

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;