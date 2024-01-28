/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { IGlobalStats, IInteractionStatsByWeekOnLastMonth } from '../../../datas/Models/Discord';
import Discord from '../../../datas/Discord';
import Loader from '../../../components/Loader';
import StatisticsGraph from './StatisticsGraph';

function getDate(date: Date): string {
  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
}

function Statistics(): React.ReactElement {
  const [globalStats, setGlobalStats] = useState<IGlobalStats | null>(null);
  const [interactionStats, setInteractionStats] = useState<IInteractionStatsByWeekOnLastMonth[] | null>(null);

  useEffect(() => {
    Discord.getGlobalStats().then((stats) => {
      setGlobalStats(stats);
    });

    Discord.getLastMonthStats().then((stats) => {
      setInteractionStats(stats);
    });
  }, []);

  if (!globalStats || !interactionStats) {
    return <Loader />;
  }

  return (
    <div className='work__long-description content-container'>
      <h3>Statistiques</h3>
      <p>Le bot est actuellement déployé sur <strong>{globalStats.guildsCount.toLocaleString()}</strong> serveurs Discord distincts, touchant ainsi une audience potentielle de <strong>{globalStats.potentialMembersCount}</strong> utilisateurs.</p>
      <p>Entre le <strong>{getDate(new Date(globalStats.firstCreatedAt))}</strong> et le <strong>{getDate(new Date(globalStats.lastCreatedAt))}</strong> un total de <strong>{globalStats.statsCount.toLocaleString()}</strong> interactions manuelles ont été faites avec le bot.</p>
      {<StatisticsGraph interactionStats={interactionStats} />}
    </div>
  );
}

export default Statistics;
