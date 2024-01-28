import React from 'react';
import PageTextHeader from '../../../components/PageTextHeader';
import DisplayWorks from '../../../components/Work/DisplayWorks';
import WorkModal from '../../../components/Work/WorkModal';
import Auth from '../../../datas/Auth';
import '../../../styles/Admin.scss';
import '../../../styles/global.scss';
import i18n from '../../../langs/i18n';
import constant from '../../../../constant';

function AdminWorks(): React.ReactElement {
  document.title = `Admin - Projets - ${constant.PAGE_DEFAULT_NAME}`;

  return (
    <>
      <PageTextHeader text='Projets' />
      <button style={{ marginTop: '10px' }} onClick={() => { window.location.href = '/admin'; }}>
        {i18n.admin.backToAdmin.fr}
      </button>
      <div style={{
        padding: '16px'
      }}>
        <DisplayWorks admin={Auth.isAuthenticated()} />
      </div>
      <WorkModal />
    </>
  );
}
export default AdminWorks;
