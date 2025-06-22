import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Css/SearchSidebar.css';
import { FaChevronDown } from 'react-icons/fa';

const StarRating = ({ stars, onRate, rating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span 
                        key={starValue} 
                        className={starValue <= rating ? 'star-filled' : 'star-empty'}
                        onClick={() => onRate(starValue)}
                    >
                        &#9733;
                    </span>
                );
            })}
            <span className="rating-text">& Up</span>
        </div>
    );
};

function SearchSidebar() {
    const [priceRange, setPriceRange] = useState([35, 109800]);
    const [rating, setRating] = useState(4);

    const handleRating = (rate) => {
        setRating(rate);
    }
  return (
    <div className="search-sidebar">
      <div className="sidebar-section no-border">
        <h3>Delivery Day</h3>
        <div>Get It by Tomorrow</div>
        <div>Get It in 2 Days</div>
      </div>

        <div className="sidebar-section no-border">
            <h3>Price</h3>
            <span className="price-label">₹{priceRange[0]} – ₹{priceRange[1]}+</span>
            <div className="price-slider">
                <Slider
                    range
                    min={35}
                    max={110000}
                    defaultValue={[35, 109800]}
                    onChange={(value) => setPriceRange(value)}
                />
                <button className="price-go-btn">Go</button>
            </div>
        </div>

        <div className="sidebar-section no-border">
            <h3>Deals & Discounts</h3>
            <ul className="deals-list">
                <li>All Discounts</li>
                <li>Today's Deals</li>
            </ul>
        </div>

        <div className="sidebar-section">
            <h3>Brands</h3>
            <div>ARISTO</div>
            <div>Kuber Industries</div>
            <div>House of Quirk</div>
            <div>Clazkit</div>
            <div>Amazon Brand - Solimo</div>
            <div>Nakoda</div>
            <div>FLYINGO</div>
            <a href="#" className="see-more">
                <FaChevronDown className="see-more-icon" />
                <span>See more</span>
            </a>
        </div>

      <div className="sidebar-section">
        <h3>Customer Review</h3>
        <StarRating rating={rating} onRate={handleRating} />
      </div>

        <div className="sidebar-section">
            <h3>Category</h3>
            <ul className="category-list">
                <li>Indoor Lighting</li>
            </ul>
        </div>

        <div className="sidebar-section">
            <h3>Material</h3>
            <div>Plastic</div>
            <div>Wood</div>
            <div>Fabric</div>
            <div>Cardboard</div>
            <div>Resin</div>
            <div>Acrylic</div>
            <div>Acrylonitrile Butadiene Styrene</div>
            <a href="#" className="see-more">
                <FaChevronDown className="see-more-icon" />
                <span>See more</span>
            </a>
        </div>
    </div>
  );
}

export default SearchSidebar; 
