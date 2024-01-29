/* eslint-disable max-len */
import React from 'react';
import IWork from '../../../datas/Models/Work';
import WorkCard from '../../../components/Work/WorkCard';
import '../../../styles/Collapse.scss';

import Info from './Info';
import TechnicalDetails from './TechnicalDetails';
import Features from './Features';
import Statistics from './Statistics';
import WorkByIdMeta from '../../../components/Meta/WorkById';

function EbouWorkDisplay({ workData }: { workData: IWork }): React.ReactElement {
  return (
    <div className='work__ebou-container'>
      <WorkByIdMeta {...workData} />
      <WorkCard key={workData.id} admin={false} {...workData} />
      {<Info />}
      {<TechnicalDetails />}
      {<Features />}
      {<Statistics />}
    </div >
  );
}

export default EbouWorkDisplay;
