import { combineReducers } from 'redux';
import * as actionTypes from "./actionTypes";
import { initialContactForm } from './allForm';
import { createForms } from 'react-redux-form';



const authInitialState = {
    token: null,
    userId: null,
    authLoading: false,
    authMessage: null
}

// reducer for authentication
const authReducer = (authState = authInitialState, action) => {
    switch (action.type) {
        //auth case   
        case actionTypes.AUTH_SUCCESS:
            //console.log(action.payload)
            return {
                ...authState,
                token: action.payload.token,
                userId: action.payload.userId,
                authLoading: false
            }
        case actionTypes.AUTH_LOGOUT:
            //console.log(action.payload)
            return {
                ...authState,
                token: null,
                userId: null,
            }
        case actionTypes.AUTH_LOADING:
            //console.log(action.payload)
            return {
                ...authState,
                authLoading: true,

            }
        case actionTypes.AUTH_FAILED:
            //console.log(action.payload)
            return {
                ...authState,
                authLoading: false,
                authMessage: action.payload

            }
        default:
            return authState
    }

}


// reducer for deafult dish menu
const dishReducer = (dishState = { isLoading: false, dishes: [], defaultOrders: [], orderLoading: true }, action) => {
    switch (action.type) {
        case actionTypes.DISHES_LOADING:
            return {
                ...dishState,
                isLoading: true,
                dishes: []
            }
        case actionTypes.LOAD_DISHES:
            //console.log(action.payload)
            const updateDish = [];
            for (const dishKey in action.payload) {
                //console.log(action.payload[dishKey])
                updateDish.push({
                    ...action.payload[dishKey],
                    id:dishKey
                })
                
            }
            //console.log(dish)
            return {
                ...dishState,
                isLoading: false,
                dishes: updateDish
            }
        case actionTypes.DEFAULT_ORDER:
            //console.log(action.payload);
            const defaultOrders = [];
            for (const orderKey in action.payload) {
                //console.log(action.payload[orderKey])
                defaultOrders.push({
                    ...action.payload[orderKey],
                    id: orderKey
                })
            }
            //console.log(defaultOrders)
            return {
                ...dishState,
                orderLoading: false,
                defaultOrders: defaultOrders
            }
        case actionTypes.ORDER_LOADING:
            return {
                ...dishState,
                isLoading: true
            }

        default:
            return dishState
    }

}

// reducer for cart functionality 

const cartReducer = (cartState = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let newCart = action.payload;
            const newcartItems = cartState.cartItems.concat(newCart)
            localStorage.setItem("cartItems", JSON.stringify(newcartItems))
            return {
                ...cartState,
                cartItems: newcartItems,
            }

        case actionTypes.FETCH_CART:
            let cartItems = action.payload;

            if (cartItems == null) {
                return cartState
            } else {
                return {
                    ...cartState,
                    cartItems: cartItems
                }
            }

        case actionTypes.DELETE_CART:
            //console.log(action.payload)
            const updatedcartItems = [...cartState.cartItems];
            updatedcartItems.splice(action.payload, 1);

            localStorage.setItem("cartItems", JSON.stringify(updatedcartItems))

            return {
                ...cartState,
                cartItems: updatedcartItems
            }
        case actionTypes.RESET_CART:
            let resetCartItems = cartState.cartItems
            resetCartItems = [];

            localStorage.setItem("cartItems", JSON.stringify(resetCartItems))
            return {
                ...cartState,
                cartItems: resetCartItems
            }
        default:
            return cartState
    }
}

//ruducer for dish comment funtionality 
const commentReducer = (commentState = { isLoading: true, comments: [] }, action) => {
    //console.log(action);
    switch (action.type) {
        case actionTypes.COMMENT_LOADING:
            return {
                ...commentState,
                isLoading: true,
                comments: []
            }
        case actionTypes.LOAD_COMMENT:
            const updatedComments = []
            for (const commentKey in action.payload) {
                //console.log(action.payload[commentKey])
                updatedComments.push({
                    ...action.payload[commentKey],
                    commentId: commentKey
                })
            }
            return {
                ...commentState,
                isLoading: false,
                comments: updatedComments
            }

        //since we use firebase db so we dont want to concat new comment beacuse redux state will auto update , thats why this code converted to comment, but now its doesn't work , so code are converted !
        case actionTypes.ADD_COMMENT:
            //new comment received in payload 
            let comment = action.payload
            //comment.id = commentState.length;
            //console.log(comment);
            return {
                ...commentState,
                comments: commentState.comments.concat(comment)
            }

        default:
            return commentState
    }
}



