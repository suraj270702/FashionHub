import {
    all_products_failed,
    all_products_request,
    all_products_success,
    product_detail_request,
    product_detail_failed,
    product_detail_success,
    all_errors,
    review_request,
    review_success,
    review_fail,
    admin_products_request,
    admin_products_success,
    admin_products_fail,
    new_product_request,
    new_product_success,
    new_product_fail,
    delete_product_request,
    delete_product_success,
    delete_product_fail,
    update_products_request,
    update_products_success,
    update_products_fail,
    admin_all_reviews_request,
    admin_all_reviews_success,
    admin_all_reviews_fail
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

  export const adminProducts =()=>async(dispatch)=>{
    try{
        dispatch({type:admin_products_request})
    const {data} = await axios.get("/api/v1/admin/getallproducts")
    dispatch({type:admin_products_success,payload:data})
    }
    catch(error){
        dispatch({type:admin_products_fail,payload:error.response.data.message})
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

  export const newReview =(reviewData)=> async(dispatch) => {

    try {
        dispatch({type : review_request})
        const config={
            headers : {"Content-Type":"application/json"}
        }
        const {data} = await axios.put(`/api/v1/review`,reviewData,config)

        dispatch({
            type : review_success,
            payload : data.success
        })
        
    } catch (error) {
        dispatch({
            type : review_fail,
            payload : error.response.data.message
        })
    }
  }

  export const adminNewProduct =(productData)=> async(dispatch) => {

    try {
        dispatch({type : new_product_request})
        const config={
            headers : {"Content-Type":"application/json"}
        }
        const {data} = await axios.post(`/api/v1/admin/create-product`,productData,config)

        dispatch({
            type : new_product_success,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : new_product_fail,
            payload : error.response.data.message
        })
    }
  }

  export const adminUpdateProduct =(id,productData)=> async(dispatch) => {

    try {
        dispatch({type : update_products_request})
        const config={
            headers : {"Content-Type":"application/json"}
        }
        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData,config)

        dispatch({
            type : update_products_success,
            payload : data.success
        })
        
    } catch (error) {
        dispatch({
            type : update_products_fail,
            payload : error.response.data.message
        })
    }
  }

  export const adminDeleteProduct =(id)=> async(dispatch) => {

    try {
        dispatch({type : delete_product_request})
        
        const {data} = await axios.delete(`/api/v1/admin/delete-product/${id}`)

        dispatch({
            type : delete_product_success,
            payload : data.success
        })
        
    } catch (error) {
        dispatch({
            type : delete_product_fail,
            payload : error.response.data.message
        })
    }
  }

  export const clearErrors = () => async (dispatch) =>{
     dispatch({
        type : all_errors
     })
  }

  export const adminAllReviews =(id)=> async(dispatch) => {

    try {
        dispatch({type : admin_all_reviews_request})
        
        const {data} = await axios.get(`/api/v1/getreviews?id=${id}`)

        dispatch({
            type : admin_all_reviews_success,
            payload : data.reviews
        })
        
    } catch (error) {
        dispatch({
            type : admin_all_reviews_fail,
            payload : error.response.data.message
        })
    }
  }