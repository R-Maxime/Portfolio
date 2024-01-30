export interface ITechnologies {
  name: string;
  url: string;
  icon: string;
}

interface IWork {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  repoUrl: string;
  webUrl: string;
  images: string[] | File[];
  color: string;
  logo: string | File;
  technologies: ITechnologies[];
  personal: boolean;
}

export default IWork;
