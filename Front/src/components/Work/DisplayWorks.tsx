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

  if (loading) {
    return <Loader />;
  }

  if (!loading && !works.length) {
    return <div>{i18n.work.noProjects.fr}</div>;
  }

  const personalWorks = works.filter((work) => work.personal);
  const professionalWorks = works.filter((work) => !work.personal);

  return (
    <>
      {works.length > 0 && (
        <div className='works__container'>
          {personalWorks.length > 0 && (
            <>
              <h2 className='works__container-title'>Projets personnels</h2>
              <div className='works__personals-cards'>
                {personalWorks.map((work) => (
                  <WorkCard key={work.id} admin={admin} {...work} />
                ))}
              </div>
            </>
          )}
          {professionalWorks.length > 0 && (
            <>
              <h2 className='works__container-title'>Projets professionnels</h2>
              <div className='works__professionals-cards'>
                {professionalWorks.map((work) => (
                  <WorkCard key={work.id} admin={admin} {...work} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default DisplayWorks;
