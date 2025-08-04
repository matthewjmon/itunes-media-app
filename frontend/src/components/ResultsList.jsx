import React from 'react';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../styles/ResultsList.css';

export default function ResultsList({ results, favourites, onAddFavourite, onRemoveFavourite, darkMode }) {
  // Display message if no search results are available
  if (!results.length) return <p className="empty-msg">No results to display.</p>;

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gx-3 gy-5 ms-lg-5 mt-1 card-grid">
      {results.map((item) => {
        const id = item.trackId || item.collectionId;
        // Check if item is already in favourites
        const isFavourite = favourites.some(
          (fav) => (fav.trackId || fav.collectionId) === id
        );
        const iconColor = darkMode ? 'white' : 'black';

        return (
          <div key={id} className="col">
            <div
              className={`card h-100 shadow-sm position-relative ${darkMode ? 'bg-dark text-light' : ''}`}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '23rem' }}
            >
              {/* Artwork image with lazy loading */}
              <div className="image-container">
                <img
                  src={item.artworkUrl100.replace('100x100bb', '300x300bb')}
                  alt={item.collectionName || item.trackName}
                  loading="lazy"
                />
              </div>

              {/* Card body with title and artist info */}
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

              {/* Favourite toggle button with tooltip, positioned bottom-right */}
              <div
                className="position-absolute bottom-0 end-0 m-3"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  isFavourite ? onRemoveFavourite(id) : onAddFavourite(item)
                }
                aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${id}`}>
                      {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    </Tooltip>
                  }
                >
                  <span>
                    {isFavourite ? (
                      <DashCircle size={24} color={iconColor} />
                    ) : (
                      <PlusCircle size={24} color={iconColor} />
                    )}
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}






