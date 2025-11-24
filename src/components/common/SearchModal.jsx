import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildSearchIndex } from '../../data/searchIndex.jsx';

const allItems = buildSearchIndex();

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;

    return allItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.toLowerCase().includes(q)) ||
        (item.type && item.type.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  if (!open) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal-input-row">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes, partners, admissions, events..."
            className="search-modal-input"
          />
          <button
            type="button"
            className="search-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="search-modal-results">
          {filtered.length === 0 ? (
            <p className="search-modal-empty">No results found.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className="search-modal-result"
                onClick={() => handleSelect(item)}
              >
                <div className="search-modal-result-title">{item.title}</div>
                <div className="search-modal-result-meta">
                  <span className="search-modal-result-type">{item.type}</span>
                  <span className="search-modal-result-path">{item.path}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
