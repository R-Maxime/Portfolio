import { Component } from 'react';
import '../../../styles/Admin.scss';
import '../../../styles/global.scss';
import PageTextHeader from '../../../components/PageTextHeader';
import DisplayWorks from '../../../components/DisplayWorks';
import AddWorks from './AddWorks';
import Auth from '../../../datas/Auth';

class AdminWorks extends Component {
  render() {
    return (
      <div className='pad-16'>
        <PageTextHeader text='Projets' />
        <DisplayWorks admin={Auth.isAuthenticated()} />
        <AddWorks />
      </div>
    );
  }
}

export default AdminWorks;
