import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Womens.css';

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Ny state för att hålla koll på söktermen
  const mensProducts = products.filter(product => product.category === "mens" && (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())));

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
      <h2 className='header'>Mens's Products</h2>
      <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
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
      {mensProducts.map(product => (
          <ul className='productsUL' key={product.id}> 
            <li>
              <h3>{product.name}</h3>
            </li>
            <li>
              <Link to={`/product/${product.id}`}>
                <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
              </Link>
            </li>
            <li>Price: ${product.price}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Mens;
