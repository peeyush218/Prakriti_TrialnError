import React from 'react';
import '../Css/RecommendedProductCard.css';
import { useNavigate } from 'react-router-dom';

const RecommendedProductCard = ({ product }) => {
    // Default values to avoid errors if product data is incomplete
    const {
        id,
        image = 'https://via.placeholder.com/150',
        title = 'No Title',
        rating = 0,
        reviews = 0,
        price = 0,
        mrp = 0,
        best_seller_category,
        deal
    } = product;
    const navigate = useNavigate();

    return (
        <div className="recommended-product-card">
            <div
                className="recommended-product-image-link"
                onClick={() => navigate(`/product/${id}`, { state: { fromRecommended: true } })}
                style={{ cursor: 'pointer' }}
            >
                <div className="recommended-product-image-container">
                    <img src={image} alt={title} className="recommended-product-image" />
                </div>
            </div>
            <div className="recommended-product-info">
                <div
                    className="recommended-product-title-link"
                    onClick={() => navigate(`/product/${id}`, { state: { fromRecommended: true } })}
                    style={{ cursor: 'pointer' }}
                >
                    <h4 className="recommended-product-title">{title}</h4>
                </div>
                <div className="recommended-product-rating">
                    {Array(Math.floor(rating)).fill().map((_, i) => <span key={i} className="star">⭐</span>)}
                    <span className="recommended-product-reviews">{reviews.toLocaleString()}</span>
                </div>
                
                {best_seller_category && (
                    <div className="best-seller-badge">
                        <span className="best-seller-text">#1 Best Seller</span> 
                        <span className="best-seller-category-text">in {best_seller_category}</span>
                    </div>
                )}
                
                {deal && (
                    <div className="deal-container">
                        {deal.discount_percent && <span className="deal-discount-badge">{deal.discount_percent}% off</span>}
                        <span className="deal-type-badge">{deal.type}</span>
                    </div>
                )}
                
                <div className="recommended-product-price">
                    <span className="price-symbol">₹</span>
                    <span className="price-main">{Math.trunc(price).toLocaleString()}</span>
                    <span className="price-decimal">{String(price.toFixed(2)).split('.')[1]}</span>
                     {mrp > 0 && <span className="recommended-product-mrp">M.R.P: ₹{mrp.toLocaleString()}</span>}
                </div>
                <p className="recommended-product-delivery">Get it by <strong>Tomorrow, June 23</strong></p>
                <p className="recommended-product-delivery-faint">FREE Delivery by Amazon</p>
            </div>
        </div>
    );
};

export default RecommendedProductCard; 