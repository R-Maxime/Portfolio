export interface IGlobalStats {
  statsCount: number;
  guildsCount: number;
  potentialMembersCount: number;
  firstCreatedAt: Date;
  lastCreatedAt: Date;
}

export interface IInteractionStatsByWeekOnLastMonth {
  count: number;
  startOfWeek: string;
  endOfWeek: string;
  week: string;
}
