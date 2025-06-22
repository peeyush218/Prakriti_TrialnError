import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import '../Css/LeafRating.css';

const LeafRating = ({ initialRating = 4 }) => {
    return (
        <div className="leaf-rating">
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
        </div>
    );
};

export default LeafRating; 