import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Css/Womens.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
  const localFavorites = localStorage.getItem('favorites');
   return localFavorites ? JSON.parse(localFavorites) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Uppdatera localStorage när favoriter ändras
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.includes(productId);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(favId => favId !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const isProductFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const womensProducts = products.filter(product => 
    product.category === "womens" && 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className='womens'>
      <h2 className='header'>Women's Products</h2>
      <Form className="Formsearch" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="search"
          placeholder="Search for products.."
          className="searchbars"
          aria-label="Search"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Button className="buttonsearch" variant="outline-success">Search</Button>
      </Form>
      <div className='products'>
        {womensProducts.map(product => (
          <ul className='productsUL' key={product.id}> 
            <li>
              <h3>{product.name}</h3>
            </li>
            <li>
              <Link to={`/product/${product.id}`}>
                <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
              </Link>
            </li> 
            <li className='Price'> Price: ${product.price}
            </li>
            <li className='heart' onClick={() => toggleFavorite(product.id)}>
            {isProductFavorite(product.id) ? <FaHeart className='hearticon'/> : <FaRegHeart />}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Womens;
