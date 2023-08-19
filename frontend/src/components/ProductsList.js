import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { adminDeleteProduct, adminProducts } from "../actions/productsActions";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteproduct
  );
  const deleteHandler = (id) => {
    dispatch(adminDeleteProduct(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
    }
    dispatch(adminProducts());
  }, [dispatch, error, isDeleted]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section class="container mx-auto p-6 font-mono">
          <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">Product_ID</th>
                    <th class="px-4 py-3">name</th>
                    <th class="px-4 py-3">Stock</th>
                    <th class="px-4 py-3">Price</th>
                    <th class="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {products &&
                    products.map((item, i) => (
                      <tr class="text-gray-700" key={i}>
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                class="object-cover w-full h-full rounded-full"
                                src={item.images[0].url}
                                alt=""
                                loading="lazy"
                              />
                              <div
                                class="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p class="font-semibold text-black">{item._id}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">
                          {item.name}
                        </td>
                        <td class="px-4 py-3 text-xs border">
                          {item.stock >= 1 ? (
                            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {" "}
                              {item.stock}{" "}
                            </span>
                          ) : (
                            <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                              {" "}
                              {item.stock}{" "}
                            </span>
                          )}
                        </td>
                        <td class="px-4 py-3 text-sm border">
                          &#8377; {item.price}
                        </td>
                        <td class="px-4 py-3 text-sm border">
                          <Link to={`/product/${item._id}`}>
                            <AspectRatioIcon />
                          </Link>
                          <Link className="ml-2" to={`/admin/update-product/${item._id}`}>
                            <Edit />
                          </Link>
                          <button
                            onClick={() => deleteHandler(item._id)}
                            className="ml-2 hover:bg-red-500"
                          >
                            <Delete />
                          </button>
                          <Link className="ml-2" to="/admin/create-newproduct">
                            <CreateNewFolder />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default ProductsList;
