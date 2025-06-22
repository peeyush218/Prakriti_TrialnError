import React from "react";
import "../Css/CheckoutProduct.css";
import { useStateValue } from "../StateProvider";

function CheckoutProduct({ id, image, title, price, rating, quantity }) {
  const [, dispatch] = useStateValue();

  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      id: id,
    });
  };

  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      id: id,
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const validRating = Math.max(0, Math.round(rating || 0));

  return (
    <div className="checkoutProduct">
      <img src={image} alt={title} className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <div className="checkoutProduct__rating">
          {Array(validRating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__quantity">
          <span style={{ marginRight: '10px' }}>Quantity:</span>
          <button onClick={decreaseQuantity} style={{ marginRight: '5px' }}>-</button>
          <span style={{ margin: '0 5px', fontWeight: 'bold' }}>{quantity}</span>
          <button onClick={increaseQuantity} style={{ marginLeft: '5px' }}>+</button>
        </div>
        
        <button className="checkoutProduct__remove" onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
