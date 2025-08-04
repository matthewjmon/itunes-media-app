import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import FavouritesList from './components/FavouritesList';
import Navbar from './components/Navbar';
import { Toast, ToastContainer, Form } from 'react-bootstrap';

export default function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loadingToken, setLoadingToken] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const getId = (item) => item.trackId || item.collectionId;

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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // Optional: Clear results when leaving search page to avoid stale flicker
  useEffect(() => {
    if (location.pathname !== '/') {
      setResults([]);
    }
  }, [location]);

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

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
        ? res.data.results
        : [];

      setResults(data);

      // Removed navigate('/') to prevent flicker/unnecessary remount
    } catch (error) {
      alert('Error fetching results: ' + (error.response?.data?.message || error.message));
    }
  };

  const addFavourite = (item) => {
    const id = getId(item);
    if (!favourites.some((fav) => getId(fav) === id)) {
      setFavourites([...favourites, item]);
      showToast('Added to favourites!', 'success');
    } else {
      showToast('Already in favourites!', 'warning');
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((item) => getId(item) !== id));
    showToast('Removed from favourites.', 'danger');
  };

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: '', variant: '' }), 2500);
  };

  if (loadingToken) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading authorization token...</h3>
      </div>
    );
  }

  return (
    <>
      <Navbar darkMode={darkMode} />

      {/* Transparent Search Bar with Dark Mode Toggle on far right */}
      <div
        className="fixed-top py-3 transparent-header d-flex align-items-center"
        style={{
          zIndex: 1050,
          borderBottom: '1px solid #ddd',
          left: '220px',
          width: 'calc(100% - 220px)',
          paddingLeft: 0,
          paddingRight: '20px',
          backgroundColor: darkMode ? '#121212' : 'white',
          transition: 'background-color 0.3s ease',
          gap: '1rem',
        }}
      >
        <div className="container-fluid px-0 d-flex align-items-center" style={{ flexGrow: 1 }}>
          <SearchBar onSearch={handleSearch} darkMode={darkMode} />
        </div>

        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label={darkMode ? 'Dark Mode' : 'Light Mode'}
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className={darkMode ? 'text-light' : ''}
          style={{ whiteSpace: 'nowrap' }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: '220px',
          width: 'calc(100% - 220px)',
          paddingTop: '90px', // To clear fixed search bar
          paddingLeft: '20px',
          paddingRight: '20px',
          minHeight: '100vh',
          backgroundColor: darkMode ? '#121212' : 'white',
          color: darkMode ? 'white' : 'black',
          transition: 'background-color 0.3s ease',
          position: 'relative',
          zIndex: 1, // lower than navbar (1100)
        }}
      >
        {/* Removed dark mode toggle here */}

        <Routes>
          <Route
            path="/"
            element={
              <ResultsList
                results={results}
                favourites={favourites}
                onAddFavourite={addFavourite}
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

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          bg={toast.variant}
          onClose={() => setToast({ show: false })}
          delay={2500}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
