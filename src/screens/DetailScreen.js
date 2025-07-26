// src/screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import BookmarkService from '../services/BookmarkService';
import LoadingSpinner from '../components/LoadingSpinner';
import { RecipeModel } from '../models/RecipeModel'; // Import RecipeModel
import './styles/detail.css'; // Import screen-specific CSS

const DetailScreen = () => {
    const { id } = useParams(); // Get recipe ID from URL params
    const navigate = useNavigate();
    const location = useLocation(); // To access state passed during navigation

    const [recipe, setRecipe] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
    const [isLoadingBookmarkStatus, setIsLoadingBookmarkStatus] = useState(true);

    // Function to fetch recipe details
    const fetchRecipeDetails = async () => {
        setIsLoadingRecipe(true);
        try {
            // Check if recipe data was passed via state (e.g., from BookmarksScreen)
            const preloadedRecipe = location.state?.recipe;
            if (preloadedRecipe && preloadedRecipe.id === parseInt(id)) {
                setRecipe(preloadedRecipe);
            } else {
                // If not preloaded, fetch from service
                const fetchedRecipe = await RecipeService.fetchRecipeDetails(parseInt(id));
                setRecipe(fetchedRecipe);
            }
        } catch (error) {
            console.error("Failed to fetch recipe details:", error);
            alert('Failed to load recipe details.');
            setRecipe(null); // Clear recipe on error
        } finally {
            setIsLoadingRecipe(false);
        }
    };

    // Function to check bookmark status
    const checkIfBookmarked = async () => {
        if (!recipe) return; // Only check if recipe data is loaded
        setIsLoadingBookmarkStatus(true);
        try {
            const bookmarked = await BookmarkService.isBookmarked(recipe.id);
            setIsBookmarked(bookmarked);
        } catch (error) {
            console.error("Failed to check bookmark status:", error);
            setIsBookmarked(false);
        } finally {
            setIsLoadingBookmarkStatus(false);
        }
    };

    // Toggle bookmark status
    const toggleBookmark = async () => {
        if (!recipe) return; // Cannot bookmark without recipe data
        setIsLoadingBookmarkStatus(true);
        let success;
        try {
            if (isBookmarked) {
                success = await BookmarkService.removeBookmark(recipe.id);
                if (success) alert('Recipe removed from bookmarks');
            } else {
                success = await BookmarkService.addBookmark(recipe); // Pass the entire recipe object
                if (success) alert('Recipe saved to bookmarks');
            }
            if (success) {
                setIsBookmarked(!isBookmarked);
            } else {
                alert('Failed to update bookmark status.');
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            alert('Error updating bookmark status.');
        } finally {
            setIsLoadingBookmarkStatus(false);
        }
    };

    // Effect to fetch recipe details on component mount or ID change
    useEffect(() => {
        fetchRecipeDetails();
    }, [id]); // Re-run if ID changes

    // Effect to check bookmark status once recipe data is loaded
    useEffect(() => {
        if (recipe) {
            checkIfBookmarked();
        }
    }, [recipe]); // Re-run if recipe object changes

    if (isLoadingRecipe) {
        return <LoadingSpinner />;
    }

    if (!recipe) {
        return (
            <div className="no-content-message">
                <img src="/images/broken_image_icon.svg" alt="Error" className="icon" />
                <p className="title">Recipe Not Found</p>
                <p className="subtitle">Please go back or try another recipe.</p>
                <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#637FE7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    // Ensure instructions are properly extracted from the RecipeModel
    const instructions = recipe instanceof RecipeModel ? recipe.instructions : [];
    const ingredients = recipe instanceof RecipeModel ? recipe.ingredients : [];

    return (
        <div className="detail-screen-container">
            <div className="header-image-container">
                <img id="recipeImage" src={recipe.image} alt={recipe.title} className="recipe-image" />
                <div className="header-overlay"></div>

                <button className="action-button back-button" onClick={() => navigate(-1)}>
                    <img src="/images/arrow_back_icon.svg" alt="Back" />
                </button>
                <button className="action-button share-button" onClick={() => alert('Share functionality would be here')}>
                    <img src="/images/share_icon.svg" alt="Share" />
                </button>
                <button className="action-button bookmark-button" onClick={toggleBookmark}>
                    {isLoadingBookmarkStatus ? (
                        <div className="bookmark-spinner"></div>
                    ) : (
                        <img
                            src={isBookmarked ? "/images/bookmark_filled_icon.svg" : "/images/bookmark_border_icon.svg"}
                            alt="Bookmark"
                        />
                    )}
                </button>
            </div>

            <div className="content-container">
                <div className="recipe-info">
                    <h1>{recipe.title}</h1>
                    <p className="cooking-time">
                        <img src="/images/timer_icon.svg" alt="Time" />
                        <span>{recipe.readyInMinutes} min</span>
                    </p>
                </div>

                <div className="section">
                    <h2>Ingredients</h2>
                    <ul className="ingredients-list">
                        {ingredients.length > 0 ? (
                            ingredients.map((ing, index) => <li key={index}>{ing}</li>)
                        ) : (
                            <li>No ingredients listed.</li>
                        )}
                    </ul>
                </div>

                <div className="section">
                    <h2>Instructions</h2>
                    <ol className="instructions-list">
                        {instructions.length > 0 ? (
                            instructions.map((step, index) => <li key={index}>{step}</li>)
                        ) : (
                            <li>No instructions available.</li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default DetailScreen;