
import "./App.css";
import Collections from "./components/Collections";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Promotion from "./components/Promotion";
import Men from "./components/Men";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Newproducts from "./components/Newproducts";
import ProductDetails from "./components/ProductDetails";
import Test from "./components/Test";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Men />} />
      <Route path="/men/:keyword" element={<Men />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Test />} />
      <Route path="/search" element={<Search />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
