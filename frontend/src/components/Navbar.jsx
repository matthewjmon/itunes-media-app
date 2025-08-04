import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ darkMode }) {
  return (
    <nav
      className={`d-flex flex-column ${darkMode ? 'bg-dark text-white' : 'bg-dark text-white'}`}
      style={{
        width: '220px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1100, // Highest so navbar always on top
        overflowY: 'auto',
      }}
    >
      <div className="p-3 border-bottom">
        <h2 className="mb-0">iTunes Explorer</h2>
      </div>
      <ul className="nav nav-pills flex-column mt-4 px-2 gap-2">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link text-white'
            }
            end
          >
            Search
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link text-white'
            }
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
