import {combineReducers,applyMiddleware} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"
import { Deleteproductreducer, newProductsReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productsReducer"


import { AdminAllUsersReducer, adminUserDetailsReducer, forgotPasswordReducer, registerReducer, updateReducer, userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/CartReducer"
import { adminOrdersReducer, adminUpdateOrderReducer, adminorderDetailsReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer"

const reducer = combineReducers({
  products : productReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  newusers : registerReducer,
  profile : updateReducer,
  forgotpassword : forgotPasswordReducer,
  cart : cartReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails : orderDetailsReducer,
  review : reviewReducer,
  newproduct : newProductsReducer,
  deleteproduct : Deleteproductreducer,
  adminallorders : adminOrdersReducer,
  adminorder : adminUpdateOrderReducer,
  adminorderdetails : adminorderDetailsReducer,
  allusers:AdminAllUsersReducer,
  singleuser : adminUserDetailsReducer,
  reviews : productReviewsReducer
})

let cartItems = window.localStorage.getItem("cartItems");
console.log("Cart Items from localStorage:", cartItems);

let shippingInfo = window.localStorage.getItem("shippingInfo");
console.log("Shipping Info from localStorage:", shippingInfo);

var initialState = {}
window.addEventListener("load", () => {
  let cartItems = window.localStorage.getItem("cartItems");
  console.log("Cart Items from localStorage:", cartItems);

  let shippingInfo = window.localStorage.getItem("shippingInfo");
  console.log("Shipping Info from localStorage:", shippingInfo);

   initialState = {
    cart: {
      cartItems: cartItems ? JSON.parse(cartItems) : [],
      shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : {},
    },
  };

  // Now you can use the `initialState` object as needed
});


const middleware = [thunk]

const store = configureStore({
    reducer: reducer,
  initialState,
  middleware: [...middleware],
  // Add any other configurations you need
  devTools: true 
})

export default store
