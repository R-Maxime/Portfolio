export interface ITechnologies {
  name: string;
  url: string;
  icon: string;
}

interface IWork {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  webUrl: string;
  images: string[] | File[];
  color: string;
  logo: string | File;
  technologies: ITechnologies[];
}

export default IWork;
