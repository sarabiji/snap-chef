import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) navigate(`/search/${query}`);
  };

  return (
    <div className="home">
      <h1>🍳 Welcome to SnapChef</h1>
      <p>Discover recipes with ingredients you already have!</p>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
    </div>
  );
}

export default Home;
