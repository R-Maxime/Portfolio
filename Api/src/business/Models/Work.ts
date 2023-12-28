export default interface IWork {
  id: string;
  title: string;
  description: string;
  repoUrl?: string;
  webUrl?: string;
  images?: [string];
}
