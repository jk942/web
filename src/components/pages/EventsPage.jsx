import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    date: 'Thursday, November 20, 2025',
    time: '10:00 AM - 11:00 AM',
    title: 'INTI Campus Tours',
    location: 'INTI International University, Main Campus',
    tag: 'Tour',
    audience: 'Future students & families',
  },
  {
    date: 'Thursday, November 20, 2025',
    time: '12:00 PM',
    title: 'Industry Insight: Careers in Digital Health',
    location: 'Auditorium A',
    tag: 'Talk',
    audience: 'INTI community',
  },
  {
    date: 'Thursday, November 20, 2025',
    time: '3:00 PM',
    title: 'Campus Life Panel with Current Students',
    location: 'Student Lounge',
    tag: 'Panel',
    audience: 'Future students',
  },
  {
    date: 'Friday, November 21, 2025',
    time: '10:00 AM',
    title: 'Scholarships & Financial Aid Briefing',
    location: 'Financial Services Centre',
    tag: 'Info',
    audience: 'Future students & parents',
  },
  {
    date: 'Friday, November 21, 2025',
    time: '2:00 PM',
    title: 'Engineering Labs Open House',
    location: 'Engineering Block',
    tag: 'Lab Tour',
    audience: 'STEM-focused students',
  },
  {
    date: 'Friday, November 21, 2025',
    time: '7:00 PM',
    title: 'Online Info Session: Global Mobility & Exchange',
    location: 'Online webinar',
    tag: 'Online',
    audience: 'INTI community & partners',
  },
  {
    date: 'Saturday, November 22, 2025',
    time: '9:30 AM',
    title: 'Health Sciences Experience Day',
    location: 'Health Sciences Centre',
    tag: 'Hands-on',
    audience: 'Prospective Health Sciences students',
  },
  {
    date: 'Saturday, November 22, 2025',
    time: '2:30 PM',
    title: 'Alumni Career Stories: From Classroom to Industry',
    location: 'Auditorium B',
    tag: 'Alumni',
    audience: 'Current students',
  },
  {
    date: 'Sunday, November 23, 2025',
    time: '11:00 AM',
    title: 'Parents & Guardians Q&A Brunch',
    location: 'University Café',
    tag: 'New',
    audience: 'Parents & guardians',
  },
  {
    date: 'Sunday, November 23, 2025',
    time: '1:00 PM',
    title: 'Transformational Branding: Where Purpose Becomes Impact',
    location: 'Lecture Theatre 3',
    tag: 'New',
    audience: 'Public',
  },
];

const groupEventsByDate = (items) => {
  return items.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});
};

const EventsPage = () => {
  const [search, setSearch] = useState('');

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    const q = search.toLowerCase();
    return events.filter((e) =>
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.audience.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => groupEventsByDate(filteredEvents), [filteredEvents]);
  const dateKeys = Object.keys(grouped);

  return (
    <section className="events-page-wrapper">
      <div className="container events-page-container">
        {/* Breadcrumb */}
        <div className="events-breadcrumb">
          <Link to="/" className="events-breadcrumb-link">Home</Link>
          <span className="events-breadcrumb-sep">/</span>
          <span>Events</span>
        </div>

        {/* Header row with date range and filter/search */}
        <div className="events-page-top-row">
          <div>
            <h1 className="events-page-title">Events</h1>
            <p className="events-page-date-range">November 20 – December 19, 2025</p>
          </div>

          <div className="events-page-controls">
            <div className="events-search-wrapper">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="events-search-input"
                placeholder="Search events..."
              />
            </div>
            <button className="events-filter-btn">Filter events</button>
          </div>
        </div>

        {/* Grouped events list */}
        <div className="events-group-list">
          {dateKeys.length === 0 && (
            <p className="events-empty">No events match your search.</p>
          )}

          {dateKeys.map((date) => (
            <section key={date} className="events-day-section">
              <h2 className="events-day-heading">{date}</h2>
              {grouped[date].map((event) => (
                <article key={event.title} className="events-row-card">
                  <div className="events-row-media">
                    <span className="events-row-tag">{event.tag}</span>
                  </div>
                  <div className="events-row-body">
                    <h3 className="events-row-title">{event.title}</h3>
                    <p className="events-row-meta">
                      {event.time} · {event.location}
                    </p>
                    <p className="events-row-audience">Audience: {event.audience}</p>
                  </div>
                  <div className="events-row-actions">
                    <button className="events-row-cta">Register</button>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
