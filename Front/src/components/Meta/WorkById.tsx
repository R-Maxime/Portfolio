import React from 'react';
import { Helmet } from 'react-helmet';
import IWork from '../../datas/Models/Work';
import constant from '../../../constant';

function WorkByIdMeta(work: IWork): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>{work.title} - {constant.PAGE_DEFAULT_NAME}</title>
        <meta name='description' content={work.description} />
        <meta property='og:title' content={`${work.title} - ${constant.PAGE_DEFAULT_NAME}`} />
        <meta property='og:description' content={work.description} />
        <meta property='og:image' content={work.logo as string} />
        <meta property='og:url' content={window.location.href} />
      </Helmet>
    </>
  );
}

export default WorkByIdMeta;
