import "./App.css";
import Collections from "./components/Collections";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Promotion from "./components/Promotion";
import Men from "./components/Men";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Newproducts from "./components/Newproducts";
import ProductDetails from "./components/ProductDetails";
import Test from "./components/Test";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/LoginActions";
import { useSelector } from "react-redux";
import UserOptions from "./components/UserOptions";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import Forgotpassword from "./components/Forgotpassword";
import ResetPassword from "./components/ResetPassword";
import Cart from "./components/Cart";
import ShippingInfo from "./components/ShippingInfo";
import ConfirmOrder from "./components/ConfirmOrder";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/OrderSuccess";
import PageNotFound from "./components/PageNotFound";
import MyOrders from "./components/MyOrders";
import MyOrderDetails from "./components/MyOrderDetails";
import DashBoard from "./components/DashBoard";
import ProductsList from "./components/ProductsList";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import AdminOrders from "./components/AdminOrders";
import UpdateOrder from "./components/UpdateOrder";
import AdminUsers from "./components/AdminUsers";
import AdminUserDetails from "./components/AdminUserDetails";
import AdminReviews from "./components/AdminReviews";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Navigation />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/men/:keyword" element={<Men />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Test />} />
        <Route path="/search" element={<Search />} />
        {
          isAuthenticated && <Route
          path="/account"
          element={<Profile />}
        />
        }
        {
          isAuthenticated && <Route
          path="/update"
          element={<UpdateProfile />}
        />
        }
        {
          isAuthenticated && <Route path="/changepassword" element={<UpdatePassword />} />
        }
        {
          isAuthenticated && <Route path="/shipping" element={<ShippingInfo />} />
        }
        {
          isAuthenticated && <Route path="/confirmorder" element={<ConfirmOrder />} />
        }
        {
          isAuthenticated && <Route path="/payment" element={<Payment />} />
        }
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart  />} />
        {
          isAuthenticated && <Route path="/success" element={<OrderSuccess />} />
        }
        {
          isAuthenticated && <Route path="/orders" element={<MyOrders />} />
        }
        {
          isAuthenticated && <Route path="/ordersdetail/:id" element={<MyOrderDetails />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/dashboard" element={<DashBoard />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/products" element={<ProductsList />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/create-newproduct" element={<CreateProduct />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/orders" element={<AdminOrders />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/updatesingleorder/:id" element={<UpdateOrder />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/users" element={<AdminUsers />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/user-details/:id" element={<AdminUserDetails />} />
        }
        {
          isAuthenticated && user.role==="admin" && <Route path="/admin/reviews" element={<AdminReviews />} />
        }
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
