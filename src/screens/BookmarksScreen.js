// src/screens/BookmarksScreen.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkService from '../services/BookmarkService';
import RecipeService from '../services/RecipeService'; // Needed for detail navigation
import LoadingSpinner from '../components/LoadingSpinner';
import NoContentMessage from '../components/NoContentMessage';
import './styles/bookmarks.css'; // Import screen-specific CSS
import RecipeCard from '../components/RecipeCard'; // Import the new component



const BookmarksScreen = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const loadBookmarks = async () => {
        setIsLoading(true);
        const fetchedBookmarks = await BookmarkService.getAllBookmarks();
        setBookmarks(fetchedBookmarks);
        setIsLoading(false);
    };

    useEffect(() => {
        loadBookmarks();
    }, []); // Empty dependency array means this runs once on mount

    const groupBookmarksByDate = (bkmks) => {
        const grouped = {};
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        bkmks.forEach(bookmark => {
            const saveDate = new Date(bookmark.timestamp);
            const saveDay = new Date(saveDate.getFullYear(), saveDate.getMonth(), saveDate.getDate());

            let dateKey;
            if (saveDay.getTime() === today.getTime()) {
                dateKey = "Today";
            } else if (saveDay.getTime() === yesterday.getTime()) {
                dateKey = "Yesterday";
            } else {
                dateKey = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(saveDate);
            }

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(bookmark);
        });
        return grouped;
    };

    const handleRemoveBookmark = async (bookmarkId) => {
        const success = await BookmarkService.removeBookmark(bookmarkId);
        if (success) {
            alert('Recipe removed from bookmarks'); // Replace with a more elegant notification
            loadBookmarks(); // Reload bookmarks after removal
        } else {
            alert('Failed to remove bookmark.');
        }
    };

    const handleNavigateToRecipeDetails = async (bookmarkId) => {
        // Show a loading indicator (you might use a global context or state for this)
        alert('Loading recipe details...'); // Temporary indicator

        try {
            const detailedRecipe = await RecipeService.fetchRecipeDetails(bookmarkId);
            if (detailedRecipe) {
                navigate(`/recipes/${detailedRecipe.id}`, { state: { recipe: detailedRecipe } });
            } else {
                alert('Failed to load recipe details.');
            }
        } catch (error) {
            console.error('Error loading recipe details:', error);
            alert('Error loading recipe details.');
        }
    };

    const sortedDates = Object.keys(groupBookmarksByDate(bookmarks)).sort((a, b) => {
        if (a === "Today") return -1;
        if (b === "Today") return 1;
        if (a === "Yesterday") return -1;
        if (b === "Yesterday") return 1;
        // For other dates, rely on the inherent sort from grouping by timestamp if needed,
        // or convert dates to sortable format. For this example, keep it simple.
        return 0;
    });

    return (
        <div className="bookmarks-page-container">
            <header className="app-bar">
                <h1>My Bookmarks</h1>
                <button className="refresh-button" onClick={loadBookmarks}>
                    <img src="/images/refresh_icon.svg" alt="Refresh" />
                </button>
            </header>

            <main className="bookmarks-main-content">
                {isLoading ? (
                    <LoadingSpinner />
                ) : bookmarks.length === 0 ? (
                    <NoContentMessage
                        iconSrc="/images/bookmark_border_icon.svg"
                        title="No bookmarked recipes yet"
                        subtitle="Tap the bookmark icon on any recipe to save it"
                    />
                ) : (
                    sortedDates.map((dateKey) => (
                        <div key={dateKey} className="bookmark-date-group">
                            <h2>{dateKey}</h2>
                            <div className="bookmarks-grid">
                                {groupBookmarksByDate(bookmarks)[dateKey].map((bookmark) => (
                                    <RecipeCard
                                        key={bookmark.id}
                                        bookmark={bookmark}
                                        onRemove={handleRemoveBookmark}
                                        onNavigateDetails={handleNavigateToRecipeDetails}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default BookmarksScreen;