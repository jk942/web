import React from 'react';

const Button = ({ children, primary = false, className = '' }) => {
    const baseClass = primary ? 'btn-filled' : 'btn-outlined';
    return (
        <button
            className={`${baseClass} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
