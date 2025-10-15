// PieChartComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, PieChart as PieChartIcon } from 'lucide-react';
import { INTI_RED, INTI_YELLOW } from '../../data/websiteData.jsx';

const PieChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const serverPort = 3001;

    // Colors for the pie chart
    const COLORS = [
        INTI_RED, 
        INTI_YELLOW, 
        '#560027', 
        '#2E8B57', 
        '#FF6B35', 
        '#4ECDC4', 
        '#45B7D1', 
        '#96CEB4', 
        '#FFEAA7', 
        '#DDA0DD'
    ];

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:${serverPort}/api/scopus-subject-areas`);
                if (response.data.success) {
                    setChartData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching subject area data:", error);
                // Fallback data
                setChartData({
                    totalDocuments: 4684,
                    subjectAreas: [
                        { subject: 'Engineering', documents: 1177, percentage: 25.1 },
                        { subject: 'Computer Science', documents: 1003, percentage: 21.4 },
                        { subject: 'Social Sciences', documents: 797, percentage: 17.0 },
                        { subject: 'Environmental Science', documents: 614, percentage: 13.1 },
                        { subject: 'Materials Science', documents: 516, percentage: 11.0 },
                        { subject: 'Physics and Astronomy', documents: 494, percentage: 10.5 },
                        { subject: 'Biochemistry, Genetics and Molecular Biology', documents: 484, percentage: 10.3 },
                        { subject: 'Medicine', documents: 476, percentage: 10.2 },
                        { subject: 'Agricultural and Biological Sciences', documents: 389, percentage: 8.3 },
                        { subject: 'Business, Management and Accounting', documents: 312, percentage: 6.7 }
                    ],
                    lastUpdated: new Date().toISOString()
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: INTI_RED }}></div>
                <p className="text-center mt-4 text-gray-600">Loading pie chart data...</p>
            </div>
        );
    }

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-800">{data.subject}</p>
                    <p className="text-sm" style={{ color: INTI_RED }}>
                        Documents: <strong>{data.documents.toLocaleString()}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                        Percentage: <strong>{data.percentage}%</strong>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {((data.documents / chartData.totalDocuments) * 100).toFixed(1)}% of total
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom label for pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        if (percent < 0.05) return null; // Don't show labels for very small slices
        
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <section className="pie-chart-section bg-gray-50 py-16 border-t border-gray-200">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <PieChartIcon className="w-8 h-8" style={{ color: INTI_RED }} />
                        <h2 className="text-3xl font-bold text-gray-800">Research Distribution by Subject Area</h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Visual breakdown of {chartData.totalDocuments.toLocaleString()} research publications across academic disciplines
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left Side - Total Documents and Top Areas */}
                    <div className="space-y-6">
                        {/* Total Documents Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                            <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: INTI_RED }} />
                            <p className="text-3xl font-bold text-gray-800">{chartData.totalDocuments.toLocaleString()}</p>
                            <p className="text-gray-600 font-medium">Total Research Documents</p>
                            <p className="text-sm text-gray-500 mt-2">Scopus Indexed</p>
                        </div>

                        {/* Top 5 Subject Areas */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Research Areas</h3>
                            <div className="space-y-3">
                                {chartData.subjectAreas.slice(0, 5).map((area, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-4 h-4 rounded-full" 
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            ></div>
                                            <span className="text-sm text-gray-700">{area.subject}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-bold" style={{ color: INTI_RED }}>
                                                {area.documents.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-2">
                                                ({area.percentage}%)
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Middle - Pie Chart */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Subject Area Distribution</h3>
                            <div className="text-sm text-gray-500">
                                {chartData.subjectAreas.length} subject areas
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartData.subjectAreas}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="documents"
                                    nameKey="subject"
                                >
                                    {chartData.subjectAreas.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend 
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{
                                        paddingLeft: "20px",
                                        fontSize: "12px"
                                    }}
                                    formatter={(value, entry) => (
                                        <span style={{ color: '#333', fontSize: '12px' }}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Chart Summary */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800 text-center">
                                <strong>Research Focus:</strong> Engineering ({chartData.subjectAreas[0].percentage}%) and 
                                Computer Science ({chartData.subjectAreas[1].percentage}%) represent nearly half of INTI's research output.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Data Source and Last Updated */}
                <div className="text-center mt-8 space-y-2">
                    <p className="text-sm text-gray-500">
                        Data sourced from Scopus • Based on ASJC classification
                    </p>
                    <p className="text-xs text-gray-400">
                        Last updated: {new Date(chartData.lastUpdated).toLocaleDateString()} at {new Date(chartData.lastUpdated).toLocaleTimeString()}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PieChartComponent;