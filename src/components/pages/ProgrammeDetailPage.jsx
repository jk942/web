import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INTI_RED, mobilityPrograms } from '../../data/websiteData.jsx';
import { programmeImages } from './ProgrammesPage.jsx';

const ProgrammeDetailPage = () => {
  const { programSlug } = useParams();

  const programme = mobilityPrograms.find((p) => p.slug === programSlug);

  if (!programme) {
    return (
      <section className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 pt-8 pb-16">
          <div className="mb-4">
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Back to Programmes
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: INTI_RED }}>
              Programme not found
            </h1>
            <p className="text-gray-600">
              We couldn't find the programme you're looking for. Please go back to the
              Programmes page and try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const imageUrl = programmeImages[programme.title];

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Back to Programmes
          </Link>
        </div>
      </div>

      <div className="programmes-hero-header">
        <div className="container programmes-hero-header-inner">
          <div>
            <p className="programmes-breadcrumb">Home / Programmes / {programme.title}</p>
            <h1 className="programmes-title">{programme.title}</h1>
            <p className="programmes-subtitle">{programme.description}</p>
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="programmes-hero-image-wrapper">
          <div
            className="programmes-hero-image"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4" style={{ color: INTI_RED }}>
            About this programme
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {programme.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Who is this for?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                This programme is designed for INTI students who want to broaden their
                academic experience, build a global network, and develop cross-cultural
                skills that are highly valued by employers worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What you&apos;ll gain</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Academic credits that can be transferred back to your INTI degree</li>
                <li>Exposure to different teaching styles and learning environments</li>
                <li>Opportunities to build international friendships and networks</li>
                <li>Enhanced confidence, independence, and cultural awareness</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Next steps</h3>
              <p className="text-gray-700 text-sm">
                Contact the International Office or your programme advisor for detailed
                eligibility requirements, partner universities, and application timelines.
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: INTI_RED }}
            >
              Enquire about this programme
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeDetailPage;
