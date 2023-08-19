import React, { useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import { useDispatch } from 'react-redux';
import { createOrder } from '../actions/ordersAction';
import Loader from './Loader';

function OrderSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');
  const [isValid, setIsValid] = useState(false);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));
  const dispatch = useDispatch()
  console.log(orderInfo,cartItems,shippingInfo)
  const createNewOrder =()=>{
    const order ={
        shippingInfo,
        orderItems : cartItems,
        itemsPrice : orderInfo.subTotal,
        taxPrice : 0,
        shippingPrice : orderInfo.ShippingPrice,
        totalPrice : orderInfo.totalprice,
        paymentInfo : {
          id : paymentIntent,
          status : redirectStatus
        }
      }
      dispatch(createOrder(order))
      
  }
  useEffect(() => {
    async function verifyPaymentIntent() {
      try {
        const response = await fetch(`/api/v1/verify-payment?payment_intent=${paymentIntent}`);
        const data = await response.json();
        setIsValid(data.isValid);
      } catch (error) {
        console.error('Error verifying payment intent:', error);
      }
    }

    if (paymentIntent) {
      verifyPaymentIntent();
      
    }
    if (isValid) {
        createNewOrder();
        sessionStorage.removeItem("orderInfo");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("ShippingInfo");
      }
        
    
    
      
  }, [paymentIntent,orderInfo,cartItems,shippingInfo]);

  if (!isValid) {
    return <Loader />
  }

  return (
    <>
    
<div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p class="text-gray-600 my-2">Thank you for placing your order </p>
            <p> Have a great day!  </p>
            <div class="py-10 text-center">
                <Link to="/" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK 
               </Link>
            </div>
        </div>
    </div>
  </div>
    </>
  );
}

export default OrderSuccess;
