import React from 'react';
import IWork from '../../datas/Models/Work';
import GithubLogo from '/assets/github-mark-white.png';
import Link from '/assets/link.png';
import TechnoCard from './TechnoCard';

import '../../styles/Works.scss';

const DEFAULT_LOGO = 'data:application/octet-stream;base64,';
const WEB_REGEX = /^https?:\/\//;

interface IWorkCardProps extends IWork {
  admin: boolean;
}

function AddWorkLogo(pageUrl: string, logoUrl: string, isSamePage: boolean): React.ReactElement {
  const Logo = () => (
    <img className="work-card__logo" src={logoUrl} alt="Logo du projet" />
  );

  if (!isSamePage) {
    return (
      <a href={pageUrl}>
        {Logo()}
      </a>
    );
  }

  return (
    Logo()
  );
}

function addTitle(title: string, pageUrl: string, isSamePage: boolean): React.ReactElement {
  if (!isSamePage) {
    return (
      <a className="work-card__title change-page" href={pageUrl}>{title}</a>
    );
  }

  return (
    <div className="work-card__title">{title}</div>
  );
}

function WorkCard({ admin, ...work }: IWorkCardProps): React.ReactElement {
  const pageUrl = admin ? `/admin/work/${work.id}` : `/work/${work.id}`;
  const isSamePage = window.location.pathname === pageUrl;

  return (
    <div className="work-card" style={{ backgroundColor: work.color }}>
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
        AddWorkLogo(pageUrl, work.logo, isSamePage)
      )}

      {addTitle(work.title, pageUrl, isSamePage)}
      <p className="work-card__description">{work.description}</p>

      {work.technologies.length > 0 && (
        <TechnoCard technologies={work.technologies} />
      )}
    </div>
  );
}

export default WorkCard;
