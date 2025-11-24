
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { navLinks } from '../../data/websiteData.jsx';
import SearchModal from '../common/SearchModal.jsx';

const megaMenuContent = {
  Programmes: {
    title: 'Programmes',
    intro:
      "Explore INTI's degree pathways, mobility options, and global dual degree opportunities across disciplines.",
    sections: [
      'Mobility & Exchange Programmes',
      'Dual Degree Partners',
      'Global MOU Partners',
    ],
    relatedLinks: ['Admissions', 'Global Partners', 'Research Metrics', 'Events'],
  },
  'Global Partners': {
    title: 'Global Partners',
    intro:
      'Discover our worldwide network of universities, research centres, and industry collaborators supporting INTI students and staff.',
    sections: [
      'Dual Degree Partners',
      'Featured MOU Partners',
      'Research Impact Metrics',
      'Global Collaboration Network',
    ],
    relatedLinks: ['Programmes', 'Admissions', 'All Collaborators', 'Research Metrics'],
  },
  Admissions: {
    title: 'Admissions',
    intro:
      'Join thousands of students studying across INTI programmes and learn how to apply, fund, and prepare for your studies.',
    sections: [
      'Undergraduate Admissions',
      'Graduate Admissions',
      'Financial Aid and Scholarships',
      'Visiting Students',
    ],
    relatedLinks: ['Programmes', 'Tuition and Fees', 'Studying Abroad'],
  },
  Events: {
    title: 'Events',
    intro:
      'See upcoming campus activities, info sessions, and online events where you can connect with INTI.',
    sections: [
      'Campus Tours & Open Days',
      'Info Sessions & Briefings',
      'Student Life & Alumni Events',
      'Online Events & Webinars',
    ],
    relatedLinks: ['Admissions', 'Programmes', 'Global Partners'],
  },
};

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavEnter = (label) => {
    if (megaMenuContent[label]) {
      setActiveMenu(label);
    } else {
      setActiveMenu(null);
    }
  };

  const handleHeaderLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="header" onMouseLeave={handleHeaderLeave}>
      <div className="container header-layout">
        <div className="logo-text">
          INTI <span className="logo-subtitle">International University</span>
        </div>

        <nav className="nav-menu">
          {navLinks.map((link) => {
            const path =
              link === 'Global Partners'
                ? '/global-partners'
                : link === 'Programmes'
                ? '/programmes'
                : link === 'Admissions'
                ? '/admissions'
                : link === 'Events'
                ? '/events'
                : '/';

            const hasDropdown = !!megaMenuContent[link];

            return (
              <div
                key={link}
                className="nav-item"
                onMouseEnter={() => handleNavEnter(link)}
                onMouseLeave={handleHeaderLeave}
              >
                <Link
                  to={path}
                  className="nav-link"
                  onFocus={() => handleNavEnter(link)}
                >
                  <span className="nav-link-label">{link}</span>
                  {link !== 'Home' && (
                    <span className="nav-link-arrow">▾</span>
                  )}
                </Link>

                {hasDropdown && activeMenu === link && (
                  <div className="nav-dropdown">
                    {megaMenuContent[link].sections.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="nav-dropdown-item"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="nav-search-button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            🔍
          </button>
          <Button primary className="apply-btn-desktop">Apply Now</Button>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
