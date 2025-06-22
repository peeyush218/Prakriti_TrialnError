import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import '../Css/SearchResultProduct.css';

function SearchResultProduct({ product }) {
  const { id, title, image, price, rating } = product;
  const [, dispatch] = useStateValue();
  
  // Safeguard for rating - ensures it's a valid number before rendering stars
  const validRating = Math.max(0, Math.min(5, Math.round(rating || 0)));

  const addToBasket = (e) => {
    // Prevent the Link from navigating when the button is clicked
    e.preventDefault(); 
    dispatch({
      type: 'ADD_TO_BASKET',
      item: { ...product, quantity: 1 },
    });
  };

  return (
    <div className="search-result-product">
      <div className="search-result-product__image-container">
        <Link to={`/product/${id}`}>
          <img className="search-result-product__image" src={image} alt={title} />
        </Link>
      </div>

      <div className="search-result-product__info">
        <Link to={`/product/${id}`} className="search-result-product__title_link">
          <h3 className="search-result-product__title">{title}</h3>
        </Link>

        <div className="search-result-product__rating-reviews">
          <div className="search-result-product__rating">
            {Array(validRating).fill().map((_, i) => <span key={i}>⭐</span>)}
          </div>
          <span className="search-result-product__review-count">{product.reviews || Math.floor(Math.random() * 2000)}</span>
        </div>

        <p className="search-result-product__past-purchases">
          {`${Math.floor(Math.random() * 500)}+ bought in past month`}
        </p>

        <div className="search-result-product__price-container">
          <span className="search-result-product__price">
            <span className="search-result-product__currency">₹</span>{price}
          </span>
          <span className="search-result-product__mrp">
            M.R.P: ₹{Math.floor(price * 1.4)}.00
          </span>
        </div>
        
        <div className="search-result-product__delivery">
          <p>FREE delivery <strong>Tomorrow, 23 Jun</strong></p>
        </div>
      </div>
      
      <button onClick={addToBasket} className="search-result-product__add-to-cart">Add to cart</button>
    </div>
  );
}

export default SearchResultProduct; 
