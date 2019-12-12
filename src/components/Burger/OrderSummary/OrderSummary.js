import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
            <p>Continue the checkout?</p>
        </Aux>
    )
}

export default orderSummary;