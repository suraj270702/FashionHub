import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../actions/productsActions";
import Loader from "./Loader";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import {Slider} from "@material-ui/core"
import './Men.css'

const Men = () => {
  const options = {
    edit: false,
    isHalf: true,
  };
  const categories = [
    "Men-Shirt",
    "Men-Tshirt",
    "Men-Jeans",
    "Men-Trouser",
    "Men-Jacket",
    "smartphone"
  ]

  
  const [price,setPrice] = useState([0,100000])
  const [category,setCategory] = useState("")
  const priceHandler =(event,newprice)=>{
    setPrice(newprice)

  }
  const getText = (price) => `${price}`;
  const {keyword} = useParams()
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error("Oops something went wrong");
    }
    dispatch(getProduct(keyword,price,category));
  }, [dispatch,keyword,price,category]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Men's Section
              </h2>
              <div className="slider">
                <h1>Choose The Price Range</h1>
                <Slider value={price} onChange={priceHandler}
                className="slider-custom"
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={5000}
                step={100}
                
        
        getAriaValueText={getText}
                />
              </div>
              <div className="categories">
                <h1>Categories Range</h1>
               <ul>
                {categories.map((category)=>(
                  <li
                  className="category-link"
                  key={category}
                  onClick={()=> setCategory(category)}
                  >{category}</li>
                ))}
               </ul>
              </div>
              <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products &&
                  products.map((product) => (
                    <div class="group relative">
                      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src="https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847"
                          alt="Front of men&#039;s Basic Tee in black."
                          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div class="mt-4 flex justify-between">
                        <div>
                          <h3 class="text-sm text-gray-700">
                            <Link to={`/product/${product._id}`}>
                              <span
                                aria-hidden="true"
                                class="absolute inset-0"
                              ></span>
                              {product.name}
                            </Link>
                          </h3>
                          <p class="mt-1 text-sm text-gray-500">
                            {product.numofreviews} Reviews
                          </p>
                          <ReactStars {...options} value={product.rating} />
                        </div>
                        <p class="text-sm font-medium text-gray-900">
                          &#8377; {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Men;
