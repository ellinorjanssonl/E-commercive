import React from 'react';
import { useCart } from '../Components/CartContext';
import './Css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
          <>
          <div className='CartTotal'>
            <ul>
            <button onClick={clearCart}>Clear Cart</button>
            <li><h3>Total: $ {totalPrice}</h3></li>
            <li> <h4>Thank you for shopping with us!</h4> </li>
            <buttom> Checkout </buttom>
            </ul>
          </div> 
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

