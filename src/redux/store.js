import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import mapReducer from "redux/reducers/mapReducer";
import restourantListReduce from "redux/reducers/RestourantListReducer";

const reduser = combineReducers({
  mapState: mapReducer,
  listState: restourantListReduce,
});

const store = createStore(reduser, applyMiddleware(thunk));

export default store;
