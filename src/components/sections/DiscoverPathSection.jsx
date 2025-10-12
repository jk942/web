import React from 'react';
import Button from '../common/Button';

const DiscoverPathSection = () => (
    <section className="discover-path-section">
        <div className="container">
            <h2 className="section-heading discover-heading">
                Discover Your Path
            </h2>
            <p className="section-subtitle discover-subtitle">
                Explore our wide range of industry-relevant programmes in Business, IT, Engineering, Health Sciences, and more.
            </p>
            <Button primary className="discover-button">
                View All Disciplines
            </Button>
        </div>
    </section>
);

export default DiscoverPathSection;
