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
        <Route path="/Forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
