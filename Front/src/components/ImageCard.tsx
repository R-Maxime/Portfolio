import React from 'react';
import '../styles/ImageCard.scss';

function ImageCard(props: {
  image: string, backgroundColor: string, link?: string
}): React.ReactElement {
  const {
    image, backgroundColor, link
  } = props;

  if (link) {
    return (
      <a className="image-card" style={{ backgroundColor: backgroundColor }} href={link}>
        <img className="image-card__image" src={image} alt="Logo" />
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
