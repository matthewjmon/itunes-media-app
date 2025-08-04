import React, { useState, useEffect, useRef } from 'react';
import '../styles/SearchBar.css';

// Media options for the category select dropdown
const mediaOptions = [
  { label: 'All', value: 'all' },
  { label: 'Movie', value: 'movie' },
  { label: 'Podcast', value: 'podcast' },
  { label: 'Music', value: 'music' },
  { label: 'Audiobook', value: 'audiobook' },
  { label: 'Short Film', value: 'shortFilm' },
  { label: 'TV Show', value: 'tvShow' },
  { label: 'Software', value: 'software' },
  { label: 'eBook', value: 'ebook' },
];

// Custom hook to debounce input values to limit rapid API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup timeout if value or delay changes before timeout completes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar({ onSearch, darkMode }) {
  // Controlled input for search term
  const [term, setTerm] = useState('');
  // Controlled select for media category
  const [media, setMedia] = useState('all');
  // Reference to input element for focus control
  const inputRef = useRef(null);

  // Debounced versions of term and media to reduce API calls frequency
  const debouncedTerm = useDebounce(term, 500);
  const debouncedMedia = useDebounce(media, 500);

  // Trigger search whenever debounced search term or media type changes
  useEffect(() => {
    if (debouncedTerm.trim() !== '') {
      onSearch(debouncedTerm, debouncedMedia);
    }
  }, [debouncedTerm, debouncedMedia, onSearch]);

  // Handler to clear the search input and focus it
  const clearInput = () => {
    setTerm('');
    inputRef.current.focus();
  };

  return (
    <form
      className="d-flex align-items-center position-relative flex-wrap w-100"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="search"
        aria-label="Search iTunes media"
        className={`form-control me-2 ${
          darkMode ? 'bg-dark text-light border-secondary dark-mode-placeholder' : ''
        }`}
        placeholder="Search iTunes media..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{
          width: '100%',
          minWidth: '150px',
          maxWidth: '300px',
          paddingRight: '2rem', // space for a clear button if added later
        }}
      />

      <select
        className={`category-select form-select w-auto ${
          darkMode ? 'bg-dark text-light border-secondary' : ''
        }`}
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        aria-label="Select media type"
      >
        {mediaOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Intentionally no search button — search triggers on input change */}
    </form>
  );
}
