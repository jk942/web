import React from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ReachSection from './components/sections/ReachSection.jsx';
import DiscoverPathSection from './components/sections/DiscoverPathSection.jsx';
import AboutHeroSection from './components/sections/AboutHeroSection.jsx'; 
import ScopusSection from './components/sections/ScopusSection.jsx'; 

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <AboutHeroSection />
        <ReachSection />
        {/* Place the new Scopus section here */}
        <ScopusSection /> 
        <DiscoverPathSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;