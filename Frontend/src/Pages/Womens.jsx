import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Womens.css';

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Ny state för att hålla koll på söktermen

  const womensProducts = products.filter(product => product.category === "womens" && (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())));

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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className='womens'>
      <h2 className='header'>Women's Products</h2>
      <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="search"
          placeholder="Search for products.."
          className="searchbar"
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
              <li  className='Price'> Price: ${product.price}
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Womens;
