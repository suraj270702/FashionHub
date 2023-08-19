
import { order_fail,order_request,order_success,my_order_fail,my_order_request,my_order_success,order_details_fail,order_details_request,order_details_success, all_orders_request, all_orders_success, all_orders_fail, update_orders_request, update_orders_success, update_orders_fail, delete_orders_request, delete_orders_success, delete_orders_fail, admin_order_request, admin_order_success, admin_order_fail } from "../constants/orderConstants";

import axios from "axios"

export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
       dispatch({type:order_request})
       const config ={
        headers:{
            "Content-Type" : "application/json"
        }
        
       }
       const {data} = await axios.post("/api/v1/order",order,config)
       dispatch({type:order_success,payload:data})
    }
    catch(error){
        dispatch({
            type:order_fail,
            payload : error.response.data.error
        })
    }
}

export const myOrders=()=>async(dispatch,getState)=>{
    try{
       dispatch({type:my_order_request})
       
        
       
       const {data} = await axios.get("/api/v1/myorders")
       dispatch({type:my_order_success,payload:data.orders})
    }
    catch(error){
        dispatch({
            type:my_order_fail,
            payload : error.response.data.error
        })
    }
}

export const adminAllOrders=()=>async(dispatch,getState)=>{
    try{
       dispatch({type:all_orders_request})
       
        
       
       const {data} = await axios.get("/api/v1/admin/allorders")
       dispatch({type:all_orders_success,payload:data.orders})
    }
    catch(error){
        dispatch({
            type:all_orders_fail,
            payload : error.response.data.message
        })
    }
}

export const adminUpdateOrders=(id,status)=>async(dispatch,getState)=>{
    try{
       dispatch({type:update_orders_request})
       const config ={
        headers:{
            "Content-Type" : "application/json"
        }
        
       }
       const {data} = await axios.put(`/api/v1/admin/updateorder/${id}`,status,config)
       dispatch({type:update_orders_success,payload:data.success})
    }
    catch(error){
        dispatch({
            type:update_orders_fail,
            payload : error.response.data.message
        })
    }
}

export const adminDeleteOrders=(id)=>async(dispatch,getState)=>{
    try{
       dispatch({type:delete_orders_request})
       
       const {data} = await axios.delete(`/api/v1/admin/deleteorder/${id}`)
       dispatch({type:delete_orders_success,payload:data.success})
    }
    catch(error){
        dispatch({
            type:delete_orders_fail,
            payload : error.response.data.message
        })
    }
}

export const myOrderDetails=(id)=>async(dispatch,getState)=>{
    try{
       dispatch({type:order_details_request})
       
        
       
       const {data} = await axios.get(`/api/v1/getorder/${id}`)
       dispatch({type:order_details_success,payload:data.order})
    }
    catch(error){
        dispatch({
            type:order_details_fail,
            payload : error.response.data.error
        })
    }
}

export const adminOrderDetails=(id)=>async(dispatch,getState)=>{
    try{
       dispatch({type:admin_order_request})
       
        
       
       const {data} = await axios.get(`/api/v1/getorder/${id}`)
       dispatch({type:admin_order_success,payload:data.order})
    }
    catch(error){
        dispatch({
            type:admin_order_fail,
            payload : error.response.data.error
        })
    }
}