import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
        return <li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
        </li>
    })

    // li Salad: 1 /li
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious order with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue the checkout?</p>
            <Button
                btnType='Danger'
                clicked={props.purchaseCancelled}>Cancel</Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;