import React from 'react';

export default function ResultsList({ results, favourites, onAddFavourite, darkMode }) {
  if (!results.length) return <p>No results to display.</p>;

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {results.map((item) => {
        const isFavourite = favourites.some(fav => (fav.trackId || fav.collectionId) === (item.trackId || item.collectionId));
        return (
          <div key={item.trackId || item.collectionId} className="col">
            <div
              className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.artworkUrl100.replace('100x100bb', '300x300bb')}
                className="card-img-top"
                alt={item.collectionName || item.trackName}
                style={{ borderRadius: '4px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={item.collectionName || item.trackName}>
                  {item.collectionName || item.trackName}
                </h5>
                <p className="card-text mb-1 text-truncate" title={item.artistName}>
                  <strong>Artist:</strong> {item.artistName}
                </p>
                <p className="card-text mb-2">
                  <strong>Release Date:</strong>{' '}
                  {new Date(item.releaseDate).toLocaleDateString()}
                </p>
                <button
                  className={`btn mt-auto ${
                    isFavourite ? 'btn-success disabled' : 'btn-outline-primary'
                  }`}
                  onClick={() => onAddFavourite(item)}
                  disabled={isFavourite}
                >
                  {isFavourite ? 'Added' : 'Add to Favourites'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
