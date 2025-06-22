import React from 'react';
import RecommendedProductCard from './RecommendedProductCard';
import '../Css/HorizontalScroller.css';

const HorizontalScroller = ({ title, products }) => {
    if (!products || products.length === 0) {
        return null;
    }

    const scrollLeft = () => {
        document.getElementById(`scroller-${title}`).scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        document.getElementById(`scroller-${title}`).scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="horizontal-scroller-container">
            <h2 className="scroller-title">{title}</h2>
            <div className="scroller-wrapper">
                <div className="scroller" id={`scroller-${title}`}>
                    {products.map((product) => (
                        <RecommendedProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HorizontalScroller; 
