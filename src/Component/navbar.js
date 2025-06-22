import React, { useEffect, useState } from 'react';
import '../Css/navbar.css'; // Import your CSS file for styling
import {Link} from "react-router-dom";

const AmazonNavigationBar = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const closePopover = () => {
    setDontShowAgain(true);
    setShowPopover(false);
  };

  // useEffect(() => {
  //   if(showPopover) {
  //     const timeout = setTimeout(() => {
  //       setShowPopover(false);
  //     }, 5000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [showPopover]);

  // useEffect(() => {
  //   const item = document.getElementById('itemToTrack');

  //   const handleScroll = () => {
  //     const itemRect = item.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;

  //     if (itemRect.top < windowHeight && itemRect.bottom > 70) {
  //       setShowPopover(true);
  //     } else {
  //       setShowPopover(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="amazon-nav">
      <div className="amazon-nav-section">
        <ul className="amazon-nav-list">
          <li>
            <span style={{display: 'flex', alignItems: 'center'}}>
              {/* Menu icon SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                <line x1="1" y1="13" x2="22" y2="13" />
                <line x1="1" y1="5" x2="22" y2="5" />
                <line x1="1" y1="21" x2="22" y2="21" />
              </svg>
              All
            </span>
          </li>
          <li><a href="#">Fresh</a></li>
          <li><a href="#">Today's Deals</a></li>
          <li><a href="#">Buy Again</a></li>
          <li><a href="#">Electronics</a></li>
          <li><a href="#">Amazon Pay</a></li>
          <li><a href="#">Home & Kitchen</a></li>
          <li><a href="#">MX Player</a></li>
          <li><a href="#">Sell</a></li>
          <li><a href="#">Gift cards</a></li>
          <li><a href="#">Health, Household & Personal Care</a></li>
          
          <div className='popover_trigger_nav'>
            <Link style={{textDecoration: 'none'}} to = "/green">
              <button id='itemToTrack' className="button">Prakriti</button>
            </Link>
          </div>
          </ul>
      </div>
    </div>
  );
};

export default AmazonNavigationBar;
