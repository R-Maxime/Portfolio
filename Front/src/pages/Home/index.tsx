import React from 'react';
import { NavLink } from 'react-router-dom';

function Index(): React.ReactElement {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' }
  ];

  return (
    <div>
      <ul>
        {pages.map((page) => (
          <li key={page.path}>
            <NavLink to={page.path}>{page.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
