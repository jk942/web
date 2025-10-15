// ReachSection.jsx
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Slider from 'react-slick';  
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
import { Link } from 'react-router-dom'; // ✅ ADD BACK for navigation
import { INTI_RED, mobilityPrograms, dualDegreePartners, mouPartners } from '../../data/websiteData.jsx';
import { Plane, MapPin, Briefcase, GraduationCap, ArrowLeft, Users, ChevronRight } from 'lucide-react'; 
import { CHART_COLORS } from './CHART_COLORS.jsx';
import PieChartComponent from './PieChartComponent.jsx';


// ----------------------------------------------------------------------
// 1. HELPER COMPONENTS (DEFINITIONS MUST BE HERE)
// ----------------------------------------------------------------------

// Map of string names to Lucide components
const IconComponentMap = {
    Plane: Plane, MapPin: MapPin, Briefcase: Briefcase, 
    GraduationCap: GraduationCap, ArrowLeft: ArrowLeft, Users: Users
};

const ProgramIcon = ({ iconName }) => {
    const IconComponent = IconComponentMap[iconName];
    if (!IconComponent) return null; 
    return <IconComponent style={{ color: INTI_RED }} className="w-6 h-6" />;
}

// DEFINITION for ProgramCard
const ProgramCard = ({ title, description, iconName }) => (
    <div className="program-card">
        <div className="program-card-header">
            <ProgramIcon iconName={iconName} /> 
            <h4 className="card-title">{title}</h4>
        </div>
        <p className="card-description">{description}</p>
    </div>
);

// DEFINITION for PartnerCard
const PartnerCard = ({ flag, university, details }) => (
    <div className="partner-card">
        <span className="partner-flag">{flag}</span>
        <h4 className="card-title">{university}</h4>
        <ul className="partner-details-list">
            {details.map((detail, index) => (
                <li key={index} className="partner-detail-item">
                    <span>•</span>{detail}
                </li>
            ))}
        </ul>
    </div>
);

const MOUCard = ({ name, details }) => (
    <div className="mou-card">
        <h4 className="mou-partner-name">{name}</h4>
        <p className="mou-partner-details">{details}</p>
    </div>
);

const sliderSettings = {
    dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, 
    autoplay: true, autoplaySpeed: 1500, 
    responsive: [       
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1, dots: false } }
    ]
};

// ----------------------------------------------------------------------
// 2. SCOPUS COLLABORATORS COMPONENT (Handles the partner slider) 
// ----------------------------------------------------------------------
const ScopusCollaborators = () => {
    const [partners, setPartners] = useState(mouPartners); 
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const serverPort = 3001; 

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get(`http://localhost:${serverPort}/api/scopus-collaborators`); 
                if (response.data.success && response.data.data.length > 0) { 
                    setPartners(response.data.data); 
                    setIsLive(true); 
                } else {
                    setIsLive(false);
                }
            } catch (err) { 
                console.error("Failed to fetch Scopus collaborators, displaying static data.", err); 
                setIsLive(false);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    // ✅ ADD DEBUGGING
    console.log("=== DEBUG SCOPUS COLLABORATORS ===");
    console.log("Loading:", loading);
    console.log("Partners count:", partners.length);
    console.log("Component is rendering!");

    if (loading) {
        return <div className="text-center py-10">Loading MOU partners...</div>;
    }

    return (
        <>
            <p className="text-center text-sm mb-4" style={{ color: isLive ? 'green' : INTI_RED }}>
                {isLive 
                    ? `Displaying LIVE data for ${partners.length} Scopus Collaborators (mocked from backend).` 
                    : `Displaying static data for MOU partners (Live fetch failed).`}
            </p>
            
            <div className="mou-slider-container">
                <Slider {...sliderSettings}>
                    {partners.map((partner, index) => (
                        <div key={index} className="mou-slide-item">
                            <MOUCard name={partner.name} details={partner.details} />
                        </div>
                    ))}
                </Slider>
                
                {/* ✅ DEBUG BUTTON - HIGHLY VISIBLE */}
                <div className="text-center mt-8 p-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                    <h3 className="text-lg font-bold text-yellow-800 mb-2">DEBUG AREA</h3>
                    <p className="text-sm text-yellow-700 mb-4">This should be visible below the slider</p>
                    
                    <Link to="/mou-partners">
                        <button 
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-3 mx-auto transition-colors shadow-lg"
                            onClick={() => {
                                console.log("🎯 BUTTON CLICKED! Should navigate to /mou-partners");
                                alert("Button clicked! Check console for details.");
                            }}
                        >
                            🔥 CLICK ME - View All MOU Partners
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </Link>
                    
                    <p className="text-xs text-yellow-600 mt-3">
                        If you can see this, the button container is rendering
                    </p>
                </div>
            </div>
        </>
    );
};

