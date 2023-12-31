interface IGlobalStats {
  statsCount: number;
  guildsCount: number;
  potentialMembersCount: number;
  firstCreatedAt: Date;
  lastCreatedAt: Date;
}

interface IInteractionStatsByWeekOnLastMonth {
  count: number;
  startOfWeek: string;
  endOfWeek: string;
  week: string;
}

export {
  IGlobalStats,
  IInteractionStatsByWeekOnLastMonth,
};
