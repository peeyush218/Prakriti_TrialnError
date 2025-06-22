import React from "react";
import "../Css/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <Link to="/green">
          <img className=" checkout__ad" src="../images/return_order.png" alt="" />
        </Link>
        <div>
          {basket?.length === 0 ? (
            <div className="checkout__empty">
              <img className="checkout__emptyImage" src="../images/box.png" alt="Empty Cart"/>
              <div>
                <h2>Your Shopping Cart is empty.</h2>
                <p>
                  You have no items in your basket. To buy one or more items, click
                  "Add to cart" next to the item.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="checkout__title">Your shopping Cart</h2>
              {basket.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  title={item.title}
                  quantity={item.quantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
