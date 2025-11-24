# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

INTI International University website - a React-based marketing website showcasing the university's global partnerships, research metrics, and academic programs. The application includes a Node.js/Express backend for web scraping Scopus data.

## Development Commands

### Frontend (React)
- `npm start` - Start development server on http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build production bundle to `build/` folder

### Backend (Express API)
- `npm run server` - Start Express API server on http://localhost:3001

### Development Workflow
For full-stack development, run both commands in separate terminals:
```bash
# Terminal 1
npm start

# Terminal 2
npm run server
```

### Testing
- Run all tests: `npm test`
- Test files are colocated with source files using `.test.js` suffix
- Testing setup uses React Testing Library and Jest DOM (configured in `src/setupTests.js`)

## Architecture

### Frontend Structure

**Component Organization:**
- `src/components/layout/` - Header and Footer components (site-wide structure)
- `src/components/pages/` - Full page components rendered via routing
- `src/components/sections/` - Reusable section components composed into pages
- `src/components/common/` - Reusable UI primitives (buttons, etc.)

**Routing Pattern:**
The app uses React Router with routes defined in `src/App.jsx`:
- `/` - Home page (composition of HeroSection, AboutHeroSection, ReachSection, DiscoverPathSection)
- `/mou-partners` - MOU partners list page
- `/all-collaborators` - All collaborators page
- `/research-metrics` - Scopus research metrics page

**Data Management:**
- `src/data/websiteData.jsx` - Centralized data exports (constants, nav links, partner data)
- Brand colors defined as exports: `INTI_RED = '#AE1C30'`, `INTI_YELLOW = '#FFD900'`
- Static data arrays exported for partners, programs, and footer content

**Styling:**
- CSS-in-JS using `App.css` and `index.css` for global styles
- Tailwind CSS available via devDependencies but styles primarily use custom CSS classes
- Component styles use semantic class names (e.g., `hero-section`, `program-card`, `mou-card`)
- Inline styles used sparingly for dynamic brand color application

### Backend Structure

**Server:** `server/server.js` - Express API server with CORS enabled

**API Endpoints:**
- `GET /api/scopus-collaborators` - Scrapes/returns list of collaborating institutions
- `GET /api/scopus-collaboration-graph` - Returns regional collaboration distribution data
- `GET /api/scopus-metrics` - Returns institution research metrics

**Scraping Strategy:**
- Uses Axios + Cheerio for web scraping Scopus pages
- Implements fallback to mock data when scraping fails
- Response format: `{ success: boolean, data: any[], source: string }`

### Frontend-Backend Integration

Pages that fetch from backend API (using Axios):
- `MOUListPage.jsx` - Fetches from `/api/scopus-collaborators`
- `AllCollaboratorsPage.jsx` - Fetches from `/api/scopus-collaborators`
- `ScopusMetricsPage.jsx` - Fetches from `/api/scopus-metrics` and `/api/scopus-collaboration-graph`
- `ReachSection.jsx` - Embeds `ScopusCollaborators` component that fetches from API

Pattern: Components manage loading state, fetch data in `useEffect`, and fall back to static data on error.

## Key Technical Details

### Dependencies
- **UI Libraries:** React 19, React Router, Lucide React (icons), React Slick (carousels)
- **Data Visualization:** Recharts for charts/graphs
- **Backend:** Express, Axios, Cheerio, CORS
- **Testing:** React Testing Library, Jest DOM

### Build Tool
- Create React App (react-scripts) - standard CRA configuration
- Proxy configured in package.json: `"proxy": "http://localhost:3001"`

### File Naming Convention
- React components use `.jsx` extension
- Test files use `.test.js` extension
- Component files use PascalCase naming (e.g., `HeroSection.jsx`)

## Development Guidelines

### Component Patterns
- Functional components with hooks (useState, useEffect)
- Props destructuring in function parameters
- Small presentational components extracted (e.g., `ProgramCard`, `PartnerCard`, `MOUCard`)
- Icon components mapped via object lookup (see `IconComponentMap` pattern in ReachSection)

### Data Fetching Pattern
```javascript
const [data, setData] = useState(defaultData);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/endpoint`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
      // Fall back to static data
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Brand Colors
Always use the exported constants from `src/data/websiteData.jsx`:
- Primary: `INTI_RED` (#AE1C30)
- Accent: `INTI_YELLOW` (#FFD900)

### Adding New Routes
1. Create page component in `src/components/pages/`
2. Import and add `<Route>` in `src/App.jsx`
3. Add navigation link in Header or use `<Link>` from react-router-dom

### API Development
When adding new API endpoints:
1. Add route handler in `server/server.js`
2. Implement try-catch with fallback mock data
3. Return consistent response format: `{ success, data, source }`
4. Set appropriate CORS headers (already configured globally)
