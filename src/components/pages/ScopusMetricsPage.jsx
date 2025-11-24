// ScopusMetricsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// ⬅️ CRUCIAL: Check these import paths match your file structure!
import PieChartComponent from '../sections/PieChartComponent.jsx'; 
import ScopusGraphComponent from '../sections/ScopusGraphComponent.jsx'; // ⬅️ Must match the new file name

const ScopusMetricsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                
                {/* Back button */}
                <div className="mb-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                    INTI Research Impact and Collaboration Metrics
                </h1>
                
                {/* --- GRAPH 1 --- */}
                <section className="bg-white shadow-lg rounded-xl p-8 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                        Research Output by Subject Area (ASJC)
                    </h2>
                    <PieChartComponent />
                </section>
                
                {/* --- GRAPH 2 --- */}
                <section className="bg-white shadow-lg rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                        Collaboration Distribution by Region
                    </h2>
                    <ScopusGraphComponent /> 
                </section>
                
            </div>
        </div>
    );
};

export default ScopusMetricsPage;