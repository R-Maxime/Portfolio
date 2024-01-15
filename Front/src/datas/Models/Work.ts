interface IWork {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  webUrl: string;
  images: string[] | File[];
  color: string;
  logo: string | File;
  technologies: string[];
}

export default IWork;
