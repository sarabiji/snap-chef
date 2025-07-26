
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import FABButton from './components/FABButton';

// Import your screen components
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen'; // Placeholder


import './screens/styles/bookmarks.css';
import './screens/styles/categories.css';
import './screens/styles/detail.css';


function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the active page for the BottomNavBar
    const getActivePage = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/search')) return 'search';
        if (path.startsWith('/categories')) return 'categories';
        if (path.startsWith('/bookmarks')) return 'bookmarks';
        if (path.startsWith('/profile')) return 'profile';
        return 'home'; // Default
    };

    const handleFABClick = () => {
        alert('FAB button clicked! (e.g., start new recipe creation)');
        // Example: navigate('/new-recipe');
    };

    return (
        <div className="app-container">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/search" element={<SearchScreen />} />
                    <Route path="/categories" element={<CategoriesScreen />} />
                    <Route path="/bookmarks" element={<BookmarksScreen />} />
                    <Route path="/recipes/:id" element={<DetailScreen />} /> {/* Dynamic route for recipe details */}
                    <Route path="/profile" element={<ProfileScreen />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
            <BottomNavBar activePage={getActivePage()} onNavigate={navigate} />
            <FABButton onClick={handleFABClick} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;