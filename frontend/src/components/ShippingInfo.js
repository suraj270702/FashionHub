import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Country,State} from "country-state-city"
import CheckoutSteps from './CheckoutSteps'
const ShippingInfo = () => {
    const dispatch = useDispatch()
    const {ShippingInfo} = useSelector((state)=>state.cart)
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [country,setCountry] = useState("India")
    const [pincode,setPincode] = useState()
    const [phoneNo,setPhoneNo] = useState()
  return (
    <>
    <CheckoutSteps activeStep={0} />
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/cart" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-20 h-20 mr-2" src="https://static.vecteezy.com/system/resources/previews/020/456/576/non_2x/fast-box-logo-fast-delivery-logo-fast-package-logo-design-on-isolated-background-vector.jpg" alt="logo" />
          Shipping Details   
      </Link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Provide Your  Shipping Details
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                      <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} name="address" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Room No,Building Name,Street Name" required="true"/>
                  </div>
                  <div>
                      <label for="phoneno" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                      <input type="number" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} name="phoneno" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+919845678458" required="true"/>
                  </div>
                  <div>
                      <label for="pincode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                      <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)} name="pincode" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="234560" required="true"/>
                  </div>
                  <div>
                      <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                      <input type="text" readOnly value={country}  name="country" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="234560" required="true"/>
                  </div>
                  <div>
                  <label for="stated" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                    <select required value={state} onChange={(e)=>setState(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                       <option value="" >State</option>
                       {
                        State && State.getStatesOfCountry("IN").map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                        ))
                       }
                    </select>
                  </div>
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                      <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} name="state" id="state" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g Mumbai" required="true"/>
                  </div>
                  
                  
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed For Payment</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default ShippingInfo