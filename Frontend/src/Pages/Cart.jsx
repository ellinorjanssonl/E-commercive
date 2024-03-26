import React, { useState } from 'react';
import { useCart } from '../Components/CartContext';
import './Css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, totalPrice }),
      });

      if (response.ok) {
        setCheckoutComplete(true);  // Visa meddelandet
        clearCart();  // Rensa varukorgen
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Cart'>
      {cartItems.length === 0 && <div>Your cart is empty</div>}
      <div className='Cartitems'>
        {cartItems.map((item) => (
          <div key={item.id} className='CartItem'>
            <ul>
              <li><h3>{item.name}</h3></li>
              <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} />
              <li>Price: ${item.price}</li>
              <li>Quantity: {item.quantity}</li>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </ul>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className='CartTotal'>
            <ul>
              <button onClick={clearCart}>Clear Cart</button>
              <li><h3>Total: $ {totalPrice}</h3></li>
              <li><button onClick={handleCheckout}>Checkout</button></li>
              {checkoutComplete && <li style={{ color: 'green' }}>Thank you for shopping with us!</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;


