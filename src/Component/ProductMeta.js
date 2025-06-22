import React from 'react';
import './../Css/ProductMeta.css';

function ProductMeta({ rating, reviews, price, originalPrice, isPrime, isSimple }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  if (isSimple) {
    return (
      <div className="product-meta-simple">
        <div className="product-meta-simple__rating">
          {[...Array(fullStars)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
          {hasHalfStar && <span>🌟</span>}
        </div>
        <p className="product-meta-simple__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
      </div>
    );
  }

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-meta">
      <div className="meta-row">
        <div className="stars-container">{renderStars()}</div>
        <span className="reviews-count">{reviews}</span>
      </div>
      <div className="meta-row">
        <span className="price">
          <sup>₹</sup>{price}
        </span>
        {originalPrice && (
            <span className="original-price">
              <s>₹{originalPrice}</s>
            </span>
        )}
        {isPrime && <img src="../images/primetick.png" alt="Prime" className="prime-logo" />}
      </div>
    </div>
  );
}

export default ProductMeta; 