import React from 'react';
import Button from '../common/Button';

import intiBuildingImage from '/Users/jatinjangid/inti-website/src/components/inti-building.jpg'; 

const HeroSection = () => (
    <section className="hero-section">
        <div className="container hero-layout">
            {/* Left: text content */}
            <div className="hero-content">
                <h1 className="hero-title">
                    We Empower Global Leaders with Career-Ready, <span className="text-primary">International Education.</span>
                </h1>
                <p className="hero-subtitle">
                    Join a vibrant, cross-cultural community committed to innovative learning and industry exposure, giving you the INTI Edge for a successful career.
                </p>
                <div className="hero-actions">
                    <Button primary>Explore Programmes</Button>
                    <Button>Request Info</Button>
                </div>
            </div>

            {/* Right: image card */}
            <div className="hero-card-wrapper">
                <div className="hero-card">
                    <h2 className="hero-card-title is-main-title">
                        INTI Campus
                    </h2>
                    <p className="hero-card-subtitle-bottom">
                        INTI Global Campus Life
                    </p>
                </div>
                <div
                    className="hero-card-image-overlay"
                    style={{
                        backgroundImage: `url(${intiBuildingImage})`,
                        backgroundColor: '#E9D6D9',
                        opacity: 0.8,
                        backgroundBlendMode: 'multiply',
                    }}
                ></div>
            </div>
        </div>
    </section>
);

export default HeroSection;
