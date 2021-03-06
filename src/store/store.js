import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/user.reducer";
import { contentReducer } from "../reducers/content.reducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    user: userReducer,
    content: contentReducer
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
