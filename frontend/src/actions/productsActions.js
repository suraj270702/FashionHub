import {
    all_products_failed,
    all_products_request,
    all_products_success,
    all_errors
  } from "../constants/productsConstants";

  import axios from "axios"

  export const getProduct =()=> async(dispatch) => {

    try {
        dispatch({type : all_products_request})

        const {data} = await axios.get("/api/v1/products")

        dispatch({
            type : all_products_success,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : all_products_failed,
            payload : error.response.data.message
        })
    }
  }

  export const clearErrors = () => async (dispatch) =>{
     dispatch({
        type : all_errors
     })
  }