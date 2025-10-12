import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, FileText, BarChart } from 'lucide-react'; // Example icons

const ScopusSection = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScopusData = async () => {
            try {
                // Call the new Node.js endpoint
                const response = await axios.get('http://localhost:5000/api/scopus-data'); 
                
                if (response.data.success) {
                    setMetrics(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching Scopus data:", error);
                setMetrics({}); // Set to empty object on error
            } finally {
                setLoading(false);
            }
        };

        fetchScopusData();
    }, []);

    if (loading) {
        return <section className="scopus-section-wrapper"><p className="container">Loading Scopus metrics...</p></section>;
    }
    
    // Check if data was successfully fetched (not null or empty)
    const hasData = metrics && Object.keys(metrics).length > 0;

    return (
        <section className="scopus-section-wrapper">
            <div className="container text-center">
                <h2 className="section-heading text-primary">Research Impact on Scopus</h2>
                
                {hasData ? (
                    <div className="scopus-metrics-grid">
                        {/* H-Index Card */}
                        <div className="metric-card">
                            <TrendingUp className="metric-icon" size={32} />
                            <p className="metric-value">{metrics.hIndex || 'N/A'}</p>
                            <p className="metric-label">H-Index</p>
                        </div>

                        {/* Total Citations Card */}
                        <div className="metric-card">
                            <BarChart className="metric-icon" size={32} />
                            <p className="metric-value">{metrics.totalCitations || 'N/A'}</p>
                            <p className="metric-label">Total Citations</p>
                        </div>
                        
                        {/* Document Count Card */}
                        <div className="metric-card">
                            <FileText className="metric-icon" size={32} />
                            <p className="metric-value">{metrics.documentCount || 'N/A'}</p>
                            <p className="metric-label">Documents</p>
                        </div>
                    </div>
                ) : (
                    <p className="error-message">Unable to display live Scopus data at this time.</p>
                )}
            </div>
        </section>
    );
};

export default ScopusSection;