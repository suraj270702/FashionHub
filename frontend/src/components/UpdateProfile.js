
import React, { useRef, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { Clearerrors,  loadUser,  register, update } from '../actions/LoginActions'
import { ToastContainer, toast } from 'react-toastify';
import { update_user_reset } from '../constants/userConstants';
const UpdateProfile = () => {
    const dispatch = useDispatch()
  const {user}  = useSelector((state)=>state.user)
  const {error,isUpdated,loading} = useSelector((state)=>state.profile)
  const registerref = useRef(null);
  
  
  const [avatar,setAvatar] = useState()
  const [avatarPreview,setAvatarPreview] = useState(user.avatar.url)
  const [name,setName] = useState(user.name)
  const [email,setEmail] = useState(user.email)

  const updateSubmit =(e)=>{
    e.preventDefault()

    const myForm = new FormData()
    myForm.set("avatar",avatar)
    myForm.set("name",name)
    myForm.set("email",email)
   
    
    dispatch(update(myForm))

  }
  const submitHandler = (e) => {
    
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
    
  };
  useEffect(()=>{
    if(error){
        toast.error(error)
    }
    
    if(isUpdated){
        
        dispatch(loadUser())
        window.location.href="/account"
        dispatch({type : update_user_reset})
    }
  },[isUpdated,error])
  return (
    
    <>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0"
          style={{ paddingTop: 50 }}
        >
          <Link
            to="/"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            FashionDestination
          </Link>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update an account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                ref={registerref}
                onSubmit={updateSubmit}
                value="Register"
              >
                <div>
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    name="avatar"
                    style={{ width: 70 }}
                  />
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={submitHandler}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required="true"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required="true"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <button type="submit" value="Register" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Update Account
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

export default UpdateProfile