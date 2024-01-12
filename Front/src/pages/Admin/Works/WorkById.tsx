import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../../datas/Models/Work';
import Work from '../../../datas/Work';
import WorkModal from '../../../components/WorkModal';
import PageTextHeader from '../../../components/PageTextHeader';
import '../../../styles/Admin.scss';
import i18n from '../../../langs/i18n';

function WorkById(): React.ReactElement {
  const id = useParams().id;

  const [workData, setWork] = useState<IWork>({
    id: '',
    title: '',
    description: '',
    repoUrl: '',
    webUrl: '',
    images: [],
    color: '',
    logo: ''
  });

  useEffect(() => {
    Work.getWork(Number(id)).then((work) => {
      setWork(work);
    });
  }, [id]);

  return (
    <div className='pad-16'>
      <PageTextHeader text='Modification de projet' />
      <button style={{ marginTop: '10px' }} onClick={() => { window.location.href = '/admin/works'; }}>
        {i18n.admin.backToProjects.fr}
      </button>
      <WorkModal preFilledData={workData} />
    </div >
  );
}

export default WorkById;
