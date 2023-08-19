import React, { useState, useEffect } from "react";
import "./productDetails.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, newReview } from "../actions/productsActions";
import Loader from "./Loader";
import ReviewCard from "./ReviewCard";
import { addtoCart } from "../actions/cartActions";
import { toast,ToastContainer } from "react-toastify";
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from "@material-ui/core";
import { Rating } from "@mui/material";
import { review_reset } from "../constants/productsConstants";
const options = {
  size: "large",
  readOnly: true,
  precision : 0.5
};

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity,setQuantity] = useState(1)
  const[rating,setRating] = useState(0)
  const[open,setOpen] = useState(false)
  const[comment,setComment] = useState("")
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {success,error:reviewerror} = useSelector((state)=>state.review)
  const { id } = useParams();
  const dispatch = useDispatch();
  const increaseQuantity=()=>{
    if(product.stock <= quantity) return
    let qty = quantity + 1
    setQuantity(qty)
  }
  const decreaseQuantity=()=>{
    if(quantity <= 1) return
    let qty = quantity - 1
    setQuantity(qty)
  }
  useEffect(() => {

    dispatch(getProductDetails(id));
    if(success){
      toast.success("Review Submitted Successfully")
      dispatch({type:review_reset})
    }
  }, [dispatch, id,success]);

  const addtocartHandler=()=>{
    dispatch(addtoCart(id,quantity))
    toast.success("Product Added To Cart Successfully")
  }

  const reviewSubmitHandler =()=>{
    const myForm = new FormData()
    myForm.set("rating",rating)
    myForm.set("comment",comment)
    myForm.set("productId",id)
    dispatch(newReview(myForm))
    setOpen(false)
  }

  const submitReviewToggle=()=>{
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <section id="product-details" className="section-p1">
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="single-pro-image">
            {product.images && (
              <img src={product.images[selectedImage].url} alt="" />
            )}
            <div className="small-image-group">
              {product.images &&
                product.images.map((image, index) => (
                  <div className="small-image-col" key={image.public_id}>
                    <img
                      src={image.url}
                      key={image.public_id}
                      className="small-image"
                      alt=""
                      onClick={() => setSelectedImage(index)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="single-product-details">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              Category: {product.category}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {product.name}
            </h3>
            <Rating {...options} value={product.rating}  />
            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              &#8377; {product.price}
            </h3>
            <select>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                 <button onClick={decreaseQuantity}>-</button>
                 <input readOnly value={quantity} type="number" />
                 <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              Status:{" "}
              {product.stock >=1 ? (
                <h3 className="text-2xl font-bold text-green-500 sm:pr-12">
                  {" "}
                  In Stock
                </h3>
              ) : (
                <h3 className="text-2xl font-bold text-red-600 sm:pr-12">
                  {" "}
                  Out Of Stock
                </h3>
              )}
            </h3>
            <button disabled={product.stock < 1 ? true : false} onClick={addtocartHandler} className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add to Cart
            </button>
            <h4
              className="text-2xl font-bold text-gray-900 sm:pr-12"
              style={{ paddingTop: 20 }}
            >
              Product Description
            </h4>
            <span>{product.description}</span>
            <button onClick={submitReviewToggle} className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Submit Review
            </button>
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
              <DialogTitle>Submit Review</DialogTitle>
               <DialogContent className="submitDialog">
                <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size="large"/>
                <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
               </DialogContent>
               <DialogActions>
                <Button onClick={reviewSubmitHandler}>Submit</Button>
                <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
               </DialogActions>
            </Dialog>
            <div className="reviews">
            {product.reviews && product.reviews[0] ? (
              product.reviews.map((review) => <ReviewCard review={review} />)
            ) : (
              <p className="noreview">No Reviews Yet</p>
            )}
          </div>
          </div>
          <ToastContainer />
        </>
      )}
      
    </section>
    
    
  );
};

export default Test;
