import React, { useState } from "react";
import "../Css/Headergreen.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");

  const handleLinkClick = () => {
    // Scroll to the top of the page when the link is clicked
    window.scrollTo(0, 0, { behavior: "instant" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // API call removed; search is now a no-op or can be handled locally if needed
  };

  return (
    <div className="headerg">
      <Link to="/">
        <img
          className="header__logo"
          src="../images/amazon.png"
          alt="amazon logo"
        />
      </Link>

      <div className="header__locationg">
        <img src="../images/location3.png" alt="location" className="header__locationIcong" />
        <div className="header__locationTextg">
          <span className="header__locationLineOneg">Delivering to Bengaluru 562130</span>
          <span className="header__locationLineTwog">Update location</span>
        </div>
      </div>

      <form className="header__searchg" onSubmit={handleSearch}>
        <div className="header__searchBoxg">
          <div className="header__searchDropdowng">
            <span>All</span>
            <span className="header__dropdownArrowg">▼</span>
          </div>
          <input
            className="header__searchInputg"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Amazon.in"
          />
          <button type="submit" className="header__searchButtong">
            <img
              src="../images/search-icon-png-9974.png"
              className="header__searchIcong"
              alt="search"
            />
          </button>
        </div>
      </form>

      <div className="header__langg">
        <img src="../images/india-flag-icon.webp" alt="IN" className="header__langFlagg" />
        <span className="header__langTextg">EN</span>
      </div>

      <div className="header__navg">
        <Link style={{ textDecoration: "none" }} to="/login">
          <div className="header__optiong">
            <span className="header__optionLineOneg">Hello, sign in</span>
            <span className="header__optionLineTwog">Account & Lists</span>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/orders">
          <div className="header__optiong">
            <span className="header__optionLineOneg">Returns</span>
            <span className="header__optionLineTwog">& Orders</span>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <div className="header__optiong">
            <span className="header__optionLineOneg">Your</span>
            <span className="header__optionLineTwog">Dashboard</span>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/checkout"
          onClick={handleLinkClick}
        >
          <div className="header__optionBasketg">
            <img
              src="../images/cart_icon.png"
              className="header__cartIcong"
              alt="cart"
            />
            <span className="header_optionLineTwog header_basketCountg">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
