import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../datas/Models/Work';
import Work from '../../datas/Work';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import ClassicalWorkDisplay from './ClassicalWorkDisplay';
import EbouWorkDisplay from './E-bou/EbouWorkDisplay';
import useAnalyticsEventTracker from '../../AnalyticsEventTracker';

function WorkById(): React.ReactElement {
  const gaEvent = useAnalyticsEventTracker('WorkById');
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
    technologies: [],
    personal: false
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoaded(false);

    try {
      Work.getWork(workId).then((work) => {
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
    gaEvent('View E-bou', workData.title);
    return <EbouWorkDisplay workData={workData} />;
  }

  gaEvent('View', workData.title);
  return <ClassicalWorkDisplay workData={workData} />;
}

export default WorkById;
