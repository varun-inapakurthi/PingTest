import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { urlDataReducer } from './reducers/urlReducer';
import { userDataReducer, userLoginReducer } from './reducers/userReducer';
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const reducer = combineReducers({
    user: userLoginReducer,
    userData: userDataReducer,
    urlData: urlDataReducer
})
const initialState = {
    user: { userInfo: userInfoFromStorage },
    userData: { userData: {} }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;