import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import '../Css/LeafRating.css';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const LeafRating = ({ initialRating = 4 }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    // Dynamic values based on initialRating (2.5 to 5)
    const ecoPercent = clamp(Math.round(60 + (initialRating - 2.5) * 16), 60, 100); // 2.5 -> 60, 5 -> 100
    let carbonReduced = clamp(Math.round(10 + (initialRating - 2.5) * 7), 10, 40); // 2.5 -> 10, 5 -> 40
    carbonReduced = clamp(Math.round(carbonReduced * 1.3), 13, 52); // Increase by 30%, clamp to 52 max
    const recycleChance = true;

    return (
        <div
            className="leaf-rating"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span key={index}>
                        <FaLeaf
                            className="leaf-icon"
                            color={ratingValue <= initialRating ? '#8BC34A' : '#e4e5e9'}
                            size={20}
                        />
                    </span>
                );
            })}
            {showTooltip && (
                <div className="leaf-tooltip">
                    <div className="leaf-tooltip-title">Prakritik Score</div>
                    <div className="leaf-tooltip-row">
                        <span>Eco-friendly Use</span>
                        <div className="leaf-tooltip-bar">
                            <div style={{width: `${ecoPercent}%`}} className="leaf-tooltip-bar-fill"></div>
                        </div>
                        <span>{ecoPercent}%</span>
                    </div>
                    <div className="leaf-tooltip-row">
                        <span>Carbon Reduced</span>
                        <div className="leaf-tooltip-bar">
                            <div style={{width: `${carbonReduced}%`}} className="leaf-tooltip-bar-fill"></div>
                        </div>
                        <span>{carbonReduced}%</span>
                    </div>
                    <div className="leaf-tooltip-row">
                        <span>Recyclable</span>
                        <span className="leaf-tooltip-check">{recycleChance ? '✔️' : '❌'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeafRating; 