import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Bootstrap CSS and JS bundle for styling and interactive components
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import React Router for client-side routing
import { BrowserRouter as Router } from 'react-router-dom';

// Import global styles
import './styles/global.css';

// Render the root React component into the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App with Router to enable routing */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
