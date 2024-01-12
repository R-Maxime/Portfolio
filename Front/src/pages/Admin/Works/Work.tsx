import { Component } from 'react';
import PageTextHeader from '../../../components/PageTextHeader';
import DisplayWorks from '../../../components/DisplayWorks';
import WorkModal from '../../../components/WorkModal';
import Auth from '../../../datas/Auth';
import '../../../styles/Admin.scss';
import '../../../styles/global.scss';
import i18n from '../../../langs/i18n';

class AdminWorks extends Component {
  render() {
    return (
      <div className='pad-16'>
        <PageTextHeader text='Projets' />
        <button style={{ marginTop: '10px' }} onClick={() => { window.location.href = '/admin'; }}>
          {i18n.admin.backToAdmin.fr}
        </button>
        <DisplayWorks admin={Auth.isAuthenticated()} />
        <WorkModal />
      </div>
    );
  }
}

export default AdminWorks;
