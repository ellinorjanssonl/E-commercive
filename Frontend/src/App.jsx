import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Womens from './Pages/Womens';
import Mens from './Pages/Mens';
import Cart from './Pages/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './Components/ProductDetails';
import { CartProvider } from './Components/CartContext';



function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;


