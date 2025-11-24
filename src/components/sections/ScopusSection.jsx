// ScopusSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, FileText, BarChart } from 'lucide-react'; // Example icons
import { Link } from 'react-router-dom'; // ⬅️ THIS LINE IS CRUCIAL FOR REDIRECTION

const ScopusSection = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScopusData = async () => {
            try {
                // NOTE: Check your port (5000 or 3001) based on your server.js
                const response = await axios.get('http://localhost:5000/api/scopus-data'); 
                
                if (response.data.success) {
                    setMetrics(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching Scopus data:", error);
                setMetrics({}); 
            } finally {
                setLoading(false);
            }
        };

        fetchScopusData();
    }, []);

    if (loading) {
        return <section className="scopus-section-wrapper"><p className="container">Loading Scopus metrics...</p></section>;
    }

    const hasData = metrics && Object.keys(metrics).length > 0;

    return (
        <section className="scopus-section-wrapper">
            <div className="container text-center">
                <h2 className="section-heading text-primary">Research Impact on Scopus</h2>
                
                {hasData ? (
                    // ⬅️ THE LINK WRAPPER
                    <Link to="/research-metrics" className="scopus-metrics-link block group"> 
                        <div className="scopus-metrics-grid">
                            
                            {/* H-Index Card */}
                            <div className="metric-card transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl">
                                <TrendingUp className="metric-icon" size={32} />
                                <p className="metric-value">{metrics.hIndex || 'N/A'}</p>
                                <p className="metric-label">H-Index</p>
                            </div>

                            {/* Total Citations Card */}
                            <div className="metric-card transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl">
                                <BarChart className="metric-icon" size={32} />
                                <p className="metric-value">{metrics.totalCitations || 'N/A'}</p>
                                <p className="metric-label">Total Citations</p>
                            </div>

                            {/* Documents Card */}
                            <div className="metric-card transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl">
                                <FileText className="metric-icon" size={32} />
                                <p className="metric-value">{metrics.documentCount || 'N/A'}</p>
                                <p className="metric-label">Documents</p>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <p className="error-message">Unable to display live Scopus data at this time.</p>
                )}
            </div>
        </section>
    );
};

export default ScopusSection;