import ImageGallery from 'react-image-gallery';
import React from 'react';

import '../styles/Gallery.scss';

function Gallery({ images }: { images: string[] }): React.ReactElement {
  return (
    <ImageGallery items={images.map((image) => ({
      original: image,
      thumbnail: image
    }))} />
  );
}

export default Gallery;
