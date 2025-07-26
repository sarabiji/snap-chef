// src/components/NoContentMessage.js
import React from 'react';

const NoContentMessage = ({ iconSrc, title, subtitle }) => {
    return (
        <div className="no-content-message">
            <img src={iconSrc} alt="No Content" className="icon" />
            <p className="title">{title}</p>
            <p className="subtitle">{subtitle}</p>
        </div>
    );
};

export default NoContentMessage;