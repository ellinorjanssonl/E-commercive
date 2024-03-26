import React, { useState} from 'react';
import { useCart } from '../Components/CartContext';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import './Css/Cart.css';

/* Här är min komponent för Cart.jsx. Här visar jag varukorgen för min webbshop.
Jag använder useState för att visa meddelandet efter att användaren har genomfört ett köp.
Jag använder också useCart för att visa varukorgen och för att ta bort produkter från varukorgen. */

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Använd navigate för att omdirigera användaren
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  // Funktion för att genomföra köp och lägga till i "databasen"
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
       setTimeout(() => {
        setIsLoading(false);  // Avaktivera laddningsskärm
        navigate('/'); // Navigera till startsidan efter 2 sekunder
      }, 2000);

           } catch (error) {
              console.error(error);
           }

          finally {
        setIsLoading(true); // Avaktivera laddningsskärm
       }
    };


  if (isLoading) {
    return (
      <div className="Loading">
        Thank you for shopping with us. Redirecting...
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className='Cart'>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          <div className='Cartitems'>
            {cartItems.map((item) => (
              <div key={item.id} className='CartItem'>
                <ul>
                  <li><h3 className='carth3'>{item.name}</h3></li>
                  <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} />
                  <li>Price: ${item.price}</li>
                  <li>Quantity: {item.quantity}</li>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </ul>
              </div>
            ))}
          </div>
          <div className='CartTotal'>
            <ul>
              <button className="carttotal" onClick={clearCart}>Clear Cart</button>
              <li><h3>Total: $ {totalPrice}</h3></li>
              <button className="checkout" onClick={handleCheckout}>Checkout</button>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


