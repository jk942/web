// ReachSection.jsx
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Slider from 'react-slick'; 
// Import Recharts components for the graph
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
// Import constants and data
import { INTI_RED, mobilityPrograms, dualDegreePartners, mouPartners } from '../../data/websiteData.jsx';
// Import Lucide icons
import { Plane, MapPin, Briefcase, GraduationCap, ArrowLeft, Users } from 'lucide-react'; 

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

// DEFINITION for ProgramCard - FIXES Line 187 error
const ProgramCard = ({ title, description, iconName }) => (
    <div className="program-card">
        <div className="program-card-header">
            <ProgramIcon iconName={iconName} /> 
            <h4 className="card-title">{title}</h4>
        </div>
        <p className="card-description">{description}</p>
    </div>
);

// DEFINITION for PartnerCard - FIXES Line 196 error
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
    autoplay: true, autoplaySpeed: 3500, 
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
            </div>
        </>
    );
};
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// 3. SCOPUS GRAPH COMPONENT (Handles the line chart)
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
                // Fallback static data if fetch fails
                setGraphData([
                    { year: 2020, collaborations: 5 },
                    { year: 2021, collaborations: 12 },
                    { year: 2022, collaborations: 25 },
                    { year: 2023, collaborations: 35 },
                    { year: 2024, collaborations: 50 },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGraphData();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading collaboration graph...</div>;
    }

    return (
        <div className="scopus-graph-container">
            <h4 className="graph-title">Collaborating Institutions Growth (Last 5 Years)</h4>
            <p className="data-source-msg" style={{ color: isLive ? 'green' : INTI_RED }}>
                {isLive ? `Data fetched live from backend (currently mock data).` : `Displaying static fallback graph data.`}
            </p>
            
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={graphData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis allowDecimals={false} label={{ value: 'Collaborations', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="collaborations" 
                        stroke={INTI_RED} 
                        strokeWidth={3} 
                        dot={{ fill: INTI_RED, r: 4 }} 
                        name="New Collaborations"
                    />
                </LineChart>
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
            {/* 1. Global Mobility Programmes (Uses ProgramCard - NOW DEFINED ABOVE) */}
            <h2 className="section-heading">Global Reach: Programmes</h2>
            <div className="program-card-grid">
                {mobilityPrograms.map((program, index) => (
                    <ProgramCard key={index} {...program} /> // Line 187 uses ProgramCard
                ))}
            </div>

            {/* 2. Dual Award Partners (Uses PartnerCard - NOW DEFINED ABOVE) */}
            <div className="dual-award-section mt-12">
                <h3 className="sub-heading-accent">Dual Award Partners</h3>
                <div className="partner-card-grid">
                    {dualDegreePartners.map((partner, index) => (
                        <PartnerCard key={index} {...partner} /> // Line 196 uses PartnerCard
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button className="btn-filled btn-yellow">
                        View All Dual Award Programmes
                    </button>
                </div>
            </div>
            
            {/* 3. MEMORANDUMS OF UNDERSTANDING (MOUs) */}
            <div className="mou-section mt-12">
                <h3 className="sub-heading-accent mou-heading">
                    <ProgramIcon iconName='Users' />
                    Memorandum of Understanding (MOUs)
                </h3>
                <ScopusCollaborators /> 

                <div className="text-center mt-5">
                    <a href="https://www.scopus.com/pages/organization/60104915#tab=collaborators" target="_blank" rel="noopener noreferrer">
                        <button className="btn-outlined">
                            View Full Collaborators List on Scopus
                        </button>
                    </a>
                </div>
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