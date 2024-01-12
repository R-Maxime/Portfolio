import React from 'react';
import '../../styles/Admin.scss';
import '../../styles/global.scss';
import PageTextHeader from '../../components/PageTextHeader';

function Admin(): React.ReactElement {
  const adminPages = [
    { name: 'Works', path: '/admin/works' }
  ];

  return (
    <div className='pad-16'>
      <PageTextHeader text='Admin' />
      <div className='admin-pages pad-16'>
        <ul>
          {adminPages.map((page, index) => (
            <li key={index} className='ul_butt'>
              <a href={page.path}>{page.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
