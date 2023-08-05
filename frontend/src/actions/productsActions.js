import {
    all_products_failed,
    all_products_request,
    all_products_success,
    product_detail_request,
    product_detail_failed,
    product_detail_success,
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

  export const getProductDetails =(id)=> async(dispatch) => {

    try {
        dispatch({type : product_detail_request})

        const {data} = await axios.get(`/api/v1/productdetail/${id}`)

        dispatch({
            type : product_detail_success,
            payload : data.product
        })
        
    } catch (error) {
        dispatch({
            type : product_detail_failed,
            payload : error.response.data.message
        })
    }
  }

  export const clearErrors = () => async (dispatch) =>{
     dispatch({
        type : all_errors
     })
  }