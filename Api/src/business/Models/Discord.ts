interface IGlobalStats {
  statsCount: number;
  guildsCount: number;
  potentialMembersCount: number;
  firstCreatedAt: Date;
  lastCreatedAt: Date;
}

interface IInteractionStatsByWeekOnLastFiveWeeks {
  count: number;
  startOfWeek: string;
  endOfWeek: string;
  weekNumber: string;
}

export {
  IGlobalStats,
  IInteractionStatsByWeekOnLastFiveWeeks,
};
