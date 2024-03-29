import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../../datas/Models/Work';
import Work from '../../../datas/Work';
import WorkModal from '../../../components/Work/WorkModal';
import PageTextHeader from '../../../components/PageTextHeader';
import '../../../styles/Admin.scss';
import i18n from '../../../langs/i18n';
import Gallery from '../../../components/Gallery';
import constant from '../../../../constant';

function AdminWorkById(): React.ReactElement {
  const id = useParams().id;

  const [workData, setWork] = useState<IWork>({
    id: '',
    title: '',
    description: '',
    longDescription: '',
    repoUrl: '',
    webUrl: '',
    images: [],
    color: '',
    logo: '',
    technologies: [],
    personal: false
  });

  useEffect(() => {
    Work.getWork(id).then((work) => {
      setWork(work);
    });
  }, [id]);

  useEffect(() => {
    if (workData.title) {
      document.title = `${workData.title} - Admin - ${constant.PAGE_DEFAULT_NAME}`;
    }
  }, [workData.title]);

  return (
    <>
      <PageTextHeader text='Modification de projet' />
      <button style={{ marginTop: '10px' }} onClick={() => { window.location.href = '/admin/works'; }}>
        {i18n.admin.backToProjects.fr}
      </button>

      {workData.images.length > 0 && (
        <Gallery images={workData.images as string[]} />
      )}
      <WorkModal preFilledData={workData} />
    </>
  );
}

export default AdminWorkById;
