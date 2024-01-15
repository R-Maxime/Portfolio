import { Component } from 'react';
import IWork from '../datas/Models/Work';
import '../styles/Works.scss';
import GithubLogo from '../assets/github-mark-white.png';
import Link from '../assets/link.png';
import TechnoCard from './TechnoCard';

const DEFAULT_LOGO = 'data:application/octet-stream;base64,';
const WEB_REGEX = /^https?:\/\//;

interface IWorkCardProps extends IWork {
  admin: boolean;
}

class WorkCard extends Component<IWorkCardProps> {
  render() {
    const { admin, ...work } = this.props;
    const pageUrl = admin ? `/admin/work/${work.id}` : `/work/${work.id}`;

    return (
      <div className="work-card" style={{ backgroundColor: work.color }}>
        {work.repoUrl && WEB_REGEX.test(work.repoUrl) && (
          <a href={work.repoUrl} target="_blank" rel="noopener noreferrer">
            <img className="work-card_github_logo" src={GithubLogo} alt="Logo" />
          </a>
        )}

        {work.webUrl && WEB_REGEX.test(work.webUrl) && (
          <a href={work.webUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="work-card_link_logo"
              src={Link}
              alt="Logo"
              style={{ right: work.repoUrl ? '50px' : '10px' }}
            />
          </a>
        )}

        {work.logo && work.logo !== DEFAULT_LOGO && typeof work.logo === 'string' && (
          <a href={pageUrl}>
            <img className="work-card__logo" src={work.logo} alt="Logo" />
          </a>
        )}

        <div className="work-card__title">{work.title}</div>
        <p className="work-card__description">{work.description}</p>

        {work.technologies.length > 0 && (
          <TechnoCard technos={work.technologies} />
        )}
      </div>
    );
  }
}

export default WorkCard;
