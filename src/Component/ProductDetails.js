import React, { useState, useEffect } from "react";
import "../Css/ProductDetails.css";
import { useParams, useLocation } from "react-router-dom";
import { getProductById, getRecommendations } from "../api";
import { useStateValue } from "../StateProvider";
import { FaShareAlt, FaRegHeart, FaAmazon, FaLeaf } from "react-icons/fa";
import { IoLocationOutline, IoLockClosedOutline } from "react-icons/io5";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { RiShieldCheckLine } from "react-icons/ri";
import { SlTrophy } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import SearchResultProduct from "./SearchResultProduct";
import HorizontalScroller from "./HorizontalScroller";
import LeafRating from "./LeafRating";

// Mock data to fill in the design
const mockData = {
    brand: "ZEXSAZONE",
    reviews: 289,
    boughtInPastMonth: "100+",
    mrp_discount: 37,
    delivery_date: "Friday, 27 June",
    order_in_time: "22 hrs 58 mins",
    location: "Bengaluru 562130",
    sold_by: "APRO India Services Pvt. Ltd.",
    payment_method: "Secure transaction",
    offers: [
        { title: "Cashback", text: "Upto ₹28.00 cashback as Amazon Pay Balance when you pay on Amazon.in using an Amazon Pay balance.", link_text: "1 offer ›" },
        { title: "Bank Offer", text: "Upto ₹94.90 Discount on Canara Bank Credit Cards", link_text: "1 offer ›" },
        { title: "Partner Offers", text: "3% off any 2, 5% off any 3, 7% off any 4. 10% off any 5", link_text: "View 2 offers ›" },
    ],
    features: [
        { text: "Free Delivery", icon: <TbTruckDelivery /> },
        { text: "Pay on Delivery", icon: <BsCashCoin /> },
        { text: "7 days\nExchange &\nReplacement", icon: <TbReplace /> },
        { text: "6 Month\nWarranty", icon: <RiShieldCheckLine /> },
        { text: "Top Brand", icon: <SlTrophy /> },
        { text: "Amazon\nDelivered", icon: <FaAmazon /> },
        { text: "Secure\ntransaction", icon: <IoLockClosedOutline /> }
    ]
};

function ProductDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, dispatch] = useStateValue();

    // Generate a random leaf rating between 2.5 and 5 (in 0.5 increments) for sustainable products
    const randomLeafRating = React.useMemo(() => {
        if (product && product.is_sustainable) {
            // 2.5, 3, 3.5, 4, 4.5, 5
            const steps = [2.5, 3, 3.5, 4, 4.5, 5];
            return steps[Math.floor(Math.random() * steps.length)];
        }
        return null;
    }, [product]);

    useEffect(() => {
        const fetchProductAndRecommendations = async () => {
            setLoading(true);
            try {
                const found = await getProductById(id);
                setProduct(found);
                if (found) {
                    const recs = await getRecommendations(found.title, true);
                    // Add mock properties for demonstration
                    const enhancedRecs = recs.map(r => {
                        const hasDeal = Math.random() > 0.7;
                        return {
                            ...r,
                            reviews: Math.floor(Math.random() * 5000) + 1,
                            mrp: Math.floor(r.price * (Math.random() * 0.5 + 1.1)), // 10% to 60% higher
                            best_seller_category: Math.random() > 0.8 ? "Pet Supplies" : null,
                            deal: hasDeal ? {
                                type: "Limited time deal",
                                discount_percent: Math.floor(Math.random() * 20) + 5, // 5% to 25%
                            } : null,
                        }
                    });
                    setRecommendations(enhancedRecs.filter(r => String(r.id) !== String(id)));
                }
            } catch (error) {
                console.error("Failed to fetch product or recommendations:", error);
                setRecommendations([]); // Ensure it's an array on error
            }
            setLoading(false);
        };
        fetchProductAndRecommendations();
    }, [id]);

    if (loading) return <div className="loading-state">Loading...</div>;
    if (!product) return <div className="loading-state">Product not found.</div>;

    const { title, image, price, rating } = product;

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: { ...product, quantity: 1 },
        });
    };
    
    const alsoBoughtProducts = recommendations.slice(0, 10);
    const alsoLikedProducts = recommendations.slice(10, 16);

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                {/* Left Column: Image Gallery */}
                <div className="product-image-gallery">
                    <div className="product-main-image">
                        <img src={image} alt={title} />
                        <div className="product-actions">
                            <FaRegHeart />
                            <FaShareAlt />
                        </div>
                    </div>
                </div>

                {/* Middle Column: Product Info */}
                <div className="product-info">
                    <h1 className="product-title">{title}</h1>
                    <a href="#" className="product-brand-link">Visit the {mockData.brand} Store</a>
                    <div className="product-rating">
                        <span>{rating}</span>
                        {Array(Math.round(rating || 0)).fill().map((_, i) => <span key={i} className="star">⭐</span>)}
                        <a href="#" className="product-reviews-link">{mockData.reviews.toLocaleString()} ratings</a>
                    </div>
                    {product.is_sustainable && randomLeafRating && (
                        <LeafRating initialRating={randomLeafRating} />
                    )}
                    <div className="amazon-choice">Amazon's Choice</div>
                    <div className="past-purchase-info">{mockData.boughtInPastMonth}+ bought in past month</div>
                    <hr />
                    <div className="product-price-section">
                        <span className="product-discount">-{mockData.mrp_discount}%</span>
                        <span className="product-price">
                            <span className="currency-symbol">₹</span>{price.toLocaleString()}
                        </span>
                        <span className="product-mrp">M.R.P.: ₹{Math.floor(price / (1 - mockData.mrp_discount / 100)).toLocaleString()}</span>
                    </div>
                    <p className="tax-info">Inclusive of all taxes</p>

                    <div className="offers-section">
                        <h3>Offers</h3>
                        <div className="offers-grid">
                            {mockData.offers.map(offer => (
                                <div className="offer-card" key={offer.title}>
                                    <h4>{offer.title}</h4>
                                    <p>{offer.text}</p>
                                    <a href="#">{offer.link_text}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className="product-features">
                        {mockData.features.map(feature => (
                            <div className="feature-item" key={feature.text}>
                                <div className="feature-icon">{feature.icon}</div>
                                <span className="feature-text">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Purchase Box */}
                <div className="product-purchase-box">
                    <div className="purchase-price">
                        <span className="currency-symbol">₹</span>
                        {price.toLocaleString()}
                        <span className="price-decimal">00</span>
                        <span className="price-per-count"> ({price.toLocaleString()} / count)</span>
                    </div>

                    <p className="delivery-info">
                        <a href="#">FREE delivery</a> <strong>{mockData.delivery_date}.</strong>
                    </p>
                    <p className="delivery-details">
                        Order within <span className="delivery-time">{mockData.order_in_time}</span>. <a href="#">Details</a>
                    </p>

                    <div className="delivery-location">
                        <IoLocationOutline />
                        <span>Delivering to {mockData.location} - <a href="#">Update location</a></span>
                    </div>

                    <p className="stock-status">In stock</p>
                    
                    <div className="quantity-selector">
                        <select name="quantity" id="quantity">
                            <option value="1">Quantity: 1</option>
                            <option value="2">Quantity: 2</option>
                            <option value="3">Quantity: 3</option>
                        </select>
                    </div>

                    <button className="add-to-cart-btn" onClick={addToBasket}>Add to Cart</button>
                    <button className="buy-now-btn">Buy Now</button>
                    
                    <div className="seller-details">
                        <div className="seller-row">
                            <span className="seller-label">Ships from</span>
                            <span className="seller-value">Amazon</span>
                        </div>
                        <div className="seller-row">
                            <span className="seller-label">Sold by</span>
                            <span className="seller-value"><a href="#">{mockData.sold_by}</a></span>
                        </div>
                        <div className="seller-row">
                            <span className="seller-label">Payment</span>
                            <span className="seller-value">{mockData.payment_method}</span>
                        </div>
                    </div>

                    <button className="add-to-wishlist-btn">Add to Wish List</button>
                </div>
            </div>

            {alsoBoughtProducts.length > 0 && (
                <HorizontalScroller
                    title={
                        <>
                            Sustainable Alternatives procured by{' '}
                            <span className="prakriti-ai-highlight">
                                <FaLeaf /> Prakriti AI
                            </span>
                        </>
                    }
                    products={alsoBoughtProducts}
                />
            )}

            {alsoLikedProducts.length > 0 && (
                <div className="recommendations-container">
                    <h2 className="recommendations-title">You may also like</h2>
                    <div className="recommendations-grid">
                        {alsoLikedProducts.map((recProduct) => (
                            <SearchResultProduct key={recProduct.id} product={recProduct} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
