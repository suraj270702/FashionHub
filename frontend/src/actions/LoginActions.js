import axios from "axios";
import {
    login_request,
    login_success,
    login_failed,
    clearErrors,
    user_register_failed,
    user_register_request,
    user_register_success
  } from "../constants/userConstants";

  export const login =(email,password) => async(dispatch) => {
    try{
     dispatch({type : login_request})
     const config = { headers: { "Content-Type": "application/json" } };

     const {data} = await axios.post(
        `/api/v1/login`,{email,password},config
     )
     dispatch({type:login_success,payload:data.user})
    }
    catch(error){
        dispatch({type : login_failed,payload : error.response.data.message})
    }
  }

  export const register = (userData) => async(dispatch) => {
   try{
     dispatch({type :user_register_request})
     const config = {headers : {"Content-Type" : "multipart/form-data"}}
     const {data} = await axios.post(`/api/v1/register`,userData,config)
     dispatch({type:user_register_success,payload : data.newuser})
   }
   catch(error){
      dispatch({type : user_register_failed,payload : error.response.data.message})
   }
  }
  export const Clearerrors = () => async (dispatch) =>{
    dispatch({
       type : Clearerrors
    })
 }