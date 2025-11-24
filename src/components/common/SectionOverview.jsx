import React from 'react';

const toItems = (items) =>
  items.map((item) =>
    typeof item === 'string' ? { label: item, href: null } : item,
  );

const SectionOverview = ({ title, intro, sections = [], relatedLinks = [] }) => {
  const sectionItems = toItems(sections);
  const relatedItems = toItems(relatedLinks);

  return (
    <section className="section-overview">
      <div className="container section-overview-inner">
        <div className="section-overview-left">
          <h1 className="section-overview-title">{title}</h1>
          <p className="section-overview-intro">{intro}</p>
        </div>

        <div className="section-overview-column">
          <h2 className="section-overview-heading">In This Section</h2>
          <ul className="section-overview-list">
            {sectionItems.map((item) => (
              <li key={item.label} className="section-overview-list-item">
                {item.href ? (
                  <a href={item.href} className="section-overview-link">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-overview-column">
          <h2 className="section-overview-heading">Related Links</h2>
          <ul className="section-overview-list">
            {relatedItems.map((item) => (
              <li key={item.label} className="section-overview-list-item">
                {item.href ? (
                  <a href={item.href} className="section-overview-link">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SectionOverview;
