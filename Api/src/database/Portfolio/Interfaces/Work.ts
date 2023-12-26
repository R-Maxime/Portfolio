export default interface IWork {
  title: string;
  description: string;
  repoUrl?: string;
  webUrl?: string;
  images?: string[];
  createdAt: Date;
}
