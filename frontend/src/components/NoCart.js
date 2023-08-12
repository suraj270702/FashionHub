import React from 'react';
import {Link} from "react-router-dom"
const NoCart = () => {
  return (
    <Link to="/men" > 
    <div className="flex flex-col items-center justify-center h-screen">
    
    <img className='h-64 w-80 sm:w-48' src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg' />
    <p className="text-gray-600 text-lg">Your Cart is Empty</p>
  </div>
    </Link>
    
    
  );
};

export default NoCart;
