export interface IGlobalStats {
  statsCount: number;
  guildsCount: number;
  potentialMembersCount: number;
  firstCreatedAt: Date;
  lastCreatedAt: Date;
}

export interface IInteractionStatsByWeekOnLastFiveWeeks {
  count: number;
  startOfWeek: string;
  endOfWeek: string;
  weekNumber: string;
}
