import React from 'react';
import IWork from '../../datas/Models/Work';
import GithubLogo from '/assets/github-mark-white.png';
import Link from '/assets/link.png';
import TechnoCard from './TechnoCard';

import '../../styles/Work/Works.scss';

const DEFAULT_LOGO = 'data:application/octet-stream;base64,';
const WEB_REGEX = /^https?:\/\//;

interface IWorkCardProps extends IWork {
  admin: boolean;
}
function WorkCard({ admin, ...work }: IWorkCardProps): React.ReactElement {
  const pageUrl = admin ? `/admin/work/${work.id}` : `/work/${work.id}`;
  const isSamePage = window.location.pathname === pageUrl;

  return (
    <a className="work-card" style={{ backgroundColor: work.color }} href={!isSamePage ? pageUrl : undefined}>
      {work.repoUrl && WEB_REGEX.test(work.repoUrl) && (
        <a href={work.repoUrl} target="_blank" rel="noopener noreferrer">
          <img className="work-card_github_logo" src={GithubLogo} alt="Lien du repository" />
        </a>
      )}

      {work.webUrl && WEB_REGEX.test(work.webUrl) && (
        <a href={work.webUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="work-card_link_logo"
            src={Link}
            alt="Lien du site"
            style={{ right: work.repoUrl ? '50px' : '10px' }}
          />
        </a>
      )}

      {work.logo && work.logo !== DEFAULT_LOGO && typeof work.logo === 'string' && (
        <img className="work-card__logo" src={work.logo} alt="Logo du projet" />
      )}

      <a className="work-card__title change-page" href={pageUrl}>{work.title}</a>
      <p className="work-card__description">{work.description}</p>

      {work.technologies.length > 0 && (
        <TechnoCard technologies={work.technologies} />
      )}
    </a >
  );
}

export default WorkCard;
