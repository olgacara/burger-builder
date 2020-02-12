import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const addIngredient = (state, action) => {
    const newIngredients = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, newIngredients);
    const updatedState = {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngredients
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const newIngredientsRemoval = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredientsRemoval = updateObject(state.ingredients, newIngredientsRemoval);
    const updatedStateRemoval = {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngredientsRemoval
    }
    return updateObject(state, updatedStateRemoval);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        totalPrice: 4,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action);

        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);

        case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action);

        case (actionTypes.FETCH_INGREDIENTS_FAILED): return updateObject(state, { error: true })

        default: return state;
    }
}

export default reducer;