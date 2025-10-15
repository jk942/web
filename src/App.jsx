import React from 'react';
// 🆕 ADD ROUTER IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ReachSection from './components/sections/ReachSection.jsx';
import DiscoverPathSection from './components/sections/DiscoverPathSection.jsx';
import AboutHeroSection from './components/sections/AboutHeroSection.jsx'; 
import ScopusSection from './components/sections/ScopusSection.jsx'; 
// 🆕 IMPORT THE NEW PAGE COMPONENT
import MOUListPage from './components/pages/MOUListPage.jsx'; 

// Component for the content displayed on the Home Page
const HomePageContent = () => (
    <>
        <HeroSection />
        <AboutHeroSection />
        <ReachSection />
        <ScopusSection /> 
        <DiscoverPathSection />
    </>
);

const App = () => {
  return (
    // 🆕 WRAP THE ENTIRE APP IN BROWSER ROUTER
    <BrowserRouter>
        <div className="min-h-screen bg-white font-sans antialiased">
            <Header />
            <main>
                {/* 🆕 DEFINE ALL ROUTES */}
                <Routes>
                    {/* Route for the Home Page (/) */}
                    <Route path="/" element={<HomePageContent />} />
                    
                    {/* Route for the MOU List Page (/mou-partners) */}
                    <Route path="/mou-partners" element={<MOUListPage />} />
                    
                    {/* You can add a 404 handler here if needed */}
                </Routes>
            </main>
            <Footer />
        </div>
    </BrowserRouter>
  );
};

export default App;