interface IWork {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  webUrl: string;
  images: string[];
  color: string;
  logo: string;
}

export interface IWorkAddInput {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  webUrl: string;
  images: File[];
  color: string;
  logo: File;
}

export default IWork;
