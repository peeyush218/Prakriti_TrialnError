import React from 'react';
import ProductCard from './ProductCard';
import '../Css/ProductRow.css';

function ProductRow({ title, items }) {
  return (
    <div className="product-row">
      <h2>{title}</h2>
      <div className="product-row__items">
        {items.map(item => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
            isSimple={true}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductRow; 