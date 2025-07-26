// src/components/FABButton.js
import React from 'react';

const FABButton = ({ onClick }) => {
    return (
        <button className="circle-btn" onClick={onClick}>
            +
        </button>
    );
};

export default FABButton;