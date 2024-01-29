import React from 'react';
import Gallery from '../../components/Gallery';
import WorkCard from '../../components/Work/WorkCard';
import IWork from '../../datas/Models/Work';
import WorkByIdMeta from '../../components/Meta/WorkById';

function ClassicalWorkDisplay({ workData }: { workData: IWork }): React.ReactElement {
  return (
    <div className='work__by-id-container'>
      <WorkByIdMeta {...workData} />
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

export default ClassicalWorkDisplay;