// reducer for custom burger builder

const initialState = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 }
    ],
    ingredientPrice: {
        salad: 20,
        cheese: 40,
        meat: 90
    },

    totalPrice: 80,
    purchasAble: false,

    orders: [],
    orderLoading: true,
    orderError: false,
}


const burgerbuildReducer = (buildState = initialState, action) => {
    const ingredients = [...buildState.ingredients]
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    item.amount++;
                }
            }
            return {
                ...buildState,
                ingredients: ingredients,
                totalPrice: buildState.totalPrice + buildState.ingredientPrice[action.payload]
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) {
                        return buildState;
                    } else {
                        item.amount--;
                    }
                }
            }
            return {
                ...buildState,
                ingredients: ingredients,
                totalPrice: buildState.totalPrice - buildState.ingredientPrice[action.payload]
            }
        case actionTypes.PURCHASABLE:
            //this will allow when at least one item are selected
            const sum = ingredients.reduce((sum, item) => {
                return sum + item.amount;
            }, 0)
            return {
                ...buildState,
                purchasAble: sum > 0

            }
        case actionTypes.RESET_INGREDIENT:
            return {
                ...buildState,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 }
                ],
                totalPrice: 80,
                purchasAble: false

            }
        case actionTypes.LOAD_ORDER:
            //console.log(action.payload)
            let orders = [];
            for (const orderKey in action.payload) {
                //console.log(action.payload[orderKey])
                orders.push({
                    ...action.payload[orderKey],
                    id: orderKey
                })
            }
            //console.log(orders)
            return {
                ...buildState,
                orders: orders,
                orderLoading: false
            }
        default:
            return buildState
    }

}


//reducer for admin add item functionality

const itemInitialState = {
    name: '',
    image: '',
    varients: [
        "small",
        "medium",
        "large"
    ],
    price: [
        {
            "small": 100,
            "medium": 200,
            "large": 400
        }
    ],
    label: '',
    description: ''
}

const adminReducer = ( adminState = itemInitialState,  action) => {
    //console.log(action);
    switch (action.type) {
        case actionTypes.ADD_DISH:
            let itemName = action.payload.name;
            //console.log(itemName)
            return {
                ...adminState,
                name: action.payload.name,
                label: action.payload.label,
                description: action.payload.description,

            }
        case actionTypes.ADD_VARIENT:
            //sorting in reverse order 
            let updateVarients = action.payload;
            // First sort the array
            updateVarients.sort();
            // Then reverse it:
            updateVarients.reverse();
            return {
                ...adminState,
                varients: action.payload

            }
        case actionTypes.ADD_PRICE:

            let updatePrice = action.payload;
            return {
                ...adminState,
                price: [updatePrice]

            }
        case actionTypes.ADD_IMAGE:
            let url = action.payload;
            return {
                ...adminState,
                image: url
            }
        case actionTypes.RESET_MENU:
            return {
                ...adminState,
                name: '',
                image: '',
                varients: [
                    "small",
                    "medium",
                    "large"
                ],
                price: [
                    {
                        "small": 100,
                        "medium": 200,
                        "large": 400
                    }
                ],
                label: '',
                description: ''
            }
        default:
            return adminState
    }
}


//reudcer for admin manage order functionality

// main reducer 
export const Reducer = combineReducers({
    dishes: dishReducer,
    comments: commentReducer,
    cartState: cartReducer,
    customBurger: burgerbuildReducer,
    authState: authReducer,
    adminState: adminReducer,
    ...createForms({
        formValue: initialContactForm
    })
})