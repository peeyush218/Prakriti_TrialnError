import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts, getRecommendations } from "../api";
import "../Css/SearchResults.css";
import SearchResultProduct from "./SearchResultProduct";
import SearchSidebar from "./SearchSidebar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q") || "";
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await searchProducts(query);
      setResults(res);
      if (res.length > 0) {
        const recs = await getRecommendations(res[0].name || query);
        setRecommendations(recs.filter(r => !res.some(s => s.id === r.id)));
      } else {
        setRecommendations([]);
      }
      setLoading(false);
    }
    if (query) fetchData();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-results-page">
      <SearchSidebar />
      <div className="search-results-main">
        <h2 className="search-results-title">
          {`Results for "${query}" (${results.length})`}
        </h2>
        <div className="search-results-list">
          {results.map((product) => (
            <SearchResultProduct
              key={product.id}
              product={product}
            />
          ))}
        </div>
        {results.length === 0 && !loading && (
          <div className="search-no-results">No products found.</div>
        )}
        {recommendations.length > 0 && (
          <div className="search-recommend-section">
            <h3>You may also like</h3>
            <div className="search-results-list">
              {recommendations.map((product) => (
                <SearchResultProduct
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
