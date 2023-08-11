import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ChangePassword, loadUser, resetPassword } from '../actions/LoginActions'
import { update_password_reset } from '../constants/userConstants'
import {  toast } from 'react-toastify';
const ResetPassword = () => {
    const dispatch = useDispatch()
    const {error,isUpdated} = useSelector((state)=>state.forgotpassword)
    const {token} = useParams()
    const [password,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    
    const [showPasswords,setShowPasswords] = useState(false)
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token,myForm));
      };
      useEffect(()=>{
        if(error){
            toast.error(error)
        }
        
        if(isUpdated){
            
            
            window.location.href="/login"
            dispatch({type : update_password_reset})
        }
      },[isUpdated,error])
  return (
    <>
    <section class="bg-gray-50 dark:bg-gray-900" >
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0" style={{paddingTop : 70}}>
      <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          FashionDestination
      </Link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create A New Password
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={updatePasswordSubmit}>
                  
                  
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                      <input type={showPasswords ? "text" : "password"} value={password} onChange={(e)=>setNewPassword(e.target.value)} name="password" id="password" placeholder="••••••••"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                      <input type={showPasswords ? "text" : "password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="confirmPassword" id="password" placeholder="••••••••"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true" />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""onChange={()=>setShowPasswords(!showPasswords)} />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Show Password</label>
                          </div>
                      </div>
                      
                  </div>
                  <div></div>
                  <div>
                    
                  <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Change Password
            </button>
                  </div>
                 
              </form>
          </div>
      </div>
  </div>
  <ToastContainer />
</section>
    </>
  )
}

export default ResetPassword