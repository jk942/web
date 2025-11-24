import { mobilityPrograms, dualDegreePartners, mouPartners } from './websiteData.jsx';

// Static top-level pages
const baseItems = [
  {
    id: 'home',
    title: 'Home',
    type: 'Page',
    path: '/',
    keywords: 'INTI International University overview, hero, distinctive advantages, news, events',
  },
  {
    id: 'programmes',
    title: 'Programmes',
    type: 'Page',
    path: '/programmes',
    keywords: 'degree programmes, mobility, exchange, dual degree, MOU partners',
  },
  {
    id: 'global-partners',
    title: 'Global Partners',
    type: 'Page',
    path: '/global-partners',
    keywords: 'global partners, collaborators, research, MOU',
  },
  {
    id: 'admissions',
    title: 'Admissions',
    type: 'Page',
    path: '/admissions',
    keywords: 'undergraduate, postgraduate, lifelong learning, international applicants',
  },
  {
    id: 'events',
    title: 'Events',
    type: 'Page',
    path: '/events',
    keywords: 'campus tours, info sessions, open days, webinars',
  },
];

export const buildSearchIndex = () => {
  const items = [...baseItems];

  // Mobility programmes
  mobilityPrograms.forEach((p) => {
    items.push({
      id: `mobility-${p.title}`,
      title: p.title,
      type: 'Mobility Programme',
      path: '/programmes',
      keywords: p.description,
    });
  });

  // Dual degree partners
  dualDegreePartners.forEach((partner) => {
    items.push({
      id: `dual-${partner.university}`,
      title: partner.university,
      type: 'Dual Degree Partner',
      path: '/global-partners',
      keywords: (partner.details || []).join(' '),
    });
  });

  // MOU partners (featured)
  mouPartners.forEach((partner) => {
    items.push({
      id: `mou-${partner.name}`,
      title: partner.name,
      type: 'MOU Partner',
      path: '/global-partners',
      keywords: partner.details,
    });
  });

  return items;
};
