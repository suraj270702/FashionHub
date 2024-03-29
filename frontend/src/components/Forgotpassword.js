import React, { useEffect, useState } from 'react'
import {toast,ToastContainer} from "react-toastify"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../actions/LoginActions'
import Loader from './Loader'
const Forgotpassword = () => {

    const dispatch = useDispatch()
    const {error,laoding,isUpdated} = useSelector((state)=>state.forgotpassword)

    const [email,setEmail] = useState("")
    const forgotPasswordSubmit =(e)=>{
        e.preventDefault()
    
        const myForm = new FormData()
        
        myForm.set("email",email)
        
        
        dispatch(forgotPassword(myForm))
    
      }
      useEffect(()=>{
       if(error){
        toast.error(error)
       }
       if(isUpdated){
        toast.success("Email Sent Successfully")
       }
      },[isUpdated,error,dispatch])
  return (
    <>
    {
        laoding ? <Loader /> : (
            <section class="bg-gray-50 dark:bg-gray-900" >
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0" style={{paddingTop : 70}}>
      <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          FashionDestination
      </Link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot Password
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={forgotPasswordSubmit} value="forgot">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@gmail.com" required="true" />
                  </div>
                  
                  <div>
                  <button value="forgot" type='submit' className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Sent Password Link
            </button>
                  </div>
                  
              </form>
          </div>
      </div>
  </div>
  <ToastContainer />
</section>
        )
    }
    </>
  )
}

export default Forgotpassword