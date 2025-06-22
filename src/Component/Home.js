import React, { useState, useEffect } from "react";
import "../Css/Home.css";
import ImageSlider from "./Imageslider";
import ProductCard from "./ProductCard";
import HorizontalScroller from "./HorizontalScroller";
import ProductRow from "./ProductRow";
import { getAllProducts } from "../api";

// Main card data
const cardData = [
  {
    title: "Appliances for your home | Up to 55% off",
    items: [
      { image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg", caption: "Air conditioners" },
      { image: "/images/refrigerator.jpg", caption: "Refrigerators" },
      { image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg", caption: "Microwaves" },
      { image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg", caption: "Washing machines" },
    ],
    footerLink: "See more",
  },
  {
    title: "Revamp your home in style",
    items: [
      { image: "/images/cushion.jpg", caption: "Cushion covers, bedsheets & more" },
      { image: "/images/vases.jpg", caption: "Figurines, vases & more" },
      { image: "/images/homestorage.jpg", caption: "Home storage" },
      { image: "/images/lighting.jpg", caption: "Lighting solutions" },
    ],
    footerLink: "Explore all",
  },
  {
    title: "PlayStation 5 Slim & Accessories",
    items: [
        { image: "/images/ps51.jpg", caption: "PS5 Slim digital edition" },
        { image: "/images/ps5disc.jpg", caption: "PS5 Slim disc edition" },
        { image: "/images/ps5digital.jpg", caption: "PS5 Slim Fortnite digital edition" },
        { image: "/images/ps5dual.jpg", caption: "PS5 DualSense Wireless Controller" },
    ],
    footerLink: "See all deals",
  },
  {
    title: "Under ₹499 | Deals on home improvement essentials",
    items: [
        { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/HI/SYED/ATF/QC-adapts_186x116_4._SY116_CB600489960_.jpg", caption: "Cleaning accessories" },
        { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/HI/SYED/ATF/QC-adapts_186x116_3._SY116_CB600489960_.jpg", caption: "Bathroom hardware" },
        { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/HI/SYED/ATF/QC-adapts_186x116_7._SY116_CB600489960_.jpg", caption: "Hammers, screwdrivers" },
        { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/HI/SYED/ATF/QC-adapts_186x116_5._SY116_CB600489960_.jpg", caption: "Extension boards, plugs" },
    ],
    footerLink: "See all deals"
  },
  {
    title: "Starting ₹149 | Headphones",
    items: [
      { image: "/images/st249.jpg", caption: "Starting ₹249 | boAt" },
      { image: "/images/st349.jpg", caption: "Starting ₹349 | boult" },
      { image: "/images/st649.jpg", caption: "Starting ₹649 | Noise" },
      { image: "/images/st149.jpg", caption: "Starting ₹149 | Zebronics" },
    ],
    footerLink: "See all offers",
  },
  {
      title: "Automotive essentials | Up to 60% off",
      items: [
          { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Glasscare1X._SY116_CB410830553_.jpg", caption: "Cleaning accessories" },
          { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Rim_tyrecare1x._SY116_CB410830552_.jpg", caption: "Tyre & rim care" },
          { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vega_helmet_186x116._SY116_CB405090404_.jpg", caption: "Helmets" },
          { image: "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/2020/GW/PCQC/Vaccum1x._SY116_CB410830552_.jpg", caption: "Vacuum cleaner" },
      ],
      footerLink: "See more"
  },
  {
      title: "Min. 40% off | Baby care & toys | Amazon brands",
      items: [
          { image: "/images/diaper.jpg", caption: "Min. 50% off | Diapers & wipes" },
          { image: "/images/chairs.jpg", caption: "Min. 50% off | High chairs, rockers & more" },
          { image: "/images/softtoy.jpg", caption: "Min. 40% off | soft toys" },
          { image: "/images/indoor.jpg", caption: "Min. 40% off | Indoor & outdoor games" },
      ],
      footerLink: "See all offers"
  }
];

// Special cards for the stacked column
const signInCardData = {
  isSignIn: true,
  title: "Sign in for your best experience",
  items: [],
};

const sponsoredCardData = {
  title: "PEARLPET Throttle BPA-free Plastic Water Bottle For Home..",
  items: [
    {
      image: '/images/perplet.png',
      caption: 'Sponsored'
    }
  ],
  meta: {
    rating: 4,
    reviews: 896,
    price: "532.00",
    originalPrice: "900.00",
    isPrime: true,
  }
};

// Data for the horizontal scroller
const relatedItems = [
  { image: "/images/recent1.jpg" },
  { image: "/images/recent2.jpg" },
  { image: "/images/recent3.jpg" },
  { image: "/images/recent4.jpg" },
  { image: "/images/recent5.jpg" },
  { image: "/images/recent6.jpg" },
  { image: "/images/recent7.jpg" },
  { image: "/images/recent8.jpg" },
  { image: "/images/recent9.jpg" }
];

function Home() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getAllProducts();
      setAllProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        {/* <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        /> */}
        <ImageSlider/>

        <div className="home__grid">
          {/* Render first 3 cards */}
          {cardData.slice(0, 3).map((card, index) => (
            <ProductCard key={index} {...card} />
          ))}

          {/* Render the stacked column */}
          <div className="grid-column-stacked">
            <ProductCard {...signInCardData} />
            <ProductCard {...sponsoredCardData} />
          </div>

          {/* Render remaining cards */}
          {cardData.slice(3).map((card, index) => (
            <ProductCard key={index + 4} {...card} />
          ))}
        </div>

        {allProducts.length > 0 && (
          <ProductRow title="All Products" items={allProducts} />
        )}

        {/* Add the new horizontal scroller section */}
        <HorizontalScroller
          title="Related to items you've viewed"
          items={relatedItems}
        />
      </div>
    </div>
  );
}

export default Home;
