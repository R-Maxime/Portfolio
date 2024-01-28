import React, { useEffect } from 'react';
import IWork from '../../datas/Models/Work';
import Work from '../../datas/Work';
import WorkCard from './WorkCard';
import i18n from '../../langs/i18n';
import Loader from '../Loader';
import '../../styles/Work/Works.scss';

interface DisplayWorksProps {
  admin: boolean;
}

function DisplayWorks({ admin }: DisplayWorksProps): React.ReactElement {
  const [works, setWorks] = React.useState<IWork[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    Work.getWorks().then((data) => {
      setWorks(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && (
        <Loader />
      )}

      {!loading && !works.length && (
        <div>{i18n.work.noProjects.fr}</div>
      )}

      {works.length > 0 && (
        <div className='works-container'>
          {works.map((work) => (
            <WorkCard key={work.id} admin={admin} {...work} />
          ))}
        </div>
      )}
    </>
  );
}

export default DisplayWorks;
