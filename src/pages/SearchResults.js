import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import "../styles/SearchResults.css";

const API_KEY = "YOUR_SPOONACULAR_API_KEY";  // Replace with your key

function SearchResults() {
  const { query } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.results))
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="results">
      <h2>Search Results for "{query}"</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
