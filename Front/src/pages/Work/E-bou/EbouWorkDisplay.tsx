/* eslint-disable max-len */
import React from 'react';
import IWork from '../../../datas/Models/Work';
import WorkCard from '../../../components/Work/WorkCard';
import '../../../styles/Collapse.scss';

import Info from './Info';
import TechnicalDetails from './TechnicalDetails';
import Fonctionnality from './Fonctionnality';
import Statistics from './Statistics';

function EbouWorkDisplay({ workData }: { workData: IWork }): React.ReactElement {
  return (
    <div className='work__ebou-container'>
      <WorkCard key={workData.id} admin={false} {...workData} />
      {<Info />}
      {<TechnicalDetails />}
      {<Fonctionnality />}
      {<Statistics />}
    </div >
  );
}

export default EbouWorkDisplay;
