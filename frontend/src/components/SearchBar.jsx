import React, { useState, useEffect } from 'react';

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

// Debounce helper to limit API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

export default function SearchBar({ onSearch, darkMode }) {
  const [term, setTerm] = useState('');
  const [media, setMedia] = useState('all');

  const debouncedTerm = useDebounce(term, 500);  // 500ms debounce
  const debouncedMedia = useDebounce(media, 500);

  // Run search automatically when term or media changes after debounce delay
  useEffect(() => {
    if (debouncedTerm.trim() !== '') {
      onSearch(debouncedTerm, debouncedMedia);
    }
  }, [debouncedTerm, debouncedMedia, onSearch]);

  return (
    <form className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        aria-label="Search iTunes media"
        className={`form-control me-2 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
        placeholder="Search iTunes media..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{ width: '300px', minWidth: '150px' }} // narrower input width
      />

      <select
        className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        style={{ width: '120px' }} // shorter dropdown
        aria-label="Select media type"
      >
        {mediaOptions.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      
      {/* No search button */}
    </form>
  );
}
