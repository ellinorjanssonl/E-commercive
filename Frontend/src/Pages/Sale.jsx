import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Css/Womens.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const Sale = () => {
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [favorites, setFavorites] = useState(() => {
const localFavorites = localStorage.getItem('favorites');
return localFavorites ? JSON.parse(localFavorites) : [];
  }
   );

    useEffect(() => {
      const fetchProducts = async () => {
      try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
    setProducts(data);
      }
       catch (error) {
       console.error('Error fetching products:', error);
       }
      }
    fetchProducts();
          }
        , []);

       useEffect(() => {
          // Uppdatera localStorage när favoriter ändras
          localStorage.setItem('favorites', JSON.stringify(favorites));
          }
          , [favorites]);

          const toggleFavorite = (productId) => {
          setFavorites((prevFavorites) => {
          const isAlreadyFavorite = prevFavorites.includes(productId);
           if (isAlreadyFavorite) {
            return prevFavorites.filter(favId => favId !== productId);
           }
             else {
               return [...prevFavorites, productId];
             }
           }
          );
         }

            const isProductFavorite = (productId) => {
            return favorites.includes(productId);
            }
    
            const handleSearchChange = (value) => {
            setSearchTerm(value);
            }
    
            const saleProducts = products.filter(product => 
            product.category === "sale" && 
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );


      return (
         <div className='womens'>
             <h2 className='header'>SALE</h2>
             <h3 className='header2'>Asseccories & Bags</h3>
             <div className='products'>
            {saleProducts.map(product => (
                      <ul className='productsUL' key={product.id}> 
                        <li>
                          <h3>{product.name}</h3>
                        </li>
                        <li>
                          <Link to={`/product/${product.id}`}>
                            <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
                          </Link>
                        </li> 
                        <li className='Price'>Price: ${product.price}
                        </li>
                        <li className='Price'>Sale: ${product.sale}
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


export default Sale