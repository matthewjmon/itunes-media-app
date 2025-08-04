import React from 'react';
import { DashCircle } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../styles/ResultsList.css';

export default function FavouritesList({ favourites, onRemoveFavourite, darkMode }) {
  // Display message if no favourites are added
  if (!favourites.length) return <p className="empty-msg">No favourites added yet.</p>;

  return (
    <div className="ms-lg-3">
      <h3 className="text-center mb-1">Your Favourites</h3>

      {/* Responsive grid of favourite items */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gx-3 gy-5 ms-5 mt-1 card-grid">
        {favourites.map((item) => (
          <div className="col" key={item.trackId || item.collectionId}>
            <div
              className={`card h-100 shadow-sm position-relative ${darkMode ? 'bg-dark text-light' : ''}`}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '23rem' }}
            >
              {/* Album or track artwork */}
              <div className="image-container">
                <img
                  src={item.artworkUrl100.replace('100x100bb', '300x300bb')}
                  alt={item.collectionName || item.trackName}
                  loading="lazy"
                />
              </div>

              {/* Card body with details */}
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
                <p className="card-text mb-2">
                  <strong>Release Date:</strong>{' '}
                  {new Date(item.releaseDate).toLocaleDateString()}
                </p>
              </div>

              {/* Remove button with tooltip, positioned bottom-right */}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-remove-${item.trackId || item.collectionId}`}>
                    Remove from favourites
                  </Tooltip>
                }
              >
                <button
                  className="btn position-absolute"
                  style={{
                    bottom: '10px',
                    right: '10px',
                    padding: 0,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => onRemoveFavourite(item.trackId || item.collectionId)}
                  aria-label="Remove from favourites"
                >
                  <DashCircle
                    size={24}
                    color={darkMode ? 'white' : 'black'}
                    title="Remove from Favourites"
                  />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


