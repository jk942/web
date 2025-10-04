import React from 'react';
import { Plane, MapPin, Briefcase, GraduationCap, Users, ArrowLeft } from 'lucide-react';

// Primary color data (deep red)
export const INTI_RED = '#AE1C30';
export const INTI_YELLOW = '#FFD900';

// Navigation data
export const navLinks = ['Programmes', 'Global Partners', 'Admissions', 'The INTI Edge'];

// Student Mobility Program Data
export const mobilityPrograms = [
    {
        title: 'Semester Abroad Programme (SAP)',
        description: 'Study a full semester overseas at top partner universities globally, earning credits transferable back to INTI.',
        icon: <Plane className="w-6 h-6" style={{ color: INTI_RED }} />,
    },
    {
        title: 'Short-Term Study Tours',
        description: 'Participate in focused, short-term programs for cultural immersion, language studies, and practical workshops.',
        icon: <MapPin className="w-6 h-6" style={{ color: INTI_RED }} />,
    },
    {
        title: 'International Internships',
        description: 'Secure international work placements with MNCs, gaining invaluable global work ethic and cross-cultural experience.',
        icon: <Briefcase className="w-6 h-6" style={{ color: INTI_RED }} />,
    },
];

// Dual Degree Partner Data
export const dualDegreePartners = [
    {
        flag: '🇬🇧',
        university: 'University of Hertfordshire, UK',
        details: ['Business Administration (Hons)', 'Accounting and Finance (Hons)'],
    },
    {
        flag: '🇬🇧',
        university: 'Coventry University, UK',
        details: ['Various Engineering & Computing Programmes'],
    },
    {
        flag: '🇺🇸',
        university: 'Southern New Hampshire University, USA',
        details: ['American Degree Transfer Program (AUP)'],
    },
    {
        flag: '🇦🇺',
        university: 'Swinburne University of Technology, Australia',
        details: ['Collaborative Programs in IT & Business'],
    },
];

// MOU Partner Data
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

// Footer Link Data
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
            social: ['FB', 'IG', 'LI'],
        }
    }
];

export const icons = { GraduationCap, Users, ArrowLeft };
