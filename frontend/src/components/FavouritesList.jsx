import React from 'react';

export default function FavouritesList({ favourites, onRemoveFavourite, darkMode }) {
  if (!favourites.length) return <p>No favourites added yet.</p>;

  return (
    <div className="mt-3">
      <h3>Your Favourites</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {favourites.map((item) => (
          <div
            className={`col`}
            key={item.trackId || item.collectionId}
          >
            <div
              className={`card h-100 border-warning shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}
            >
              <img
                src={item.artworkUrl100.replace('100x100bb', '300x300bb')}
                className="card-img-top"
                alt={item.collectionName || item.trackName}
                style={{
                  borderRadius: '4px',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title text-truncate"
                  title={item.collectionName || item.trackName}
                >
                  {item.collectionName || item.trackName}
                </h5>
                <p className="card-text mb-1 text-truncate" title={item.artistName}>
                  <strong>Artist:</strong> {item.artistName}
                </p>
                <button
                  className="btn btn-outline-danger mt-auto"
                  onClick={() => onRemoveFavourite(item.trackId || item.collectionId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

