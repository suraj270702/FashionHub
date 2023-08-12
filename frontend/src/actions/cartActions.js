import {add_to_cart, remove_from_cart, save_shipping_info} from "../constants/cartConstants"
import axios from "axios";
export const addtoCart = (id, quantity) => async (dispatch,getState) => {
    
      
  
      const { data } = await axios.get(
        `/api/v1/productdetail/${id}`,);

      dispatch({ type: add_to_cart, payload: {product : data.product._id,name:data.product.name,
    price:data.product.price,image : data.product.images[0].url,stock : data.product.stock,quantity:quantity} });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    
  };

  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: remove_from_cart,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const saveShippingInfo =(data) => async(dispatch) => {
    dispatch({
      type : save_shipping_info,
      payload : data
    })
    localStorage.setItem("ShippingInfo",JSON.stringify(data))
  }