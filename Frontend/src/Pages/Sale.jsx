import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import { useCart } from '../Components/CartContext';
import './Css/Womens.css';

/* Här är min komponent för Sale.jsx. Här visar jag produkterna som är på rea.
Jag använder useState för att hålla koll på produkterna.
Jag hämtar produkterna från min backend och visar dem i en lista.
Jag använder också useCart för att visa produkterna och för att lägga till produkter i favoriter. */

const Sale = () => {
  const [products, setProducts] = useState([]);
  const { favorites, toggleFavorite } = useCart(); // Använd favorites och toggleFavorite från context

    useEffect(() => {
      const fetchProducts = async () => {
        try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }};

      fetchProducts();
      }, []);

        const isProductFavorite = (productId) => {
        return favorites.some(fav => fav.id === productId);
         };
  
        const saleProducts = products.filter(product => 
        product.category === "sale"  
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
                     <li className='heart' onClick={() => toggleFavorite(product)}>
                     {isProductFavorite(product.id) ? <FaHeart className='hearticon'/> : <FaRegHeart />}
                     </li>
                 </ul>
               ))}
           </div>
         </div>
       );
     };


export default Sale