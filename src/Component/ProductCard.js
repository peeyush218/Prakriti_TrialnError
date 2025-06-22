import React from 'react';
import './../Css/ProductCard.css';
import ProductMeta from './ProductMeta';

function ProductCard({
  id,
  title,
  items,
  footerLink,
  isSignIn,
  meta,
  image,
  price,
  rating,
  isSimple,
}) {

  if (isSignIn) {
    return (
      <div className="product-card product-card--signin">
        <h2>{title}</h2>
        <button>Sign in securely</button>
      </div>
    );
  }

  if (isSimple) {
    return (
      <div className="product-card-simple">
        <a href={`/product/${id}`}>
          <div className="product-card-simple__image">
            <img src={image} alt={title} />
          </div>
          <div className="product-card-simple__info">
            <h3 className="product-card-simple__title">{title}</h3>
            <ProductMeta rating={rating} price={price} isSimple={true} />
          </div>
        </a>
      </div>
    );
  }

  // Card for single sponsored items or other single-image cards
  if (items.length === 1) {
     const item = items[0];
     const cardClass = `product-card ${meta ? 'product-card--sponsored' : ''}`;
     return (
        <div className={cardClass}>
            <h2>{title}</h2>
            <div className="product-card__single-image-container">
              <img src={item.image} alt={item.caption} className="product-card__single-image"/>
            </div>
            {meta ? (
              <ProductMeta {...meta} />
            ) : (
              <p className="product-card__single-caption">{item.caption}</p>
            )}
            {footerLink && (
              <a href="#" className="product-card__footer">
                {footerLink}
              </a>
            )}
        </div>
     )
  }

  return (
    <div className="product-card">
      <h2>{title}</h2>
      <div className="product-card__grid">
        {items.map((item, index) => (
          <div key={index} className="product-card__item-link">
            <div className="product-card__item-image-container">
              <img src={item.image} alt={item.caption} />
            </div>
            <span>{item.caption}</span>
          </div>
        ))}
      </div>
      {footerLink && (
        <a href="#" className="product-card__footer">
          {footerLink}
        </a>
      )}
    </div>
  );
}

export default ProductCard; 