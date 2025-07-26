// src/screens/CategoriesScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/categories.css'; // Import screen-specific CSS

const categoriesData = {
    "Dish Types": [
        "Main Course", "Side Dish", "Dessert", "Appetizer", "Salad",
        "Bread", "Breakfast", "Soup", "Beverage", "Sauce", "Marinade",
        "Fingerfood", "Snack", "Drink",
    ],
    "Cuisines": [
        "African", "Asian", "American", "British", "Cajun", "Caribbean",
        "Chinese", "Eastern European", "European", "French", "German",
        "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
        "Korean", "Latin American", "Mediterranean", "Mexican",
        "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai",
        "Vietnamese",
    ],
    "Diets": [
        "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
        "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal",
        "Low FODMAP", "Whole30",
    ],
    "Allergies": [
        "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame",
        "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat",
    ],
};

const getCategoryColors = (category) => {
    switch (category) {
        case "Dish Types":
            return { start: "#6F81C1", end: "#5C80DA" };
        case "Cuisines":
            return { start: "#E2EBFD", end: "#6F81C1" };
        case "Diets":
            return { start: "#F3756D", end: "#D45562" };
        case "Allergies":
            return { start: "#F48BA5", end: "#C05774" };
        default:
            return { start: "#6F81C1", end: "#5C80DA" };
    }
};

const CategoriesScreen = () => {
    const navigate = useNavigate();

    const handleCategorySelected = (categoryName, selectedItem) => {
        alert(`Navigating to search for: ${selectedItem} under ${categoryName}`);
        // In a real app, you'd navigate to a search results page with filters
        // navigate(`/search?filter=${encodeURIComponent(selectedItem)}`);
    };

    return (
        <div className="categories-page-container">
            <header className="app-bar">
                <h1>Categories</h1>
            </header>
            <main className="categories-list">
                {Object.keys(categoriesData).map((categoryName) => {
                    const categoryItems = categoriesData[categoryName];
                    const colors = getCategoryColors(categoryName);
                    return (
                        <div key={categoryName} className="category-group">
                            <h2 className="category-group-title">{categoryName}</h2>
                            <div className="category-items-scroll">
                                {categoryItems.map((item) => (
                                    <div
                                        key={item}
                                        className="category-card"
                                        style={{
                                            '--color-start': colors.start,
                                            '--color-end': colors.end,
                                        }}
                                        onClick={() => handleCategorySelected(categoryName, item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default CategoriesScreen;