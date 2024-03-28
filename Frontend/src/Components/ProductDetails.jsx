import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../Pages/Css/ProductDetails.css';
import config from '../config';

/* här är min kod för ProductDetails.jsx. Här visar jag detaljerad information om produkten. Jag använder useState, useEffect och useParams.
  Jag använder också useCart för att lägga till produkter i varukorgen. */

const ProductDetail = () => {
  const {productId } = useParams();
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(''); 
  const [showAddedMessage, setShowAddedMessage] = useState(false); 
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useCart(); 
  
  
 // Hämta produkt från API
 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(config.URL + config.productsURI + `${productId}`);
      const data = await response.json();
      setProduct(data);
      setSelectedSize(data.sizes.split(', ')[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

    fetchProduct();
  }, [productId]);

  const isProductFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };


  // Lägg till produkt i varukorgen
  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize });
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 4000);
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className='product-detail'>
      <div className='image-container'>
       <img src={config.URL + `${product.imageUrl.replace(/^\/+/g, '')}`} alt={product.name} />
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
                 <li className='size-guide'>
                    <strong>Size Guide:</strong><br />
                    S - For chest 32-33 inches, waist 26-27 inches.<br />
                    M - For chest 34-35 inches, waist 28-29 inches.<br />
                    L - For chest 36-37 inches, waist 30-31 inches.<br />
                    XL - For chest 38-39 inches, waist 32-33 inches.<br />
                    </li>
                    <br />
                    <li className='price'> Price : {product.price}$</li>
                  </li>
                  <li className='heartpic' onClick={() => toggleFavorite(product)}>
                  {isProductFavorite(product.id) ? <FaHeart className='hearticon' style={{ fontSize: '20px' }}/> : <FaRegHeart style={{ fontSize: '20px' }} />}
                  </li>
                    <li><button className='add-to-cart-btn' onClick={handleAddToCart}>Add to Cart</button></li>
                 {showAddedMessage && <div className='added-message'>Added to cart!</div>}
               </ul>
           </div>
       </div>
  );
};

export default ProductDetail;

