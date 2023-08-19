import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { adminOrderDetails, adminUpdateOrders, myOrderDetails } from "../actions/ordersAction";
import Loader from "./Loader";
const UpdateOrder = () => {
  const { id } = useParams();
  const categories = ["Shipped", "Out For Delivery", "Delivered", "Cancelled"];
  
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  // console.log(status)

  

  useEffect(() => {
    console.log('useEffect triggered'); // Add a console log here
    
    dispatch(adminOrderDetails(id));
  }, [id,dispatch]);

  const { error, loading, order } = useSelector((state) => state.adminorderdetails);
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div class="bg-gray-50 dark:bg-slate-900">
          <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
            <div class="sm:w-11/12 lg:w-3/4 mx-auto">
              <div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
                <div class="flex flex-col md:flex-row justify-between">
                  <div class="mb-4 md:mb-0 md:mr-8">
                    <h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white md:text-center">
                      FashionDestination Inc.
                    </h1>
                  </div>

                  <div class="text-right md:text-center">
                    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                      Invoice #
                    </h2>
                    <span class="mt-1 block text-gray-500">{id}</span>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Shipping Details:
                    </h3>
                    <span class="mt-4 not-italic text-gray-800 dark:text-gray-200">
                      { order.shippingInfo.address}
                      <br />
                      { order.shippingInfo.city}
                      <br />
                      { order.shippingInfo.state},
                      { order.shippingInfo.pinCode}
                      <br />
                      { order.shippingInfo.country}
                      <br />
                    </span>
                  </div>
                </div>

                <div class="mt-8 grid sm:grid-cols-2 gap-3">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Bill to:
                    </h3>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      { order.user.name}
                    </h3>
                    <span class="mt-2 not-italic text-gray-500">
                      { order.shippingInfo.address},
                      <br />
                      { order.shippingInfo.city},
                      <br />
                      { order.shippingInfo.state},
                      { order.shippingInfo.pinCode}
                      <br />
                    </span>
                  </div>

                  <div class="sm:text-right space-y-2">
                    <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Order Date:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          {order && order.createdAt.substring(0, 10)}
                        </dd>
                      </dl>
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Status:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          {order.orderStatus === "Delivered" ? (
                            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {order.orderStatus}
                            </span>
                          ) : (
                            <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                              {order.orderStatus}
                            </span>
                          )}
                        </dd>
                      </dl>
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Payment Status:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          {order.paymentInfo.status === "succeeded" ? (
                            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              Paid
                            </span>
                          ) : (
                            <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                              Not Paid
                            </span>
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <div class="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                    <div class="hidden sm:grid sm:grid-cols-5">
                      <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                        Item
                      </div>
                      <div class="text-left text-xs font-medium text-gray-500 uppercase">
                        Qty
                      </div>
                      <div class="text-left text-xs font-medium text-gray-500 uppercase">
                        Rate
                      </div>
                      <div class="text-right text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </div>
                    </div>

                    <div class="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                    {order.orderItems.map((item, i) => (
                      <div
                        class="grid grid-cols-3 sm:grid-cols-5 gap-2"
                        key={i}
                      >
                        <div class="col-span-full sm:col-span-2">
                          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Item
                          </h5>
                          <p class="font-medium text-gray-800 dark:text-gray-200">
                            {item.name}
                          </p>
                        </div>
                        <div>
                          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Quantity
                          </h5>
                          <p class="text-gray-800 dark:text-gray-200">
                            {item.quantity}
                          </p>
                        </div>
                        <div>
                          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Price
                          </h5>
                          <p class="text-gray-800 dark:text-gray-200">
                            &#8377;{item.price}
                          </p>
                        </div>
                        <div>
                          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </h5>
                          <p class="sm:text-right text-gray-800 dark:text-gray-200">
                            &#8377;{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                </div>

                <div class="mt-8 flex sm:justify-end">
                  <div class="w-full max-w-2xl sm:text-right space-y-2">
                    <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Subtotal:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          &#8377;{order.itemsPrice}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Shipping Price:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          &#8377;{order.shippingPrice}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Total:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          &#8377;{order.totalPrice}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Amount paid:
                        </dt>
                        <dd class="col-span-2 text-gray-500">
                          &#8377;{order.totalPrice}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Due balance:
                        </dt>
                        <dd class="col-span-2 text-gray-500">&#8377;0.00</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div class="mt-8 sm:mt-12">
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Thank you!
                  </h4>
                  <p class="text-gray-500">
                    If you have any questions concerning this invoice, use the
                    following contact information:
                  </p>
                  <div class="mt-2">
                    <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                      surajmaurya2720@gmail.com
                    </p>
                    <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                      +918369930667
                    </p>
                  </div>
                </div>

                <p class="mt-5 text-sm text-gray-500">
                  © 2023 FashionDestination.
                </p>
              </div>

              <div class="mt-6 flex justify-end gap-x-3">
                <a
                  class="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:border-gray-800 dark:hover:border-gray-600 dark:shadow-slate-700/[.7] dark:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  href="#"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                  </svg>
                  PDF
                </a>
                <a
                  class="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                  href="#"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                  </svg>
                  Print details
                </a>
              </div>
              <div class="mt-6 flex justify-between gap-x-3">
                <h1>Change Status</h1>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option>select status</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <button
                  
                  class="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UpdateOrder;
