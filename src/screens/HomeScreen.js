// src/screens/HomeScreen.js
import React from 'react';

const HomeScreen = () => {
    // Assuming chef.png is in public/images
    const chefIconPath = '/images/chef.png';

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ marginTop: '50px', color: '#0E0A57' }}>Welcome to SnapChef!</h1>
            <p style={{ color: '#333' }}>Start by searching for recipes or exploring categories.</p>
            <div style={{ marginTop: '30px' }}>
                <img src={chefIconPath} alt="Chef Icon" style={{ width: '150px', height: 'auto' }} />
            </div>
        </div>
    );
};

export default HomeScreen;