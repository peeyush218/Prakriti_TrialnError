import React from 'react';
import '../Css/navbargreen.css';
import { Link } from 'react-router-dom';
//import Popover from './Popover';

const AmazonNavigationBarg = () => {
  return (
    <div className="amazon-nav">
      <div className="amazon-nav-section">
        <ul className="amazon-nav-list">
          <li><Link to="/green" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link></li>
          <li className="non-clickable-link">Today's Deals</li>
          <li className="non-clickable-link">Amazon Pay</li>
          <li className="non-clickable-link">MX Player</li>
          <li className="non-clickable-link">Personal Care</li>
          <li><Link to="/seller" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Seller</Link></li>
          <li><Link to="/prakriti-ai" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Prakriti AI</Link></li>
          <li><Link to="/leaderboard" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Leaderboard</Link></li>
          <li><Link to="/forum" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Forum</Link></li>
          <li><Link to="/order-pooling" style={{ color: '#146eb4', textDecoration: 'none', fontWeight: 'bold' }}>Order Pooling</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AmazonNavigationBarg;
