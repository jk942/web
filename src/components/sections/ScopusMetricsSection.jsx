// ScopusMetricsSection.jsx - New component for displaying Scopus metrics
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, FileText, BarChart, RefreshCw, AlertCircle } from 'lucide-react';

const ScopusMetricsSection = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const serverPort = 3001;

    const fetchMetrics = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:${serverPort}/api/scopus-metrics`);
            if (response.data.success) {
                setMetrics(response.data.data);
            } else {
                setError('Failed to fetch metrics');
            }
        } catch (err) {
            console.error("Error fetching Scopus metrics:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    if (loading) {
        return (
            <section className="scopus-metrics-section">
                <div className="container text-center py-10">
                    <RefreshCw className="animate-spin inline-block w-8 h-8 text-gray-400" />
                    <p className="mt-2">Loading Scopus metrics...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="scopus-metrics-section bg-gray-50 py-12">
            <div className="container text-center">
                <h2 className="section-heading text-primary mb-2">INTI Research Impact</h2>
                <p className="section-subtitle mb-8">Live metrics from Scopus</p>
                
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <p className="text-red-700">Unable to load live Scopus metrics</p>
                        <button 
                            onClick={fetchMetrics}
                            className="mt-3 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : metrics ? (
                    <div className="scopus-metrics-grid max-w-4xl mx-auto">
                        <div className="metric-card bg-white shadow-lg rounded-lg p-6">
                            <TrendingUp className="metric-icon text-blue-600 mx-auto mb-3" size={40} />
                            <p className="metric-value text-3xl font-bold text-gray-800">{metrics.hIndex}</p>
                            <p className="metric-label text-gray-600 font-medium">H-Index</p>
                            <p className="metric-description text-sm text-gray-500 mt-2">Research Impact Measure</p>
                        </div>

                        <div className="metric-card bg-white shadow-lg rounded-lg p-6">
                            <BarChart className="metric-icon text-green-600 mx-auto mb-3" size={40} />
                            <p className="metric-value text-3xl font-bold text-gray-800">{metrics.totalCitations.toLocaleString()}</p>
                            <p className="metric-label text-gray-600 font-medium">Total Citations</p>
                            <p className="metric-description text-sm text-gray-500 mt-2">Research Influence</p>
                        </div>
                        
                        <div className="metric-card bg-white shadow-lg rounded-lg p-6">
                            <FileText className="metric-icon text-purple-600 mx-auto mb-3" size={40} />
                            <p className="metric-value text-3xl font-bold text-gray-800">{metrics.documentCount.toLocaleString()}</p>
                            <p className="metric-label text-gray-600 font-medium">Documents</p>
                            <p className="metric-description text-sm text-gray-500 mt-2">Published Works</p>
                        </div>
                    </div>
                ) : null}

                <div className="mt-6 text-sm text-gray-500">
                    <p>Data source: Scopus • Last updated: {metrics?.lastUpdated ? new Date(metrics.lastUpdated).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>
        </section>
    );
};

export default ScopusMetricsSection;