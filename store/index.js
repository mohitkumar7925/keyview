import {createStore, combineReducers, applyMiddleware  } from 'redux';
import userReducer from './reducers/user_reducer';
import thunk from "redux-thunk";

const reducer=combineReducers({
    userReducer:userReducer,
  
   
})

const configureStore=()=>{
    return createStore(reducer,{},applyMiddleware(thunk));
}
export default configureStore;
