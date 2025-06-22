import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import './../Css/RecommendedProduct.css';

function RecommendedProduct({ id, title, image, price, rating }) {
    const [, dispatch] = useStateValue();
    const validRating = Math.max(0, Math.round(rating || 0));

    const addToBasket = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_TO_BASKET',
            item: { id, title, image, price, rating, quantity: 1 },
        });
    };

    return (
        <div className="recommended-product">
            <Link to={`/product/${id}`}>
                <div className="recommended-product__image-container">
                    <img src={image} alt={title} />
                </div>
                <div className="recommended-product__info">
                    <p className="recommended-product__title">{title}</p>
                    <div className="recommended-product__rating">
                        {Array(validRating).fill().map((_, i) => <span key={i}>⭐</span>)}
                    </div>
                    <p className="recommended-product__price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                </div>
            </Link>
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    );
}

export default RecommendedProduct; 
