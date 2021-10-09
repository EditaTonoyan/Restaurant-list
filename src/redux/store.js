import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const reduser = combineReducers({});

const store = createStore(reduser, applyMiddleware(thunk));

export default store;
