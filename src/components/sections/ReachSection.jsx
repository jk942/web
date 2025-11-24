// ReachSection.jsx
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Slider from 'react-slick';  
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
import { Link } from 'react-router-dom'; 
import { INTI_RED, mobilityPrograms, dualDegreePartners, mouPartners } from '../../data/websiteData.jsx';
import { Plane, MapPin, Briefcase, GraduationCap, ArrowLeft, Users, BarChart } from 'lucide-react'; 
import { CHART_COLORS } from '../pages/CHART_COLORS.jsx';
// REMOVED: import PieChartComponent from './PieChartComponent.jsx';

const IconComponentMap = {
    Plane: Plane, MapPin: MapPin, Briefcase: Briefcase, 
    GraduationCap: GraduationCap, ArrowLeft: ArrowLeft, Users: Users
};

const ProgramIcon = ({ iconName }) => {
    const IconComponent = IconComponentMap[iconName];
    if (!IconComponent) return null; 
    return <IconComponent style={{ color: INTI_RED }} className="w-6 h-6" />;
}

const ProgramCard = ({ title, description, iconName }) => (
    <div className="program-card">
        <div className="program-card-header">
            <ProgramIcon iconName={iconName} /> 
            <h4 className="card-title">{title}</h4>
        </div>
        <p className="card-description">{description}</p>
    </div>
);

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
                
            </div>
        </>
    );
};


const ReachSection = () => (
    <section className="reach-section">
        <div className="container">
            {}
            <h2 className="section-heading">Global Reach: Programmes</h2>
            <div className="program-card-grid">
                {mobilityPrograms.map((program, index) => (
                    <ProgramCard key={index} {...program} /> 
                ))}
            </div>

            {}
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

            {}
            <div className="mou-section mt-12">
                <h3 className="sub-heading-accent mou-heading">
                    <ProgramIcon iconName='Users' />
                    Memorandum of Understanding (MOUs)
                </h3>
                
                {}
                <div className="mou-intro-text text-center max-w-3xl mx-auto mb-8">
                    <p className="text-lg text-gray-700">
                        INTI International University has established strategic Memorandums of Understanding (MOUs) 
                        with prestigious institutions worldwide. These partnerships facilitate student exchanges, 
                        faculty collaborations, joint research initiatives, and academic program development.
                    </p>
                </div>
                
                <ScopusCollaborators /> 
                
                {}
            </div>
        </div>
    </section>
);

export default ReachSection;