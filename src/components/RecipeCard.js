// src/components/RecipeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const RecipeCard = ({ recipe, onRemoveBookmark, isBookmarkedView = false }) => {
    // `recipe` prop is expected to be a BookmarkModel or a similar object with id, title, image, readyInMinutes
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the detail screen for this recipe
        // We pass the entire recipe object as state to avoid re-fetching on the detail page if possible
        navigate(`/recipes/${recipe.id}`, { state: { recipe: recipe } });
    };

    const handleBookmarkButtonClick = (e) => {
        // Prevent the card's click event from firing when the bookmark button is clicked
        e.stopPropagation();
        if (onRemoveBookmark) {
            onRemoveBookmark(recipe.id);
        }
        // If this card were also for adding bookmarks, you'd handle that logic here
    };

    return (
        <div className="recipe-card" onClick={handleCardClick}>
            <div className="recipe-card-image-container">
                {recipe.imageUrl && recipe.imageUrl.length > 0 ? (
                    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card-image" />
                ) : (
                    <div className="image-placeholder">
                        <span className="icon">&#128247;</span> {/* Placeholder icon for no image */}
                        <span className="text">No image</span>
                    </div>
                )}
                <div className="gradient-overlay"></div>

                {/* Only show the bookmark/delete button if it's explicitly for bookmark management */}
                {isBookmarkedView && (
                    <button
                        className="delete-bookmark-button" // Renamed from 'bookmark-button' for clarity in bookmark view
                        onClick={handleBookmarkButtonClick}
                    >
                        {/* Assuming bookmark_filled_icon.svg is in public/images */}
                        <img src="/images/bookmark_filled_icon.svg" alt="Bookmarked" />
                    </button>
                )}
                {/* If you had a button for adding/removing bookmarks on other screens, you'd use a different icon logic here */}
            </div>
            <div className="recipe-card-details">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <div className="recipe-card-time">
                    {/* Assuming timer_icon.svg is in public/images */}
                    <img src="/images/timer_icon.svg" alt="Time" />
                    <span>{recipe.readyInMinutes} min</span>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;