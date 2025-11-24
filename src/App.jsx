import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ReachSection from './components/sections/ReachSection.jsx';
import DiscoverPathSection from './components/sections/DiscoverPathSection.jsx';
import InsightsSection from './components/sections/InsightsSection.jsx';
import DistinctiveSection from './components/sections/DistinctiveSection.jsx';
import EventsNewsSection from './components/sections/EventsNewsSection.jsx';
import AboutHeroSection from './components/sections/AboutHeroSection.jsx'; 
import ScopusSection from './components/sections/ScopusSection.jsx'; // This import is now redundant but can remain for safety
import MOUListPage from './components/pages/MOUListPage.jsx'; 
import AllCollaboratorsPage from './components/pages/AllCollaboratorsPage.jsx';
import ScopusMetricsPage from './components/pages/ScopusMetricsPage.jsx';
import GlobalPartnersPage from './components/pages/GlobalPartnersPage.jsx';
import ProgrammesPage from './components/pages/ProgrammesPage.jsx';
import ProgrammeDetailPage from './components/pages/ProgrammeDetailPage.jsx';
import AdmissionsPage from './components/pages/AdmissionsPage.jsx';
import EventsPage from './components/pages/EventsPage.jsx';


const HomePageContent = () => (
    <>
        <HeroSection />
        <AboutHeroSection />
        {/* ReachSection removed from home */}
        {/* REMOVED: <ScopusSection /> */}
        <InsightsSection />
        <DistinctiveSection />
        <EventsNewsSection />
        <DiscoverPathSection />
    </>
);

const App = () => {
  return (
    
    <BrowserRouter>
        <div className="min-h-screen bg-white font-sans antialiased">
            <Header />
            <main>
                {/* Main content area */}
                <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<HomePageContent />} />
                    
                    {/* Other Pages */}
                    <Route path="/programmes" element={<ProgrammesPage />} />
                    <Route path="/programmes/:programSlug" element={<ProgrammeDetailPage />} />
                    <Route path="/mou-partners" element={<MOUListPage />} />

                    <Route path="/all-collaborators" element={<AllCollaboratorsPage />} />

                    <Route path="/research-metrics" element={<ScopusMetricsPage />} />

                    <Route path="/global-partners" element={<GlobalPartnersPage />} />
                    <Route path="/admissions" element={<AdmissionsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    
                    {/* Additional Routes can go here */}
                </Routes>
            </main>
            <Footer />
        </div>
    </BrowserRouter>
  );
};

export default App;