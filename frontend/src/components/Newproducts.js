import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel"
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productsActions";
import './Newproductdetails.css'
const Newproducts = () => {

    const {product,loading,error} = useSelector((state)=> state.productDetails)
    const { id } = useParams();

    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(getProductDetails(id))
    },[dispatch,id])

    return (
        <>
        <div className="productDetails">
            <div>
            <Carousel>

{
    product.images && product.images.map((item,i)=>(

        <img 
        className="CarouselImage"
        key={item.url}
        src={item.url}
        alt={`${i} Slide`}
        />
    )
    
    )
}

</Carousel>
            </div>

        </div>
        </>
    );
};

export default Newproducts;
