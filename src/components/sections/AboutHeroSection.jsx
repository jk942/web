import React from 'react';
// 1. IMPORT THE IMAGE: Adjust the path below to where you saved the file.
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
                
                {/* Image 1: The ranking banner */}
                <div className="ranking-banner-container">
                    {/* 2. USE THE IMPORTED IMAGE VARIABLE HERE */}
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