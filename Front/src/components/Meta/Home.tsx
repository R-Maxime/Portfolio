import React from 'react';
import { Helmet } from 'react-helmet';
import constant from '../../../constant';

function HomeMeta(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>Accueil - {constant.PAGE_DEFAULT_NAME}</title>
        <meta name='description' content='Accueil du portfolio de Maxime R.' />
        <meta property='og:title' content={`Accueil - ${constant.PAGE_DEFAULT_NAME}`} />
        <meta property='og:description' content='Accueil du portfolio de Maxime R.' />
      </Helmet>
    </>
  );
}

export default HomeMeta;
