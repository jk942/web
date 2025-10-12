import { INTI_RED, INTI_YELLOW } from '../../data/websiteData';

// ----------------------------------------------------------------------
// Define colors outside the component function so it's a stable constant.
// This resolves the 'no-unused-vars' warning by ensuring the variable is used later.
export const CHART_COLORS = [
    // Using the INTI colors imported from websiteData.jsx
    INTI_RED,
    INTI_YELLOW,
    '#560027',
    '#7a7a7a',
    '#007bff'
];
