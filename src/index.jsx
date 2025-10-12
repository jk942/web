import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// CRITICAL FIX: Import the main CSS file to apply all custom styles
import './index.css';

// 🆕 ADDED: Import CSS files for the react-slick carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// END ADDED

const container = document.getElementById('root');
const root = createRoot(container);

// Renders the main App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);