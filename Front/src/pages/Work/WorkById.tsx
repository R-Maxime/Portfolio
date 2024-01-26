import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IWork from '../../datas/Models/Work';
import Work from '../../datas/Work';
import WorkCard from '../../components/Work/WorkCard';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Gallery from '../../components/Gallery';

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
    setIsLoaded(true);
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
      setIsLoaded(false);
    }
  }, [workId]);

  if (isLoaded) {
    return (
      <Loader />
    );
  }

  if (isError) {
    return (
      <Error />
    );
  }

  return (
    <div className='work__by-id-container'>
      <WorkCard key={workData.id} admin={false} {...workData} />
      {workData.longDescription && (
        <div className='work__long-description content-container'>
          {workData.longDescription.split('\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}<br /></p>
          ))}
        </div>
      )}
      {workData.images.length > 0 && (
        <Gallery images={workData.images as string[]} />
      )}
    </div>
  );
}

export default WorkById;
