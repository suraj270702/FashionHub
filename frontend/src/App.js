
import "./App.css";
import Collections from "./components/Collections";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Promotion from "./components/Promotion";
import Men from "./components/Men";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Men />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
