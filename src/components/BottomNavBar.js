// src/components/BottomNavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

// You'd put your actual icon imports here if using SVG components or images
// For now, we'll assume the images are in public/images
// import { ReactComponent as HomeIcon } from '../../public/images/home_icon.svg'; etc.

const BottomNavBar = ({ activePage, onNavigate }) => {
    const navItems = [
        { name: 'Home', path: '/', icon: 'home_icon.svg', pageKey: 'home' },
        { name: 'Search', path: '/search', icon: 'search_icon.svg', pageKey: 'search' },
        { name: 'Categories', path: '/categories', icon: 'categories_icon.svg', pageKey: 'categories' },
        { name: 'Bookmarks', path: '/bookmarks', icon: 'bookmark_filled_icon.svg', pageKey: 'bookmarks' },
        { name: 'Profile', path: '/profile', icon: 'profile_icon.svg', pageKey: 'profile' }, // Assume profile_icon
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
                >
                    {/* You'd use an <img> tag or SVG component here */}
                    {/* <img src={`/images/${item.icon}`} alt={item.name} style={{ width: '24px', height: '24px', marginBottom: '3px' }} /> */}
                    <span>{item.name}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavBar;