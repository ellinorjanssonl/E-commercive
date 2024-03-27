import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Components/CartContext';

const Favorites = () => {
  const { favorites } = useCart(); // Använd useCart för att hämta favorites direkt

  return (
    <div className='favorites'>
      <h2>Favorites</h2>
      <div className='products'>
        {favorites.map(product => ( // Iterera över favorites från context
          <ul className='productsUL' key={product.id}>
            <li>
              <h3>{product.name}</h3>
            </li>
            <li>
              <Link to={`/product/${product.id}`}>
                <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
              </Link>
            </li>
            <li className='Price'>Price: ${product.price}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
