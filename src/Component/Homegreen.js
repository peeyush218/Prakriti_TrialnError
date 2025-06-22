import React from "react";
import "../Css/Homegreen.css";
import ImageSliderGreen from "./Imageslidegreen";
import CategoryCircles from "./CategoryCircles";
import ApparelCard from "./ApparelCard";

const apparelData = [
  { title: "", image: "../images/menapp.png" },
  { title: "", image: "../images/womenapp.png" },
  { title: "", image: "../images/kidsapp.png" },
  { title: "", image: "../images/household.png" },
  { title: "", image: "../images/beauty2.png" },
];

function Homegreen() {
  return (
    <div className="homeg-wrapper">
        <CategoryCircles />
        <div className="home__containerg">
            <ImageSliderGreen />
        </div>
        <div className="apparel-grid">
          {apparelData.map((item, index) => (
            <ApparelCard key={index} title={item.title} image={item.image} />
          ))}
        </div>
    </div>
  );
}

export default Homegreen;
