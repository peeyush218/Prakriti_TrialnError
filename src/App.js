import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Header";
import Home from "./Component/Home";
import NavBar from "./Component/navbar";
import Checkout from "./Component/Checkout"
import Login from "./Component/Login";
import Headergreen from "./Component/Headergreen";
import Homegreen from "./Component/Homegreen";
import NavBarg from "./Component/navbargreen";
import { BrowserRouter as Router, Routes, Route, useLocation, useMatch } from "react-router-dom";
import EducationSection from "./Component/Educationsection";
import SustainabilityReportsSection from "./Component/Sustainability";
import Footer from "./Component/Footer";
import Orders from "./Component/Orders";
import Thanks from "./Component/thanks";
import SellerSection from "./Component/SellerSection";
import Submitted from "./Component/Submitted";
import Dashboard from "./Component/Dashboard";
import Feedback from "./Component/feedback";
import ProductDetails from "./Component/ProductDetails";
import ProductDetails1 from "./Component/ProductDetails1";
import FSubmitted from "./Component/Feedbacksubmitted";
import SearchResults from "./Component/SearchResults";
import Sustainability from './Component/Sustainability';
import Forum from './Component/Forum';
import Leaderboard from './Component/Leaderboard';
import OrderPooling from './Component/OrderPooling';
import PostDetail from './Component/PostDetail';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  // Custom wrapper to use hooks inside Router
  function ProductRouteWrapper() {
    const location = useLocation();
    const isProductDetails = useMatch("/product/:id");
    const fromRecommended =
      location.state?.fromRecommended ||
      new URLSearchParams(location.search).get("fromRecommended") === "true";
    let header, nav;
    if (isProductDetails && fromRecommended) {
      header = <Headergreen />;
      nav = <NavBarg />;
    } else {
      header = <Header />;
      nav = <NavBar />;
    }
    return (
      <>
        {header}
        {nav}
        <ProductDetails />
        <Footer />
      </>
    );
  }

  return (
    // BEM
    <Router>
      <div className="app">
        <Routes>
          
          <Route path="/feedbacksubmitted" element={[<Headergreen/>, <NavBarg/>, <FSubmitted/>]}/>
          <Route path="/feedback" element={[<Headergreen/>, <NavBarg/>, <Feedback/>, <Footer/>]}/> 
          <Route path="/submitted" element={[<Headergreen/>, <NavBarg/>, <Submitted/>, <Footer/>]}/> 
          <Route path="/seller" element={[<Headergreen/>, <NavBarg/>, <SellerSection/>, <Footer/>]}/> 
          <Route path="/thanks" element={[<Header />, <Thanks/>]}/> 
          <Route path="/orders" element={[<Header />, <NavBar />, <Orders />, <Footer />]}/>
          <Route path="/sustainability" element={[<Headergreen/>, <NavBarg/>, <Sustainability/>, <Footer/>]}/>
          <Route path="/forum" element={[<Headergreen/>, <NavBarg/>, <Forum/>, <Footer/>]}/>
          <Route path="/leaderboard" element={[<Headergreen/>, <NavBarg/>, <Leaderboard/>, <Footer/>]}/>
          <Route path="/order-pooling" element={[<Headergreen/>, <NavBarg/>, <OrderPooling/>, <Footer/>]}/>
          <Route path="/post/:id" element={[<Headergreen/>, <NavBarg/>, <PostDetail/>, <Footer/>]}/>
          <Route path="/prakriti-ai" element={<EducationSection/> }/>
          <Route path="/green" element={[<Headergreen/>,<NavBarg/>, <Homegreen/>, <Footer/>  ]}/>
          <Route path="/login" element={[<Header />, <NavBar />, <Login />, <Footer />]}/> 
          <Route path="/checkout" element={[<Header />, <NavBar />, <Checkout />, <Footer />]}/>
          <Route path="/search" element={[
            <Header />, 
            <NavBar />, 
            <SearchResults />, 
            <Footer/>
          ]}/>
          <Route path="/" element={[
            <Header />, 
            <NavBar />, 
            <Home />, 
            <Footer/>
          ]}/>
          <Route path="/dashboard" element={[<Header />, <NavBarg/>, <Dashboard/>]} />
          <Route path="/product" element={[<Headergreen />, <NavBarg />, <ProductDetails />, <Footer />]}/>
          <Route path="/product1" element={[<Headergreen />, <NavBarg />, <ProductDetails1 />, <Footer />]}/>
          <Route path="/product/:id" element={<ProductRouteWrapper />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

