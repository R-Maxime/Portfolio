import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Error.scss';

function Error(): React.ReactElement {
  return (
    <div className="error_container">
      <h1>404</h1>
      <p>La page que vous cherchez n'existe pas</p>
      <NavLink to="/">Retour à l'accueil</NavLink>
    </div>
  );
}

export default Error;
