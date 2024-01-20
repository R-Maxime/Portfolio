import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';

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
      </nav>
    </nav>
  );
}

export default Header;
