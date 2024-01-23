import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../datas/Models/Work';
import Work from '../../datas/Work';
import WorkCard from '../../components/Work/WorkCard';
import Loader from '../../components/Loader';

function WorkById(): React.ReactElement {
  const workId = useParams().id;

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
    technologies: []
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    try {
      Work.getWork(Number(workId)).then((work) => {
        setWork(work);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(false);
    }
  }, [workId]);

  if (isLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <div className='home'>
      <WorkCard key={workData.id} admin={false} {...workData} />
    </div>
  );
}

export default WorkById;
