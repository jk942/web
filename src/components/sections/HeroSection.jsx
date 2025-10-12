import React from 'react';
import Button from '../common/Button';
// NOTE: I am assuming INTI_RED is not needed here since the color is applied via CSS class 'text-primary'

// 1. FIX THE IMAGE PATH: Replace the absolute path with a relative one.
// Ensure your image is located at this path relative to the current file (src/components/sections/HeroSection.jsx)
import intiBuildingImage from '/Users/jatinjangid/inti-website/src/components/inti-building.jpg'; 

const HeroSection = () => (
    <section className="hero-section">
        <div className="container hero-layout">
            {/* Left Content Column (UNCHANGED) */}
            <div className="hero-content">
                <h1 className="hero-title">
                    We Empower Global Leaders with Career-Ready, <span className="text-primary">International Education.</span>
                </h1>
                <p className="hero-subtitle">
                    Join a vibrant, cross-cultural community committed to innovative learning and industry exposure, giving you the **INTI Edge** for a successful career.
                </p>
                <div className="hero-actions">
                    <Button primary>Explore Programmes</Button>
                    <Button>Request Info</Button>
                </div>
            </div>

            {/* Right Image/Card Column - UPDATED */}
            <div className="hero-card-wrapper">
                {/* 2. TEXT OVERLAY: Red Box Effect is now the text container (z-index: 10) */}
                <div className="hero-card">
                    {/* Main Title: Uses a new class for styling and centering */}
                    <h2 className="hero-card-title is-main-title">
                        INTI Campus
                    </h2>
                    {/* Subtitle: New element anchored to the bottom */}
                    <p className="hero-card-subtitle-bottom">
                        INTI Global Campus Life
                    </p>
                </div>
                {/* 3. IMAGE/Overlay: Placeholder replaced with actual image URL and pink tint */}
                <div 
                    className="hero-card-image-overlay" 
                    style={{ 
                        // Use the imported image URL
                        backgroundImage: `url(${intiBuildingImage})`, 
                        
                        // Set a light pink color for the overlay tint
                        backgroundColor: '#E9D6D9', 
                        
                        // Increase opacity to make the pink tint and image more visible 
                        opacity: 0.8, 
                        
                        // Blends the image and the pink color for a nice effect
                        backgroundBlendMode: 'multiply' 
                    }}
                ></div>
            </div>
        </div>
    </section>
);

export default HeroSection;
