import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      console.log(data); // Lägg till denna loggning
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

    fetchProduct();
  }, [productId]);

  // Hantera fall då produkten laddas eller inte finns
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
          <li className='price'>Price: ${product.price}</li>
        </ul>
        <button className='add-to-cart-btn'>Add to Cart</button>
      </div>
    </div>
  );
  
};

export default ProductDetail;

