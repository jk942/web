import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Globe, Users, BookOpen } from 'lucide-react';
import { INTI_RED } from '../../data/websiteData.jsx';


const AllCollaboratorsPage = () => {
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCountry, setFilterCountry] = useState('all');

    useEffect(() => {
        const fetchAllCollaborators = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/scopus-all-collaborators');
                if (response.data.success) {
                    setCollaborators(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching all collaborators:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCollaborators();
    }, []);

    
    const countries = [...new Set(collaborators.map(c => c.country))].sort();
    const types = [...new Set(collaborators.map(c => c.type))].sort();

    
    const filteredCollaborators = collaborators.filter(collaborator => {
        const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            collaborator.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            collaborator.details.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = filterType === 'all' || collaborator.type === filterType;
        const matchesCountry = filterCountry === 'all' || collaborator.country === filterCountry;

        return matchesSearch && matchesType && matchesCountry;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto" style={{ borderColor: INTI_RED }}></div>
                        <p className="mt-4 text-gray-600 text-lg">Loading comprehensive list of collaborators...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header section with stats and the new filter bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    {/* Back button */}
                    <div className="absolute left-4 top-4">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Title and stats */}
                    <div className="text-center pt-4">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Research Collaborators</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {collaborators.length}+ global partners collaborating with INTI International University
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold" style={{ color: INTI_RED }}>
                                    {collaborators.length}+
                                </div>
                                <div className="text-gray-600 text-sm">Partners</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold" style={{ color: INTI_RED }}>
                                    {countries.length}+
                                </div>
                                <div className="text-gray-600 text-sm">Countries</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold" style={{ color: INTI_RED }}>
                                    {types.length}
                                </div>
                                <div className="text-gray-600 text-sm">Partner Types</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold" style={{ color: INTI_RED }}>
                                    1500+
                                </div>
                                <div className="text-gray-600 text-sm">Joint Publications</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- START: NEW FILTER AND SEARCH BAR LOCATION (Upper Right) --- */}
                {/* *** FIX APPLIED HERE: Restored 'container mx-auto' to match page width *** */}
                <div className="container mx-auto px-4 pt-0 pb-4"> 
                    <div className="flex flex-wrap justify-end items-center gap-4">
                        
                        {/* Search Bar */}
                        <div className="w-full sm:w-auto min-w-[250px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search collaborators..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter by Type */}
                        <div className="w-full sm:w-auto min-w-[180px]">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Types</option>
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter by Country */}
                        <div className="w-full sm:w-auto min-w-[180px]">
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={filterCountry}
                                    onChange={(e) => setFilterCountry(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Countries</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Clear All Filters Button */}
                        {(searchTerm || filterType !== 'all' || filterCountry !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterType('all');
                                    setFilterCountry('all');
                                }}
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
                {/* --- END: NEW FILTER AND SEARCH BAR LOCATION --- */}

            </div>

            {/* Main Content (now full width) */}
            <div className="container mx-auto px-4 py-8">
                
                {/* Header for the list */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Research Partners</h2>
                    <p className="text-gray-600 mt-1">
                        Showing {filteredCollaborators.length} of {collaborators.length} collaborators
                    </p>
                </div>

                {/* Collaborator List */}
                {filteredCollaborators.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No collaborators found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="collaborator-list-grid-3col">
                        {filteredCollaborators.map((collaborator, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{collaborator.name}</h3>
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                                            <Globe className="w-4 h-4" />
                                            {collaborator.country}
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            collaborator.type === 'Academic Institution' ? 'bg-blue-100 text-blue-800' :
                                            collaborator.type === 'Research Center' ? 'bg-green-100 text-green-800' :
                                            collaborator.type === 'Medical Institution' ? 'bg-red-100 text-red-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {collaborator.type}
                                        </span>
                                    </div>

                                    <div className="space-y-3 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                            <BookOpen className="w-4 h-4" />
                                            <span>{collaborator.details}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                            <Users className="w-4 h-4" />
                                            <span>{collaborator.collaborationCount}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                        <button className="text-sm font-medium hover:underline" style={{ color: INTI_RED }}>
                                            View Collaboration Details →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllCollaboratorsPage;