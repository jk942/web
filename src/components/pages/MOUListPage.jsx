// MOUListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, BookOpen, Globe } from 'lucide-react';
import { mouPartners, INTI_RED } from '../../data/websiteData.jsx';

// Enhanced partner data with more details
const enhancedPartners = [
    {
        name: 'Universitas Abulyatama (UNAYA), Indonesia',
        details: 'Student Mobility and Exchange Programmes',
        established: '2019',
        collaborationAreas: ['Student Exchange', 'Faculty Development', 'Cultural Programs'],
        duration: '5 Years',
        status: 'Active',
        contact: 'International Office - intl@unayah.ac.id'
    },
    {
        name: 'Collegium Civitas, Poland',
        details: 'Joint Publications, Research, and Student Mobility',
        established: '2020',
        collaborationAreas: ['Research Collaboration', 'Joint Publications', 'Student Mobility'],
        duration: '5 Years',
        status: 'Active',
        contact: 'Prof. Anna Nowak - international@civitas.edu.pl'
    },
    {
        name: 'University of Westminster, UK',
        details: 'Joint Research Initiatives and Academic Programs',
        established: '2018',
        collaborationAreas: ['Research Partnerships', 'Faculty Exchange', 'Dual Degrees'],
        duration: '7 Years',
        status: 'Active',
        contact: 'Partnership Office - partnerships@westminster.ac.uk'
    },
    {
        name: 'Universiti Malaya (UM)',
        details: 'Faculty Exchange and Joint Research',
        established: '2017',
        collaborationAreas: ['Research Collaboration', 'Faculty Development', 'Knowledge Exchange'],
        duration: '10 Years',
        status: 'Active',
        contact: 'International Relations - iro@um.edu.my'
    },
    {
        name: 'University of Hertfordshire, UK',
        details: 'Dual Degree Programs and Student Exchange',
        established: '2016',
        collaborationAreas: ['Dual Degrees', 'Student Exchange', 'Curriculum Development'],
        duration: '8 Years',
        status: 'Active',
        contact: 'International Office - international@herts.ac.uk'
    },
    {
        name: 'Coventry University, UK',
        details: 'Engineering and Computing Collaborations',
        established: '2019',
        collaborationAreas: ['Engineering Programs', 'Computing Research', 'Industry Projects'],
        duration: '6 Years',
        status: 'Active',
        contact: 'Partnership Team - partnerships@coventry.ac.uk'
    }
];

// Enhanced component to render a single partner with more details
const PartnerListItem = ({ partner }) => (
    <div className="partner-list-item bg-white rounded-lg shadow-md p-6 mb-6 border-l-4" style={{ borderLeftColor: INTI_RED }}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
                <h4 className="partner-name text-xl font-bold mb-2" style={{ color: INTI_RED }}>
                    {partner.name}
                </h4>
                <p className="partner-details text-gray-700 mb-4">{partner.details}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span><strong>Established:</strong> {partner.established}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span><strong>Status:</strong> <span className="text-green-600">{partner.status}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span><strong>Duration:</strong> {partner.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span><strong>Contact:</strong> {partner.contact}</span>
                    </div>
                </div>
                
                <div className="mt-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Collaboration Areas:</h5>
                    <div className="flex flex-wrap gap-2">
                        {partner.collaborationAreas.map((area, index) => (
                            <span 
                                key={index}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MOUListPage = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const serverPort = 3001; 

    useEffect(() => {
        const fetchAllPartners = async () => {
            try {
                const response = await axios.get(`http://localhost:${serverPort}/api/scopus-collaborators`); 
                if (response.data.success && response.data.data.length > 0) { 
                    // Enhance the fetched data with additional details
                    const enhancedData = response.data.data.map((partner, index) => ({
                        ...partner,
                        ...(enhancedPartners[index] || {})
                    }));
                    setPartners(enhancedData); 
                } else {
                    setPartners(enhancedPartners);
                }
            } catch (err) { 
                console.error("Failed to fetch all partners, displaying enhanced data.", err); 
                setPartners(enhancedPartners);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPartners();
    }, []);

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: INTI_RED }}></div>
                <p className="mt-4 text-gray-600">Loading detailed MOU partner information...</p>
            </div>
        );
    }

    return (
        <section className="mou-list-page-section bg-gray-50 min-h-screen py-12">
            <div className="container">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="section-heading text-4xl font-bold mb-4" style={{ color: INTI_RED }}>
                        All Global MOU Partners
                    </h1>
                    <p className="section-subtitle text-lg text-gray-700 max-w-4xl mx-auto">
                        A comprehensive overview of INTI International University's strategic partnerships 
                        with prestigious institutions worldwide, facilitating research, student mobility, 
                        and academic collaborations.
                    </p>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold" style={{ color: INTI_RED }}>{partners.length}+</div>
                            <div className="text-gray-600">Active Partners</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: INTI_RED }}>15+</div>
                            <div className="text-gray-600">Countries</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: INTI_RED }}>2016</div>
                            <div className="text-gray-600">First Partnership</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: INTI_RED }}>1000+</div>
                            <div className="text-gray-600">Students Exchanged</div>
                        </div>
                    </div>
                </div>

                {/* Partners List */}
                <div className="partner-list-grid">
                    {partners.map((partner, index) => (
                        <PartnerListItem key={index} partner={partner} />
                    ))}
                </div>

                {/* Contact Section */}
                <div className="text-center mt-16 bg-white rounded-lg shadow-sm p-8">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: INTI_RED }}>
                        Interested in Partnership?
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        INTI International University is always looking to expand its global network. 
                        Contact our International Office to explore partnership opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-filled px-8 py-3">
                            Contact International Office
                        </button>
                        <button className="btn-outlined px-8 py-3">
                            Download Partnership Brochure
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MOUListPage;