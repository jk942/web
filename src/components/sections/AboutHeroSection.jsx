import React from 'react';

import RankingBannerImage from '/Users/jatinjangid/inti-website/src/components/Ranking-banner.jpg'; 

const AboutHeroSection = () => {
    return (
        <section className="about-hero-section">
            <div className="container">
                <h1 className="about-hero-title">
                    INTI International University
                </h1>
                <p className="about-hero-description">
                    INTI International University, Nilai serves as the flagship campus that offers industry relevant programmes 
                    across various disciplines along with a residential campus experience.
                </p>
                
                {}
                <div className="ranking-banner-container">
                    <img 
                        src={RankingBannerImage} 
                        alt="INTI University Rankings Banner" 
                        className="ranking-banner-image" 
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutHeroSection;