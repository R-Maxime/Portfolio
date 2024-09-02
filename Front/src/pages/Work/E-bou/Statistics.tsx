/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { IGlobalStats, IInteractionStatsByWeekOnLastFiveWeeks } from '../../../datas/Models/Discord';
import Discord from '../../../datas/Discord';
import Loader from '../../../components/Loader';
import StatisticsGraph from './StatisticsGraph';
import i18n from '../../../langs/i18n';

function getDate(date: Date): string {
  const day = (date.getDate()).toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
}

function Statistics(): React.ReactElement {
  const [globalStats, setGlobalStats] = useState<IGlobalStats | null>(null);
  const [interactionStats, setInteractionStats] = useState<IInteractionStatsByWeekOnLastFiveWeeks[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const global = await Discord.getGlobalStats();
      const interactions = await Discord.getLastFiveWeeksStats();
      setGlobalStats(global);
      setInteractionStats(interactions);
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!globalStats || !interactionStats) {
    return <Loader />;
  }

  return (
    <div className='work__long-description content-container'>
      <h3>{i18n.work.Ebou.statistics.fr}</h3>
      <p>L'application est actuellement déployée sur <strong>{globalStats.guildsCount.toLocaleString()}</strong> serveurs Discord distincts, touchant ainsi une audience potentielle de <strong>{globalStats.potentialMembersCount.toLocaleString()}</strong> utilisateurs.</p>
      <p>Entre le <strong>{getDate(new Date(globalStats.firstCreatedAt))}</strong> et le <strong>{getDate(new Date(globalStats.lastCreatedAt))}</strong> un total de <strong>{globalStats.statsCount.toLocaleString()}</strong> interactions manuelles ont été réalisées sur l'application.</p>
      {<StatisticsGraph interactionStats={interactionStats} />}
    </div>
  );
}

export default Statistics;
