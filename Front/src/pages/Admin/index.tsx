import React from 'react';
import '../../styles/Admin.scss';
import '../../styles/global.scss';
import PageTextHeader from '../../components/PageTextHeader';

function Admin(): React.ReactElement {
  const adminPages = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/admin/works' }
  ];

  return (
    <div className='pad-16'>
      <PageTextHeader text='Admin' />
      <div className='admin-pages pad-16'>
        <ul>
          {adminPages.map((page, index) => (
            <button onClick={() => { window.location.href = page.path; }}>
              <li key={index}>{page.name}</li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
