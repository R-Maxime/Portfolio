import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';
import Auth from '../datas/Auth';

function Header(): React.ReactElement {
  return (
    <nav className="header">
      <div className="header_name">
        <NavLink
          to={'/'}
        >
          <h1>Faareoh</h1>
        </NavLink>
      </div>
      <nav className="header_nav">
        <NavLink
          to={'/'}
        >
          Accueil
        </NavLink>
        <NavLink
          to={'/works'}
        >
          Projets
        </NavLink>
        {Auth.isAuthenticated() && (
          <NavLink
            to={'/admin'}
          >
            Admin
          </NavLink>
        )}
      </nav>
    </nav>
  );
}

export default Header;
