import React from 'react';
import Link from '/assets/link.webp';
import '../styles/Home/index.scss';

function AddImage(props: { image?: string }): React.ReactElement {
  const { image } = props;

  if (image) {
    return (
      <img className="main-card__image" src={image} alt="Logo" />
    );
  }

  return <div></div>;
}

function AddLink(props: {
  link: string, external: boolean, linkText?: string
}): React.ReactElement {
  const ifExternal = props.external ? '_blank' : '_self';

  if (props.linkText) {
    return (
      <a href={props.link} target={ifExternal} className='main-card__link_text'>
        <div>{props.linkText}</div>
      </a >
    );
  }

  return (
    <a href={props.link} target={ifExternal} rel="noopener noreferrer">
      <img
        className="main-card__link_logo"
        src={Link}
        alt="Logo"
      />
    </a>
  );
}

function MainCard(props: {
  title: string, color: string, link: string, external: boolean,
  description?: string, image?: string, linkText?: string
}): React.ReactElement {
  const {
    title, description, image, link, external, color, linkText
  } = props;

  return (
    <div className="main-card" style={{ backgroundColor: color }}>
      <div className='main-card__container'>
        <div className='main-card__middle'>
          <AddImage image={image} />
          <AddLink link={link} linkText={linkText} external={external} />
        </div>

        <div className='main-card__bottom' >
          <div className="main-card__title">{title}</div>
          {description && <p className="main-card__description">{description}</p>}

        </div>
      </div>
    </div >
  );
}

export default MainCard;
