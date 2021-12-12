import * as actionTypes from './actionTypes';
import axios from 'axios';

import { getDatabase, ref, set, push, child, onValue, get } from "firebase/database";



//base url
export const baseUrl = "http://localhost:3001/";

// action for dishes
const loadDishes = dishes => {
    return {
        type: actionTypes.LOAD_DISHES,
        payload: dishes
    }

}

// Another Use of same return function Using () , to create a another dispatch action
const dishesLoading = () => ({
    type: actionTypes.DISHES_LOADING,
})


// Using Thunk Middleware to pass a multiple dispatch funtion inside an dispatch action 
export const fetchDishes = () => {
    return dispatch => {
        dispatch(dishesLoading());
        //fetch for menu
        axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/menus.json`)
            .then(response => response.data)
            .then(dishes => dispatch(loadDishes(dishes)))
            .catch(error => {
                console.log(error.message)
            })
    }
}


// action for comment

const loadComment = comments => {
    return {
        type: actionTypes.LOAD_COMMENT,
        payload: comments
    }
}
const commentLoading = () => {
    return {
        type: actionTypes.COMMENT_LOADING
    }
}

export const fetchComments = () => dispatch => {
    dispatch(commentLoading());
    const db = getDatabase();

    const commentsPath = ref(db, 'comments/');

    return onValue(commentsPath, (snapshot) => {
        const data = snapshot.val();
        //console.log(data)
        dispatch(loadComment(data))
    }, {
        onlyOnce: true
    });

    //another metheod is get()
    // get(commentsPath).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         const data = snapshot.val();
    //         //console.log(snapshot.val());
    //         dispatch(loadComment(data))

    //     } else {
    //         console.log("No data available");
    //     }
    // }).catch((error) => {
    //     console.error(error);
    // })
}


const commentConcat = comment => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const addComment = (dishId, author, rating, comment) => dispatch => {
    const db = getDatabase();

    const newComment = {
        dishId: dishId,
        author: author,
        rating: rating,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    //generate a new key for one object data
    const commentKey = push(child(ref(db), 'comments')).key;
    //comment path
    const newCommentPath = ref(db, 'comments/' + commentKey);
    set(newCommentPath, newComment)
        .then(() => {
            // Data saved successfully!
            console.log('data saved succesfully')
            dispatch(commentConcat(newComment));
        })
        .catch((error) => {
            // The write failed...
            console.log(error)
        });
}

//action for default menu order

const cartConcat = cartItem => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: cartItem
    }
}


export const addToCart = (dishItem, quantity, varient, price) => dispatch => {
    const newCart = {
        dishItem: dishItem,
        quantity: quantity,
        varient: varient,
        price: price
    }
    newCart.userId = localStorage.getItem('userId')
    //console.log(newCart)
    dispatch(cartConcat(newCart));
}



export const deleteCart = (index) => {
    return {
        type: actionTypes.DELETE_CART,
        payload: index
    }
}

export const resetCart = () => {
    return {
        type: actionTypes.RESET_CART
    }
}



// dispatch from authcheck file from autoActionCreators folder 
export const fetchCart = cartItems => {
    return {
        type: actionTypes.FETCH_CART,
        payload: cartItems
    }
}

// dispatch from fetchOrder functoin from this folder 
// its also dispatch from admin actioncreator with fetch all order
export const defaultOrder = (orders) => {
    return {
        type: actionTypes.DEFAULT_ORDER,
        payload: orders
    }
}






//action for custom burger builder

export const addIngredient = ingredientType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: ingredientType
    }
}
export const removeIngredient = ingredientType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: ingredientType
    }
}
export const updatePurchasable = () => {
    return {
        type: actionTypes.PURCHASABLE
    }
}
export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT
    }
}

//action for fetch order default and custom burger
// its also dispatch from admin actioncreator with fetch all order
export const loadOrder = orders => {
    return {
        type: actionTypes.LOAD_ORDER,
        payload: orders
    }
}
const orderLoading = () => {
    return {
        type: actionTypes.ORDER_LOADING,
    }
}
const loadFaild = () => {
    return {
        type: actionTypes.LOAD_FAILD,
    }
}

export const fetchOrder = (token, userId) => dispatch => {
    const queryParams = ' &orderBy="userId"&equalTo="' + userId + '" ';

    //with authentication url , you have to pass token , right now its removed because admin has no authentication 
    //axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/customorders.json?auth=` + token + queryParams)
    //fetch for custom burger
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/customorders.json?`  + queryParams)
        .then(response => {
            //console.log(response)
            dispatch(loadOrder(response.data));
        })
        .catch(error => {
            console.log(error.message)
        })
    //fetch for default burger
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/orders.json?` + token + queryParams)
        .then(response => {
            //console.log(response)
            dispatch(defaultOrder(response.data));
        })
        .catch(error => {
            console.log(error.message)
        })

}
