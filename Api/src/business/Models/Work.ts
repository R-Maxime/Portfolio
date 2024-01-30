export default interface IWork {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  repoUrl: string;
  webUrl: string;
  images: string[];
  color: string;
  logo: string;
  technologies: ITechnologies[];
  personal: boolean;
}

interface ITechnologies {
  name: string;
  url: string;
  icon: string;
}
