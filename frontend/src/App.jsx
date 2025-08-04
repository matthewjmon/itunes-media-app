import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import FavouritesList from './components/FavouritesList';
import Navbar from './components/Navbar';
import { Toast, ToastContainer, Form } from 'react-bootstrap';
import './styles/responsive.css';

export default function App() {
  // JWT token for API authorization
  const [jwtToken, setJwtToken] = useState('');
  // Search results returned from API
  const [results, setResults] = useState([]);
  // List of favourite items
  const [favourites, setFavourites] = useState([]);
  // Loading state for token fetching
  const [loadingToken, setLoadingToken] = useState(true);
  // UI theme toggle: dark or light mode
  const [darkMode, setDarkMode] = useState(false);
  // Track current window width for responsive layout
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to get unique id from a track or collection item
  const getId = (item) => item.trackId || item.collectionId;

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch JWT authorization token from backend API
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get('/api/token');
        setJwtToken(res.data.token);
      } catch (error) {
        alert('Failed to get authorization token. API calls will not work.');
      } finally {
        setLoadingToken(false);
      }
    };
    fetchToken();
  }, []);

  // Apply or remove dark mode CSS classes on body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // Clear search results when navigating away from home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setResults([]);
    }
  }, [location]);

  // Perform search API call using user term and media type
  const handleSearch = async (term, media) => {
    if (!jwtToken) {
      alert('Authorization token not available');
      return;
    }
    try {
      const res = await axios.post(
        '/api/itunes/search',
        { term, media },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      // Support different response data shapes
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
        ? res.data.results
        : [];

      setResults(data);
    } catch (error) {
      alert('Error fetching results: ' + (error.response?.data?.message || error.message));
    }
  };

  // Add an item to favourites if not already added
  const addFavourite = (item) => {
    const id = getId(item);
    if (!favourites.some((fav) => getId(fav) === id)) {
      setFavourites([...favourites, item]);
      showToast('Added to favourites!', 'success');
    } else {
      showToast('Already in favourites!', 'warning');
    }
  };

  // Remove an item from favourites by id
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((item) => getId(item) !== id));
    showToast('Removed from favourites.', 'danger');
  };

  // Show a toast notification with message and variant
  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: '', variant: '' }), 2500);
  };

  // Show loading screen while token is being fetched
  if (loadingToken) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading authorization token...</h3>
      </div>
    );
  }

  // Determine responsive layout values based on window width
  const isDesktop = windowWidth >= 992;
  const headerLeft = isDesktop ? '220px' : '0';
  const headerWidth = isDesktop ? 'calc(100% - 220px)' : '100%';
  const headerPaddingLeft = isDesktop ? '4.5rem' : '1rem';
  const headerPaddingRight = isDesktop ? '20px' : '1rem';

  const mainMarginLeft = isDesktop ? '220px' : '0';
  const mainWidth = isDesktop ? 'calc(100% - 220px)' : '100%';
  const mainPaddingLeft = isDesktop ? '20px' : '1rem';
  const mainPaddingRight = isDesktop ? '20px' : '1rem';
  const mainPaddingTop = isDesktop ? '90px' : '110px';

  return (
    <>
      <Navbar darkMode={darkMode} />

      {/* Fixed search header with responsive styling */}
      <div
        className={`fixed-top py-3 transparent-header d-flex justify-content-start flex-wrap stack-on-small ${
          windowWidth <= 532 ? 'stack-on-small' : ''
        }`}
        style={{
          zIndex: 1050,
          left: headerLeft,
          width: headerWidth,
          paddingLeft: headerPaddingLeft,
          paddingRight: headerPaddingRight,
          backgroundColor: darkMode ? '#121212' : '#e6e6e6',
          transition: 'background-color 0.3s ease, left 0.3s ease, width 0.3s ease, padding 0.3s ease',
          gap: '1rem',
        }}
      >
        <div className="search-wrapper flex-grow-1">
          <SearchBar onSearch={handleSearch} darkMode={darkMode} />
        </div>

        <div className="tools-wrapper d-flex align-items-center" style={{ gap: '1rem' }}>
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label={darkMode ? 'Dark Mode' : 'Light Mode'}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className={darkMode ? 'text-light' : ''}
            style={{ whiteSpace: 'nowrap', marginRight: isDesktop ? '2rem' : '0.5rem' }}
          />
        </div>
      </div>

      {/* Main content container with responsive spacing */}
      <div
        className="main-content"
        style={{
          marginLeft: mainMarginLeft,
          width: mainWidth,
          paddingTop: mainPaddingTop,
          paddingLeft: mainPaddingLeft,
          paddingRight: mainPaddingRight,
          minHeight: '100vh',
          backgroundColor: darkMode ? '#121212' : '#e6e6e6',
          color: darkMode ? 'white' : 'black',
          transition:
            'background-color 0.3s ease, margin-left 0.3s ease, width 0.3s ease, padding 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ResultsList
                results={results}
                favourites={favourites}
                onAddFavourite={addFavourite}
                onRemoveFavourite={removeFavourite}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <FavouritesList
                favourites={favourites}
                onRemoveFavourite={removeFavourite}
                darkMode={darkMode}
              />
            }
          />
        </Routes>
      </div>

      {/* Toast notification container */}
      <ToastContainer className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 2000 }}>
        <Toast
          show={toast.show}
          bg={toast.variant}
          onClose={() => setToast({ show: false })}
          delay={2500}
          autohide
        >
          <Toast.Body className="text-white fw-semibold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}



