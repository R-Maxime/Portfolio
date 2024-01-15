import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../../datas/Auth';
import DisplayWorks from '../../components/DisplayWorks';

class Index extends Component {
  render() {
    const pages = [
      { name: 'Home', path: '/' },
      { name: 'Login', path: '/login' }
    ];

    if (Auth.isAuthenticated()) {
      pages.push({ name: 'Admin', path: '/admin' });
      pages.push({ name: 'Works', path: '/admin/works' });
    }

    return (
      <div>
        <ul>
          {pages.map((page) => (
            <li key={page.path}>
              <NavLink to={page.path}>{page.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className='home_works'>
          <DisplayWorks admin={Auth.isAuthenticated()} />
        </div>
      </div>
    );
  }
}

export default Index;
