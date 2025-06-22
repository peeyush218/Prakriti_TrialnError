import React from 'react';
import './../Css/ApparelCard.css';

function ApparelCard({ title, image }) {
    return (
        <div className="apparel-card">
            <img src={image} alt={title} className="apparel-card__image" />
            <div className="apparel-card__overlay">
                <h3 className="apparel-card__title">{title}</h3>
            </div>
        </div>
    );
}

export default ApparelCard; 