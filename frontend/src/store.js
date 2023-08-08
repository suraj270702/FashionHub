import {combineReducers,applyMiddleware} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productsReducer"


import { userReducer } from "./reducers/userReducer"

const reducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer
})

let initialState = {};

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
  initialState,
  middleware: [...middleware],
  // Add any other configurations you need
  devTools: true 
})

export default store
