import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../datas/Models/Work';
import Work from '../../datas/Work';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import ClassicalWorkDisplay from './ClassicalWorkDisplay';
import EbouWorkDisplay from './EbouWorkDisplay';

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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    try {
      Work.getWork(Number(workId)).then((work) => {
        if (!work.title) {
          setIsError(true);
          return;
        }

        setWork(work);
      });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoaded(true);
    }
  }, [workId]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  if (!workData.id) {
    return <></>;
  }

  if (workData.title === 'E-bou') {
    return <EbouWorkDisplay workData={workData} />;
  }

  return <ClassicalWorkDisplay workData={workData} />;
}

export default WorkById;
