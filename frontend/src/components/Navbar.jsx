import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ darkMode }) {
  return (
    <>
      {/* Desktop sidebar navigation - visible on large screens */}
      <nav
        className={`d-none d-lg-flex flex-column ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}
        style={{
          width: '220px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1100,
          overflowY: 'auto',
        }}
      >
        <div className="p-3">
          <h2 className="mb-2">MediaQuest</h2>
        </div>
        <ul className="nav nav-pills flex-column mt-4 px-2 gap-2">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link active' : darkMode ? 'nav-link text-white' : 'nav-link text-dark'
              }
            >
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : darkMode ? 'nav-link text-white' : 'nav-link text-dark'
              }
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Mobile navbar - visible on smaller screens */}
      <nav
        className={`navbar navbar-expand-lg d-lg-none ${
          darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
        } fixed-top`}
      >
        <div className="container-fluid">
          <span className="navbar-brand">MediaQuest</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNavbar"
            aria-controls="mobileNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobileNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''} ${darkMode ? 'text-white' : 'text-dark'}`
                  }
                >
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favourites"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''} ${darkMode ? 'text-white' : 'text-dark'}`
                  }
                >
                  Favourites
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

