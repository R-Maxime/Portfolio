import React from 'react';
import '../styles/ImageCard.scss';

function ImageCard(props: {
  image: string, backgroundColor: string, link?: string, text?: string
}): React.ReactElement {
  const {
    image, backgroundColor, link
  } = props;

  if (link) {
    return (
      <a className="image-card" style={{ backgroundColor: backgroundColor }} href={link}>
        <img className="image-card__image" src={image} alt="Logo" />
        {props.text && <div className="image-card__text">{props.text}</div>}
      </a>
    );
  }

  return (
    <div className="image-card" style={{ backgroundColor: backgroundColor }}>
      <img className="image-card__image" src={image} alt="Logo" />
    </div>
  );
}

export default ImageCard;
