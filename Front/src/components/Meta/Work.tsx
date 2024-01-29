import React from 'react';
import { Helmet } from 'react-helmet';
import constant from '../../../constant';

function WorkMeta(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>Projets - {constant.PAGE_DEFAULT_NAME}</title>
        <meta name='description' content='Les différents projets que j&apos;ai réalisé.' />
        <meta property='og:title' content={`Projets - ${constant.PAGE_DEFAULT_NAME}`} />
        <meta property='og:description' content='Les différents projets que j&apos;ai réalisé.' />
        <meta property='og:url' content={window.location.href} />
      </Helmet>
    </>
  );
}

export default WorkMeta;
