import * as actionTypes from './actionTypes';
import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase/config';

import { fetchCart } from './actionCreators';


const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }

    }
}

export const authLoading = () => {
    return {
        type: actionTypes.AUTH_LOADING,
        //payload:isLoading
    }
}

export const authFailed = errorMessage => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errorMessage
    }
}


export const authAction = (email, password, mode) => dispatch => {

    //call authLoading 
    dispatch(authLoading())

    if (mode === 'signup') {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential)
                const userInfo = userCredential._tokenResponse;
                //console.log(userInfo)
                //set token into localStorage 
                localStorage.setItem('token', userInfo.idToken);
                localStorage.setItem('userId', userInfo.localId);
                const expirationTime = new Date(new Date().getTime() + userInfo.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime);
                //dispatch action
                dispatch(authSuccess(userInfo.idToken, userInfo.localId))
            })
            .catch((error) => {
                //console.log(error)
                dispatch(authFailed(error.message))
            });
    } else if (mode === 'login') {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                //console.log(userCredential)
                const userInfo = userCredential._tokenResponse;
                //console.log(userInfo)
                //set token into localStorage 
                localStorage.setItem('token', userInfo.idToken);
                localStorage.setItem('userId', userInfo.localId);
                const expirationTime = new Date(new Date().getTime() + userInfo.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime);
                //dispatch action
                dispatch(authSuccess(userInfo.idToken, userInfo.localId))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
                dispatch(authFailed(error.message))
            });
    }

}


export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }

}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
        //logout
        dispatch(logOut())
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            //logout 
            dispatch(logOut())
        } else {
            //login
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId));
            //cart check and dispatch to authaction creators 
            const cartItems = JSON.parse(localStorage.getItem("cartItems"))
            dispatch(fetchCart(cartItems))
        }
    }
}


