import {combineReducers,applyMiddleware} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productsReducer"


import { forgotPasswordReducer, registerReducer, updateReducer, userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/CartReducer"

const reducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  newusers : registerReducer,
  profile : updateReducer,
  forgotpassword : forgotPasswordReducer,
  cart : cartReducer
})

let initialState = {
  
    cart: {
      cartItems: window.localStorage.getItem("cartItems")
        ? JSON.parse(window.localStorage.getItem("cartItems"))
        : [],
        shippingInfo : window.localStorage.getItem("shippingInfo") 
              ? JSON.parse(window.localStorage.getItem("shippingInfo") )
              : {},
    }
  
};

const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
  initialState,
  middleware: [...middleware],
  // Add any other configurations you need
  devTools: true 
})

export default store
