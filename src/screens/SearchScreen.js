// src/screens/SearchScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            // In a real app, you'd trigger an API call and display results.
            // For now, let's just navigate to a mock results page or log.
            alert(`Searching for: ${query}`);
            // navigate(`/search/results?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ marginTop: '20px', color: '#0E0A57' }}>Search for Recipes</h1>
            <input
                type="text"
                placeholder="Enter ingredients or recipe name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '80%', padding: '10px', margin: '20px auto', display: 'block', border: '1px solid #ccc', borderRadius: '8px' }}
            />
            <button
                onClick={handleSearch}
                style={{ display: 'block', width: '50%', padding: '12px', margin: '0 auto', backgroundColor: '#637FE7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
                Search
            </button>
        </div>
    );
};

export default SearchScreen;