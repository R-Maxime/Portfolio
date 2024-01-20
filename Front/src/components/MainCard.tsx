import React from 'react';
import '../styles/MainCard.scss';
import Link from '../../assets/link.png';

function AddImage(props: { image?: string }): React.ReactElement {
  const { image } = props;

  if (image) {
    return (
      <img className="main-card__image" src={image} alt="Logo" />
    );
  }

  return <div></div>;
}

function AddLink(props: { link?: string, linkText?: string }): React.ReactElement {
  if (props.link && props.linkText) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer" className='main-card__link_text'>
        <div>{props.linkText}</div>
      </a>
    );
  }

  if (props.link) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img
          className="main-card__link_logo"
          src={Link}
          alt="Logo"
        />
      </a>
    );
  }

  return <></>;
}

function MainCard(props: {
  title: string, description: string, color: string, link: string,
  image?: string, linkText?: string
}): React.ReactElement {
  const {
    title, description, image, link, color, linkText
  } = props;

  return (
    <a className="main-card" style={{ backgroundColor: color }} href={link}>
      <div className='main-card__container'>
        <div className='main-card__middle'>
          <AddImage image={image} />
          <AddLink link={link} linkText={linkText} />
        </div>

        <div className='main-card__bottom' >
          <div className="main-card__title">{title}</div>
          <p className="main-card__description">{description}</p>
        </div>
      </div>
    </a >
  );
}

export default MainCard;
