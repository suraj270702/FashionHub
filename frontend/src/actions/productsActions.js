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

  export const getProduct =(keyword="",price,category)=> async(dispatch) => {

    try {
        dispatch({type : all_products_request})
        var link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`

        if(category){
            link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }
        else{
            link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        const {data} = await axios.get(link)
        
        dispatch({
            type : all_products_success,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : all_products_failed,
            
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