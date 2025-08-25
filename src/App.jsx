import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Product from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header onCartToggle={toggleCart} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Cart isOpen={isCartOpen} onToggle={toggleCart} />
      </div>
    </Router>
  );
}
