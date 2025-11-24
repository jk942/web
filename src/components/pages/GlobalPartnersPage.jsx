import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Filter, Globe, Users, BookOpen, ArrowRight, BarChart, ChevronRight } from 'lucide-react';
import {
  INTI_RED,
  INTI_YELLOW,
  mobilityPrograms,
  dualDegreePartners,
  mouPartners,
} from '../../data/websiteData.jsx';

// Optional mapping where you can plug in real logo URLs for specific partners
const partnerLogoMap = {
  'Universitas Abulyatama (UNAYA), Indonesia': 'https://via.placeholder.com/80?text=UNAYA',
  'Collegium Civitas, Poland': 'https://via.placeholder.com/80?text=CC',
  'Universiti Malaya (UM)': 'https://via.placeholder.com/80?text=UM',
  'University of Hertfordshire, UK': 'https://via.placeholder.com/80?text=UH',
  'Coventry University, UK': 'https://via.placeholder.com/80?text=CU',
};

const getInitials = (name = '') => {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getLogoForPartner = (name) => partnerLogoMap[name] || null;

const partnerLogoTabs = {
  Australia: [
    'CQUniversity',
    'Deakin University',
    'Flinders University',
    'Griffith University',
    'Macquarie University',
    'University of Adelaide',
    'University of Sydney',
    'University of Western Australia',
    'UNSW Sydney',
    'University of Newcastle',
    'University of Tasmania',
    'Western Sydney University',
  ],
  Canada: ['Fanshawe College', 'Thompson Rivers University'],
  Europe: ['Coventry University', 'University of Hertfordshire'],
  'United States': ['Arizona State University', 'University of Central Oklahoma'],
};

const GlobalPartnersPage = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  const [activeLogoRegion, setActiveLogoRegion] = useState('Australia');

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/scopus-all-collaborators'
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setCollaborators(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching global collaborators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  const countries = [...new Set(collaborators.map((c) => c.country))].sort();
  const types = [...new Set(collaborators.map((c) => c.type))].sort();

  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSearch =
      collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || collaborator.type === filterType;
    const matchesCountry =
      filterCountry === 'all' || collaborator.country === filterCountry;

    return matchesSearch && matchesType && matchesCountry;
  });

  const partnerCountDisplay =
    collaborators.length > 0 ? `${collaborators.length}+` : '100+';
  const countryCountDisplay = countries.length > 0 ? `${countries.length}+` : '15+';
  const typeCountDisplay = types.length > 0 ? types.length : 3;

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
             Back to Home
          </Link>
        </div>
      </div>

      {/* Harvard-style hero: full-bleed photo with left text panel */}
      <div className="harvard-hero">
        <div className="harvard-hero-image global-partners-hero-image" />
        <div className="harvard-hero-panel">
          <p className="programmes-breadcrumb">Home / Global Partners</p>
          <h1 className="harvard-hero-title">Global Partners</h1>
          <p className="harvard-hero-subtitle">
            Discover INTI International University&apos;s global network of partner
            institutions, dual degree collaborators, and mobility opportunities
            for students and faculty.
          </p>
        </div>
      </div>

      {/* Dark strip with key stats (Harvard-style cards) */}
      <div className="global-partners-strip">
        <div className="container global-partners-strip-inner">
          <div className="global-strip-card">
            <div className="global-strip-label">Global Partners</div>
            <div className="global-strip-value">{partnerCountDisplay}</div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">Countries</div>
            <div className="global-strip-value">{countryCountDisplay}</div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">Partner Types</div>
            <div className="global-strip-value">{typeCountDisplay}</div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">Mobility & Exchange</div>
            <div className="global-strip-value">SAP & Short-Term</div>
          </div>
        </div>
      </div>

      {/* Navigation buttons to key sections */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="global-partners-cta-row">
            <a href="#dual-degree" className="btn-base btn-filled hero-cta-button">
              Dual Degree Programmes
            </a>
            <a href="#mou-partners" className="btn-base btn-outlined hero-cta-button">
              MOU Partners
            </a>
            <a href="#mobility" className="btn-base btn-outlined hero-cta-button">
              Mobility & Exchange
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Dual Degree Partners */}
        <section id="dual-degree" className="mb-12 harvard-programs-section">
          <h2 className="section-kicker" style={{ color: INTI_RED }}>
            Dual Degree Partners
          </h2>
          <div className="harvard-programs-grid">
            {dualDegreePartners.map((partner) => (
              <article key={partner.university} className="harvard-program-card">
                <div className="harvard-program-card-inner">
                  <span className="harvard-program-flag">{partner.flag}</span>
                  <h3 className="harvard-program-title">{partner.university}</h3>
                  <ul className="harvard-program-list">
                    {partner.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="harvard-program-arrow">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Highlighted MOU Partners */}
        <section id="mou-partners" className="mb-12 harvard-programs-section">
          <h2 className="section-kicker" style={{ color: INTI_RED }}>
            Featured MOU Partners
          </h2>
          <div className="harvard-programs-grid">
            {mouPartners.map((partner) => (
              <article key={partner.name} className="harvard-program-card">
                <div className="harvard-program-card-inner">
                  <h3 className="harvard-program-title">{partner.name}</h3>
                  <p className="harvard-program-copy">{partner.details}</p>
                </div>
                <div className="harvard-program-arrow">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </article>
            ))}
          </div>

          {/* Partner logos by region (tabbed strip) */}
          <div className="partner-logos-section">
            <h3 className="partner-logos-heading">Meet Our Partner Universities</h3>
            <div className="partner-logos-tabs">
              {Object.keys(partnerLogoTabs).map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveLogoRegion(region)}
                  className={`partner-logos-tab ${
                    activeLogoRegion === region ? 'partner-logos-tab-active' : ''
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <div className="partner-logos-row">
              {partnerLogoTabs[activeLogoRegion].map((name) => (
                <div key={name} className="partner-logo-pill">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Impact Metrics CTA moved from Home (ReachSection) */}
        <section className="mb-12 text-center">
          <h2 className="sub-heading-accent mb-4" style={{ color: INTI_RED }}>
            Research Impact Metrics
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            View detailed Scopus data on our research output, subject area distribution, and collaboration growth.
          </p>
          <Link to="/research-metrics">
            <button
              className="btn-filled flex items-center justify-center gap-2 mx-auto"
              style={{ backgroundColor: INTI_RED }}
            >
              View Research Graphs and Analytics
              <BarChart className="w-4 h-4" />
            </button>
          </Link>
        </section>

        {/* Global collaborators from backend with filters and logos */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: INTI_RED }}
              >
                Global Collaboration Network
              </h2>
              <p className="text-gray-600 text-sm">
                Explore partners by country and collaboration type.
              </p>
              <div className="mt-4">
                <Link to="/all-collaborators">
                  <button className="btn-outlined flex items-center justify-center gap-2">
                    View All {collaborators.length || 5}+ Collaborators
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="w-full sm:w-60">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search partners..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Type filter */}
              <div className="w-full sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Country filter */}
              <div className="w-full sm:w-48">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Countries</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear filters */}
              {(searchTerm || filterType !== 'all' || filterCountry !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterCountry('all');
                  }}
                  className="text-xs sm:text-sm px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div
                className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto"
                style={{ borderColor: INTI_RED }}
              ></div>
              <p className="mt-4 text-gray-600 text-sm">
                Loading global collaborators...
              </p>
            </div>
          ) : filteredCollaborators.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                No collaborators found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCollaborators.map((collaborator, index) => {
                const logoUrl = getLogoForPartner(collaborator.name);
                const initials = getInitials(collaborator.name);

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={`${collaborator.name} logo`}
                            className="w-12 h-12 rounded-full object-contain bg-gray-50 border"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white"
                            style={{ backgroundColor: INTI_RED }}
                          >
                            {initials}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-base text-gray-900">
                            {collaborator.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <Globe className="w-3 h-3" />
                            <span>{collaborator.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            collaborator.type === 'Academic Institution'
                              ? 'bg-blue-100 text-blue-800'
                              : collaborator.type === 'Research Center'
                              ? 'bg-green-100 text-green-800'
                              : collaborator.type === 'Medical Institution'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {collaborator.type}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-4 h-4 mt-0.5 text-gray-500" />
                          <span>{collaborator.details}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{collaborator.collaborationCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Call to action */}
        <section className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: INTI_RED }}>
            Interested in Partnering with INTI?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We welcome new collaborations with universities, research centres,
            and industry partners worldwide. Get in touch with our International
            Office to explore potential partnerships.
          </p>
          <button
            className="px-8 py-3 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
            style={{ backgroundColor: INTI_RED }}
          >
            Contact International Office
          </button>
        </section>
      </div>
    </section>
  );
};

export default GlobalPartnersPage;
