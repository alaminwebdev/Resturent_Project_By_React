import { createStore , applyMiddleware } from "redux";
import { Reducer } from "./Reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";


//create a store and pass a parameter as a reducer function 
const myStore = createStore(Reducer, applyMiddleware(logger, thunk));

export default myStore;