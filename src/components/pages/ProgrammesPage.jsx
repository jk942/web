import React from 'react';
import { Link } from 'react-router-dom';
import {
  INTI_RED,
  INTI_YELLOW,
  mobilityPrograms,
  dualDegreePartners,
  mouPartners,
} from '../../data/websiteData.jsx';

export const programmeImages = {
  'Semester Abroad Programme (SAP)':
    'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'Short-Term Study Tours':
    'https://images.pexels.com/photos/1181398/pexels-photo-1181398.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'Faculty exchnage programmes':
    'https://images.pexels.com/photos/1181504/pexels-photo-1181504.jpeg?auto=compress&cs=tinysrgb&w=2000',
};

const ProgrammesPage = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Oxford-style header + hero image */}
      <div className="programmes-hero-header">
        <div className="container programmes-hero-header-inner">
          <div>
            <p className="programmes-breadcrumb">Home / Programmes</p>
            <h1 className="programmes-title">Programmes</h1>
            <p className="programmes-subtitle">
              Learn more about the international pathways, exchanges and
              experiences available at INTI, and find the right programme to
              build your future.
            </p>
          </div>
        </div>
      </div>

      <div className="programmes-hero-image-wrapper">
        <div className="programmes-hero-image" />
      </div>

      {/* Stats strip tailored for programmes */}
      <div className="global-partners-strip">
        <div className="container global-partners-strip-inner">
          <div className="global-strip-card">
            <div className="global-strip-label">Mobility & Exchange Options</div>
            <div className="global-strip-value">{mobilityPrograms.length}</div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">Dual Degree Partners</div>
            <div className="global-strip-value">
              {dualDegreePartners.length}
            </div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">Global MOU Partners</div>
            <div className="global-strip-value">{mouPartners.length}+</div>
          </div>
          <div className="global-strip-card">
            <div className="global-strip-label">INTI Advantage</div>
            <div className="global-strip-value">Career-Ready Graduates</div>
          </div>
        </div>
      </div>

      {/* Main content - Oxford-style image cards for mobility programmes */}
      <div className="container mx-auto px-4 py-12">
        <section id="mobility" className="mb-12 oxford-mobility-section">
          <h2 className="text-2xl font-bold mb-8" style={{ color: INTI_RED }}>
            Mobility &amp; Exchange Programmes
          </h2>

          <div className="oxford-mobility-grid">
            {mobilityPrograms.map((program) => {
              const imageUrl = programmeImages[program.title];
              return (
                <article key={program.title} className="oxford-mobility-card">
                  <div
                    className="oxford-mobility-card-image"
                    style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                  />
                  <div className="oxford-mobility-card-body">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <Link
                      to={`/programmes/${program.slug}`}
                      className="oxford-mobility-card-cta"
                    >
                      Learn more
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProgrammesPage;