import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const admissionsCardImages = {
  'Undergraduate study':
    'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'Postgraduate & professional study':
    'https://images.pexels.com/photos/1181524/pexels-photo-1181524.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'Lifelong learning & short courses':
    'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'International applicants':
    'https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=2000',
};

const admissionsCards = [
  {
    title: 'Undergraduate study',
    description:
      'Discover what life is like as an INTI student, explore our programmes, and learn how to apply.',
    links: [
      'Explore undergraduate programmes',
      'Entry requirements and scholarships',
      'How to apply for undergraduate study',
    ],
  },
  {
    title: 'Postgraduate & professional study',
    description:
      'Advance your expertise with taught master\'s degrees, research programmes, and professional upskilling.',
    links: [
      'Browse postgraduate programmes',
      'Research degrees at INTI',
      'Funding and scholarships',
    ],
  },
  {
    title: 'Lifelong learning & short courses',
    description:
      'Flexible part-time and short courses designed for working professionals and adult learners.',
    links: [
      'Short courses and micro-credentials',
      'Executive education and corporate training',
      'Online and blended programmes',
    ],
  },
  {
    title: 'International applicants',
    description:
      'Information for international students on entry requirements, visas, and pathway options.',
    links: [
      'Study at INTI as an international student',
      'Visa guidance and support',
      'Accommodation and campus life',
    ],
  },
];

const AdmissionsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = admissionsCards[activeIndex];
  const activeImageUrl = admissionsCardImages[activeCard.title];

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Back to home */}
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4 text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Large hero image with overlayed title, like NYU */}
      <div className="admissions-hero">
        <div className="admissions-hero-overlay" />
        <div className="container admissions-hero-inner">
          <div>
            <p className="admissions-breadcrumb">Home / Admissions</p>
            <h1 className="admissions-title">Admissions</h1>
            <p className="admissions-subtitle">
              Join a vibrant community of students across INTIs campuses and
              discover the right pathway into undergraduate, postgraduate,
              lifelong learning, and international study.
            </p>
          </div>
        </div>
      </div>

      {/* Main admissions content with left-hand section nav */}
      <section className="admissions-main">
        <div className="container admissions-main-layout">
          <aside className="admissions-side-nav">
            <h2 className="admissions-side-heading">In This Section</h2>
            <ul className="admissions-side-list">
              <li>Undergraduate Admissions</li>
              <li>Graduate Admissions</li>
              <li>Financial Aid and Scholarships</li>
              <li>Visiting Students</li>
              <li>Fall &amp; Spring Intakes</li>
              <li>Summer &amp; Short Courses</li>
              <li>January Intake</li>
              <li>International Applicants</li>
            </ul>
          </aside>

          <div className="admissions-main-content">
            <h2 className="admissions-page-heading">Admissions at INTI</h2>
            <p className="admissions-page-copy">
              Whether you are applying straight from school, returning to
              education after work experience, or joining INTI from overseas,
              our admissions team is here to guide you through every step.
            </p>
            <p className="admissions-page-copy">
              Use the links in the left-hand menu to explore admission
              requirements, application timelines, financial support options,
              and guidance for international students. You can also connect with
              our counsellors for personalised advice on choosing the right
              programme and campus.
            </p>
          </div>
        </div>
      </section>

      {/* Facts & Figures style band */}
      <section className="admissions-facts">
        <div className="container admissions-facts-inner">
          <div className="admissions-facts-header">
            <h2 className="admissions-facts-heading">Facts &amp; Figures</h2>
            <p className="admissions-facts-subtitle">
              A snapshot of opportunities available to INTI students.
            </p>
          </div>
          <div className="admissions-facts-grid">
            <article className="admissions-fact-card">
              <div className="admissions-fact-number">100+</div>
              <div className="admissions-fact-label">Global partner institutions</div>
            </article>
            <article className="admissions-fact-card">
              <div className="admissions-fact-number">9,700</div>
              <div className="admissions-fact-label">students across INTI network</div>
            </article>
            <article className="admissions-fact-card">
              <div className="admissions-fact-number">650</div>
              <div className="admissions-fact-label">programmes and study areas</div>
            </article>
          </div>
        </div>
      </section>

      {/* Which admissions route is right for you */}
      <section className="admissions-office-section">
        <div className="container admissions-office-layout">
          <div className="admissions-office-text">
            <h2 className="admissions-office-heading">
              Which Admissions Route Is Right for You?
            </h2>
            <p className="admissions-office-copy">
              INTI offers dedicated pathways for school leavers, working
              professionals, and international students. Explore our admission
              options and identify the office or counsellor best suited to help
              you.
            </p>
          </div>
          <div className="admissions-office-card">
            <h3>Chat with an Admissions Counsellor</h3>
            <p>
              Share your goals and academic background to receive
              recommendations on the most suitable programmes and campuses.
            </p>
            <button type="button" className="btn-filled admissions-office-btn">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>

      {/* Study at INTI - new tabbed layout instead of tall cards */}
      <section className="admissions-pathways">
        <div className="container">
          <div className="admissions-strip-header">
            <span className="admissions-strip-kicker">PATHWAYS INTO INTI</span>
            <h2 className="admissions-strip-heading">Study at INTI</h2>
            <p className="admissions-strip-subtitle">
              Choose the type of study that best matches your current stage
              and future ambitions.
            </p>
          </div>

          <div className="admissions-pathways-layout">
            <div className="admissions-pathways-list">
              {admissionsCards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  className={`admissions-pathways-tab ${
                    index === activeIndex ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {card.title}
                </button>
              ))}
            </div>

            <div className="admissions-pathways-detail">
              <div
                className="admissions-pathways-image"
                style={{
                  backgroundImage: activeImageUrl
                    ? `url(${activeImageUrl})`
                    : undefined,
                }}
              />
              <div className="admissions-pathways-copy">
                <h3 className="admissions-pathways-title">{activeCard.title}</h3>
                <p className="admissions-pathways-text">
                  {activeCard.description}
                </p>
                <ul className="admissions-pathways-links">
                  {activeCard.links.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdmissionsPage;
