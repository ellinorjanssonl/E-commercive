import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Womens from './Pages/Womens';
import Mens from './Pages/Mens';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Sale from './Pages/Sale';
import Favories from './Pages/Favories';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './Components/ProductDetails';
import { CartProvider } from './Components/CartContext';
import { AuthProvider } from './Components/AuthContext';
import Footer from './Components/Footer/Footer';

/* Här är min App-komponent. Här har jag mina routes för att navigera mellan sidorna.
Jag använder BrowserRouter för att använda routes och jag använder NavbarComponent för att visa navigeringsfältet.
Jag använder också AuthProvider och CartProvider för att använda context. */

function App() {
  return (
    <AuthProvider>
    <CartProvider>
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favories />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider> 
  );
}

export default App;


