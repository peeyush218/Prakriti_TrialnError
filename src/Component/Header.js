import React, { useState } from "react";
import "../Css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { searchProducts } from '../api';
import { getBasketItemCount } from "./reducer";

function Header({ onSearchResults }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const totalItems = getBasketItemCount(basket);

  const handleLinkClick = () => {
    // Scroll to the top of the page when the link is clicked
    window.scrollTo(0, 0, { behavior: "instant" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="../images/amazon.png"
          alt="amazon logo"
        />
      </Link>

      <div className="header__location">
        <img src="../images/location3.png" alt="location" className="header__locationIcon" />
        <div className="header__locationText">
          <span className="header__locationLineOne">Delivering to Bengaluru 562130</span>
          <span className="header__locationLineTwo">Update location</span>
        </div>
      </div>

      <form className="header__search" onSubmit={handleSearch}>
        <div className="header__searchBox">
          <div className="header__searchDropdown">All <span className="header__dropdownArrow">▼</span></div>
          <input
            className="header__searchInput"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Amazon.in"
          />
          <button type="submit" className="header__searchButton">
            <img
              src="../images/search_icon.png"
              className="header__searchIcon"
              alt="search"
            />
          </button>
        </div>
      </form>

      <div className="header__lang">
        <img src="../images/india-flag-icon.webp" alt="IN" className="header__langFlag" />
        <span className="header__langText">EN</span>
      </div>

      <div className="header__nav">
        <Link style={{ textDecoration: "none" }} to="/login">
          <div className="header__option">
            <span className="header__optionLineOne">Hello, sign in</span>
            <span className="header__optionLineTwo">Account & Lists</span>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/checkout"
          onClick={handleLinkClick}
        >
          <div className="header__optionBasket">
            <img
              src="../images/cart_icon.png"
              className="header__cartIcon"
              alt="cart"
            />
            <span className="header__optionLineTwo header__basketCount">
              {totalItems}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
