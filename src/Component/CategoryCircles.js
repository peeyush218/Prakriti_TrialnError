import React from 'react';
import './../Css/CategoryCircles.css';

const categoriesData = [
    { name: "Fashion & Textile", image: "../images/c1.png" },
    { name: "Furniture", image: "../images/c2.png" },
    { name: "Cosmetics", image: "../images/c3.png" },
    { name: "Cleaning", image: "../images/c4.png" },
    { name: "Stationery", image: "../images/c5.png" },
    { name: "Gifts", image: "../images/c6.png" },
    { name: "Toys", image: "../images/c7.png" },
    { name: "Personal Care", image: "../images/c8.png" },
    { name: "Gadgets", image: "../images/c9a.webp" },
    { name: "Food", image: "../images/c10a.webp" },
    { name: "More", image: "../images/c11a.png" } 
];

function CategoryCircles() {
    return (
        <div className="category-circles">
            {categoriesData.map((category, index) => (
                <div key={index} className="category-item">
                    <div className="category-image-container">
                        <img src={category.image} alt={category.name} />
                    </div>
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CategoryCircles; 