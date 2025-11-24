// ScopusGraphComponent.jsx
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
// NOTE: Ensure the path to CHART_COLORS is correct based on where you place this file.
// Assuming it's in the same directory as PieChartComponent.
import { CHART_COLORS } from '../pages/CHART_COLORS.jsx'; 
import { INTI_RED } from '../../data/websiteData.jsx';

const ScopusGraphComponent = () => {
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const serverPort = 3001; 

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                // NOTE: This endpoint might need to be created on your backend (server.js)
                const response = await axios.get(`http://localhost:${serverPort}/api/scopus-collaboration-graph`);
                
                if (response.data.success && response.data.data.length > 0) {
                    setGraphData(response.data.data);
                    setIsLive(true);
                } else {
                    setIsLive(false);
                }
            } catch (err) {
                console.error("Failed to fetch Scopus graph data, using fallback.", err);
                setIsLive(false);
                // Fallback Data (Restored original data structure)
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
            <p className="text-center text-sm mb-4" style={{ color: isLive ? 'green' : INTI_RED }}>
                {isLive ? `Data fetched live from backend.` : `Displaying static fallback graph data.`}
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

export default ScopusGraphComponent;