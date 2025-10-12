const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); 

const app = express();
// Use port 3001
const PORT = process.env.PORT || 3001; 

// Enable CORS
app.use(cors()); 

// Middleware for Parsing JSON Request Bodies
app.use(express.json());


// ----------------------------------------------------------------------
// --- 1. MOCK SCOPUS COLLABORATORS ENDPOINT (for the SLIDER) ---
// ----------------------------------------------------------------------
app.get('/api/scopus-collaborators', async (req, res) => {
    // ⚠️ NOTE: Live web scraping of Scopus pages is complex, prone to breaking, and often violates terms of service.
    // This endpoint now returns MOCK/STATIC data to make the frontend carousel functional.
    console.log('Serving mock data for /api/scopus-collaborators');
    
    const mockCollaborators = [
        { name: 'Universitas Abulyatama (UNAYA), Indonesia', details: 'Student Mobility and Exchange Programmes' },
        { name: 'Collegium Civitas, Poland', details: 'Joint Publications, Research, and Student Mobility' },
        { name: 'University of Westminster, UK', details: 'Joint Research Initiatives' },
        { name: 'Universiti Malaya (UM)', details: 'Faculty Exchange and Joint Research' },
        { name: 'Over 100+ Global Partners', details: 'Facilitating research, faculty, and student exchanges' },
    ];
    
    // Simulate a successful API response
    res.json({ success: true, data: mockCollaborators });
});


// ----------------------------------------------------------------------
// --- 2. NEW MOCK SCOPUS GRAPH ENDPOINT (for the GRAPH) ---
// ----------------------------------------------------------------------
app.get('/api/scopus-collaboration-graph', async (req, res) => {
    // ⚠️ NOTE: This endpoint returns MOCK/STATIC graph data.
    // To fetch live data, you would need to integrate the official Scopus API (requiring an API key).
    console.log('Serving mock data for /api/scopus-collaboration-graph');

    // Mock data mimicking the Collaboration Growth Graph
    const mockGraphData = [
        { year: 2020, collaborations: 5 },
        { year: 2021, collaborations: 12 },
        { year: 2022, collaborations: 25 },
        { year: 2023, collaborations: 35 },
        { year: 2024, collaborations: 50 },
    ];
    
    res.json({ success: true, data: mockGraphData });
});


// ----------------------------------------------------------------------
// --- 3. Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Ensure you run this server using 'node server.js' or similar tool.`);
});