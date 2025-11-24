import React from 'react';

const columns = [
  {
    title: 'Dynamic, immersive learning',
    text: 'Learn through industry projects, live case studies, and collaborative classrooms that connect theory to real-world practice.',
  },
  {
    title: 'Global perspectives',
    text: 'Study with peers and academics from around the world, with pathways and mobility options to leading international universities.',
  },
  {
    title: 'Tight-knit community',
    text: 'Small-group learning, supportive lecturers, and campus communities that help you build lifelong networks.',
  },
  {
    title: 'Career outcomes that matter',
    text: 'From internships to industry mentoring, we focus on employability so you graduate confident and career-ready.',
  },
];

const DistinctiveSection = () => (
  <section className="distinctive-section">
    <div className="container distinctive-layout">
      <div className="distinctive-copy">
        <h2 className="distinctive-heading">What makes INTI distinctive?</h2>
        <p className="distinctive-intro">
          At INTI International University, we combine bold ideas, powerful pedagogy, and a collaborative
          community to deliver an education that travels with you around the world.
        </p>
      </div>

      <div className="distinctive-grid">
        {columns.map((col) => (
          <div key={col.title} className="distinctive-item">
            <h3>{col.title}</h3>
            <p>{col.text}</p>
          </div>
        ))}
      </div>

      <div className="distinctive-photo-panel" />
    </div>
  </section>
);

export default DistinctiveSection;
