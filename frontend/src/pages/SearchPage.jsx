import React from 'react';
import ResultsList from '../components/ResultsList';

export default function SearchPage({ results, favourites, onAddFavourite, darkMode }) {
  return (
    <div className="container mt-4">
      {results.length === 0 ? (
        <p>No results to display.</p>
      ) : (
        <ResultsList
          results={results}
          favourites={favourites}
          onAddFavourite={onAddFavourite}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
