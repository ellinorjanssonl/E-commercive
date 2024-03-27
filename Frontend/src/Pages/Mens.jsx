import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import { useCart } from '../Components/CartContext';
import './Css/Womens.css';

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, toggleFavorite } = useCart(); // Använd favorites och toggleFavorite från context



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

  const isProductFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Uppdatera till att använda event-objektet och extrahera värdet
  };

  const MensProducts = products.filter(product => 
    product.category === "mens" && 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className='womens'>
      <h2 className='header'>Men's Products</h2>
      <Form className="Formsearch" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
        type="search"
        placeholder="Search for products.."
        className="searchbars"
        aria-label="Search"
        onChange={handleSearchChange}  // Använd den uppdaterade hanteraren
        />
          <FaSearch className="searchIcon"/> 
      </Form>
      <div className='products'>
        {MensProducts.map(product => (
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
            <li className='heart' onClick={() => toggleFavorite(product)}>
              {isProductFavorite(product.id) ? <FaHeart className='hearticon'/> : <FaRegHeart />}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Mens;