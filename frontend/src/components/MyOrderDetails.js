import React, { useEffect } from "react";
import "./myorderdetails.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { myOrderDetails } from "../actions/ordersAction";
import Loader from "./Loader";
const MyOrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(myOrderDetails(id));
  }, [id, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        
          <div class="container mx-auto my-5 box">
            <div class="card bg-white w-full ">
              <div class="card-header">
                <div class="flex flex-col-reverse sm:flex-row justify-between items-center">
                  <div class="mb-4 sm:mb-0">
                    <h4 class="mb-0">
                      Thanks for your Order,
                      <span class="text-blue-500">{user.name}</span> !
                    </h4>
                  </div>
                  <div class="flex items-center justify-center sm:pl-4 pt-4">
                    <p class="mb-4 pt-0 pl-2">FashionDestination</p>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="mb-3 flex justify-between">
                  
                  <div class="row-auto">
                    <small>Receipt Voucher : <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{order._id}</span> </small>
                  </div>
                  <div class="row-auto">
                    <small>
                      Order Status :{" "}
                      {order.orderStatus === "Delivered" ? (
                        <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {order.orderStatus}{" "}
                        </span>
                      ) : (
                        <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                          {order.orderStatus}{" "}
                        </span>
                      )}
                    </small>
                  </div>
                </div>
                
                {
                    order.orderItems && order.orderItems.map((item,i)=>(
                        <div class="row mt-4">
                  <div class="col">
                    <div class="card">
                      <div class="card-body">
                        <div class="flex">
                          <div class="sq">
                            <img
                              class="w-32 h-32"
                              src={item.image}
                              alt="Product Image"
                            />
                          </div>
                          <div class="media-body my-auto text-right">
                            <div class="row my-auto flex flex-col md:flex-row">
                              <div class="col my-auto">
                                <h6 class="mb-0">{item.name}</h6>
                              </div>
                              
                              <div class="col my-auto">
                                <small>Qty : {item.quantity}</small>
                              </div>
                              <div class="col my-auto">
                                <h6 class="mb-0">&#8377;{item.price}</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr class="my-3" />
                      </div>
                    </div>
                  </div>
                </div>
                    ))
                }
                
                <div class="row mt-4">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <p class="mb-1 text-right">
                          <b>Payment Summary</b>
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p class="mb-1 text-right">
                          <b>SubTotal</b>
                        </p>
                      </div>
                      <div class="col-auto">
                        <p class="mb-1">&#8377;{order.itemsPrice}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p class="mb-1 text-right">
                          <b>Shipping Price</b>
                        </p>
                      </div>
                      <div class="col-auto">
                        <p class="mb-1">&#8377;{order.shippingPrice}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p class="mb-1 text-right">
                          <b>Total</b>
                        </p>
                      </div>
                      <div class="col-auto">
                        <p class="mb-1">&#8377;{order.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="jumbotron-fluid">
                    <div class="row justify-between">
                      <div class="col-sm-auto col-auto my-auto"></div>
                      <div class="col-auto my-auto">
                        <h2 class="mb-0 font-semibold">TOTAL PAID</h2>
                      </div>
                      <div class="col-auto my-auto ml-auto">
                        <h1 class="text-4xl">&#8377; {order.totalPrice}</h1>
                      </div>
                    </div>
                    <div class="row mb-3 mt-3 mt-md-0">
                      <div class="col-auto border-r">
                        <small class="text-white">PAN:AA02hDW7E</small>
                      </div>
                      <div class="col-auto border-r">
                        <small class="text-white">CIN:UMMC20PTC</small>
                      </div>
                      <div class="col-auto">
                        <small class="text-white">GSTN:268FD07EXX</small>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        
      )}
    </>
  );
};

export default MyOrderDetails;
