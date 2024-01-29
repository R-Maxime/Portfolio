import React from 'react';
import { Helmet } from 'react-helmet';
import IWork from '../../datas/Models/Work';
import constant from '../../../constant';

function WorkMeta(work: IWork): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>{work.title} - {constant.PAGE_DEFAULT_NAME}</title>
        <meta name='description' content={work.description} />
        <meta property='og:title' content={`${work.title} - ${constant.PAGE_DEFAULT_NAME}`} />
        <meta property='og:description' content={work.description} />
        <meta property='og:image' content={work.logo as string} />
        <meta property='og:url' content={window.location.href} />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='fr_FR' />
        <meta property='og:site_name' content={constant.PAGE_DEFAULT_NAME} />
      </Helmet>
    </>
  );
}

export default WorkMeta;