// ----------------------------------------------------------------------
// 3. SCOPUS GRAPH COMPONENT (Handles the PIE CHART)
// ----------------------------------------------------------------------
const ScopusGraph = () => {
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const serverPort = 3001; 

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await axios.get(`http://localhost:${serverPort}/api/scopus-collaboration-graph`);
                
                if (response.data.success && response.data.data.length > 0) {
                    setGraphData(response.data.data);
                    setIsLive(true);
                } else {
                    setIsLive(false);
                }
            } catch (err) {
                console.error("Failed to fetch Scopus graph data.", err);
                setIsLive(false);
                // Use the CHART_COLORS variable for fallback data
                setGraphData([
                    { name: 'Asia-Pacific', value: 120, color: CHART_COLORS[0] },
                    { name: 'Europe', value: 80, color: CHART_COLORS[1] },
                    { name: 'North America', value: 45, color: CHART_COLORS[2] },
                    { name: 'Other', value: 30, color: CHART_COLORS[3] },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGraphData();
    }, []); 

    if (loading) {
        return <div className="text-center py-10">Loading collaboration distribution...</div>;
    }

    return (
        <div className="scopus-graph-container">
            <h4 className="graph-title">Collaboration Distribution by Region</h4>
            <p className="data-source-msg" style={{ color: isLive ? 'green' : INTI_RED }}>
                {isLive ? `Data fetched live from backend (currently mock data).` : `Displaying static fallback graph data.`}
            </p>
            
            <ResponsiveContainer width="100%" height={350}>
                <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                    <Pie
                        data={graphData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" 
                        cy="50%" 
                        outerRadius={120} 
                        fill="#8884d8"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {
                            graphData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
                            ))
                        }
                    </Pie>
                    <Tooltip formatter={(value) => `${value} Collaborators`} />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// ----------------------------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------------------------
const ReachSection = () => (
    <section className="reach-section">
        <div className="container">
            {/* 1. Global Mobility Programmes */}
            <h2 className="section-heading">Global Reach: Programmes</h2>
            <div className="program-card-grid">
                {mobilityPrograms.map((program, index) => (
                    <ProgramCard key={index} {...program} /> 
                ))}
            </div>

            {/* 2. Dual Award Partners */}
            <div className="dual-award-section mt-12">
                <h3 className="sub-heading-accent">Dual Award Partners</h3>
                <div className="partner-card-grid">
                    {dualDegreePartners.map((partner, index) => (
                        <PartnerCard key={index} {...partner} /> 
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button className="btn-filled btn-yellow">
                        View All Dual Award Programmes
                    </button>
                </div>
            </div>

            <PieChartComponent />

            
            {/* 3. MEMORANDUMS OF UNDERSTANDING (MOUs) */}
            <div className="mou-section mt-12">
                <h3 className="sub-heading-accent mou-heading">
                    <ProgramIcon iconName='Users' />
                    Memorandum of Understanding (MOUs)
                </h3>
                
                {/* ✅ UPDATED: Added description about MOU partnerships */}
                <div className="mou-intro-text text-center max-w-3xl mx-auto mb-8">
                    <p className="text-lg text-gray-700">
                        INTI International University has established strategic Memorandums of Understanding (MOUs) 
                        with prestigious institutions worldwide. These partnerships facilitate student exchanges, 
                        faculty collaborations, joint research initiatives, and academic program development.
                    </p>
                </div>
                
                <ScopusCollaborators /> 
                
                {/* ❌ REMOVED: The old "View Full Collaborators List on Scopus" button */}
            </div>
            
            {/* 4. SCOPUS COLLABORATION GRAPH SECTION */}
            <div className="scopus-graph-section mt-16">
                <h3 className="section-heading text-center" style={{color: INTI_RED}}>
                    Research Collaboration Growth
                </h3>
                <ScopusGraph />
            </div>
        </div>
    </section>
);

export default ReachSection;