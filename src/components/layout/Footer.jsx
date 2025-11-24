
import React from 'react';
import { INTI_RED, footerLinks } from '../../data/websiteData.jsx';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'; 

const SocialIconMap = {
    'FB': <Facebook className="social-icon-component" />,
    'IG': <Instagram className="social-icon-component" />,
    'LI': <Linkedin className="social-icon-component" />,
    'YT': <Youtube className="social-icon-component" />,
};

const Footer = () => (
    <footer className="footer">
        <div className="container footer-grid">
            {}
            <div className="footer-branding">
                <div className="footer-logo-text" style={{ color: INTI_RED }}>
                    INTI IU
                </div>
                <p className="footer-description">
                    Committed to shaping students into highly competitive and innovative global leaders through career-focused education.
                </p>
            </div>

            {}
            {footerLinks.slice(0, 2).map(col => (
                <div key={col.title} className="footer-column">
                    <h5 className="footer-title">{col.title}</h5>
                    <ul className="footer-link-list">
                        {col.links.map(link => (
                            
                            <li key={link}><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">{link}</a></li>
                        ))}
                    </ul>
                </div>
            ))}

            {}
            <div className="footer-column">
                <h5 className="footer-title">{footerLinks[2].title}</h5>
                <p className="contact-info">{footerLinks[2].contact.phone}</p>
                <p className="contact-info">{footerLinks[2].contact.email}</p>
                <div className="social-links">
                    {}
                    {footerLinks[2].contact.social.map(iconKey => (
                        
                        <a key={iconKey} href="/" onClick={(e) => e.preventDefault()} className="social-icon">
                            {SocialIconMap[iconKey] || iconKey} 
                        </a>
                    ))}
                </div>
            </div>
        </div>
        
        {}
        <div className="footer-copyright">
            &copy; 2025 INTI International University. All rights reserved. 
        </div>
    </footer>
);

export default Footer;