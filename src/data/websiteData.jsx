// websiteData.js (FINAL PURE DATA FILE)

// --- Constants ---
export const INTI_RED = '#AE1C30';
export const INTI_YELLOW = '#FFD900';

// --- Navigation Links (Used in Header) ---
export const navLinks = ['Home', 'Programmes', 'Global Partners', 'Admissions', 'The INTI Edge'];

// --- Mobility Programs (Used in ReachSection) ---
// Icons are now simple string names, rendered in ReachSection.jsx
export const mobilityPrograms = [
    {
        title: 'Semester Abroad Programme (SAP)',
        description: 'Study a full semester overseas at top partner universities globally, earning credits transferable back to INTI.',
        iconName: 'Plane', 
    },
    {
        title: 'Short-Term Study Tours',
        description: 'Participate in focused, short-term programs for cultural immersion, language studies, and practical workshops.',
        iconName: 'MapPin',
    },
    {
        title: 'Faculty exchnage programmes',
        description: 'The INTI Global Faculty Exchange Programme is a vital initiative designed to foster cross-cultural collaboration, research excellence, and pedagogical innovation among our faculty and our international partner institutions.',
        iconName: 'Briefcase',
    },
];

// --- Dual Degree Partners (Used in ReachSection) ---
export const dualDegreePartners = [
    {
        flag: '🇬🇧',
        university: 'University of Hertfordshire, UK',
        details: ['Business Administration (Hons)', 'Computer Science (Hons)'],
    },
    {
        flag: '🇬🇧',
        university: 'Coventry University, UK',
        details: ['Various Engineering & Computing Programmes'],
    },
    
];

// --- MOU Partner Data (Used in ReachSection) ---
export const mouPartners = [
    { 
        name: 'Universitas Abulyatama (UNAYA), Indonesia',
        details: 'Student Mobility and Exchange Programmes',
    },
    { 
        name: 'Collegium Civitas, Poland',
        details: 'Joint Publications, Research, and Student Mobility',
    },
    { 
        name: 'Over 100+ Global Partners',
        details: 'Facilitating research, faculty, and student exchanges',
    },
];

// --- Footer Links (Used in Footer) ---
export const footerLinks = [
    {
        title: 'Academic',
        links: ['Undergraduate Programmes', 'Postgraduate Studies', 'Online Learning', 'Faculty & Research'],
    },
    {
        title: 'Quick Links',
        links: ['Contact Us', 'Campus Locations', 'Careers at INTI', 'Media & News'],
    },
    {
        title: 'Get in Touch',
        contact: {
            phone: 'Call: +603-5623 2888',
            email: 'Email: enquiries@newinti.edu.my',
            social: ['FB', 'IG', 'LI', 'YT'], 
        }
    },
];