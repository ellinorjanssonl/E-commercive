import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductDetails.css';

/* här är min kod för ProductDetails.jsx. Här visar jag detaljerad information om produkten. Jag använder useState, useEffect och useParams.
  Jag använder också useCart för att lägga till produkter i varukorgen. */

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(''); 
  const [showAddedMessage, setShowAddedMessage] = useState(false); 
  const { addToCart } = useCart();
  
 // Hämta produkt från API
 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      console.log(data); // Lägg till denna loggning
      setProduct(data);
      setSelectedSize(data.sizes.split(', ')[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

    fetchProduct();
  }, [productId]);

  // Lägg till produkt i varukorgen
  const handleAddToCart = () => {
    addToCart(product);
    addToCart({ ...product, selectedSize })
    setShowAddedMessage(true); 
    setTimeout(() => setShowAddedMessage(false), 4000);
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className='product-detail'>
      <div className='image-container'>
        <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
      </div>
      <div className='product-info'>
        <ul>
          <li><h2 className='h2'>{product.name}</h2></li>
          <li className='text'>{product.description}</li>
          <li className='sizes'>
            <ul className='sizes-list'>
              {product.sizes.split(', ').map((size) => (
                <li
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </li>
              ))}
            </ul>
          </li>
          <li><button className='add-to-cart-btn' onClick={handleAddToCart}>Add to Cart</button></li>
          {showAddedMessage && <div className='added-message'>Added to cart!</div>}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;

