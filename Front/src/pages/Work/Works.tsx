import React from 'react';
import DisplayWorks from '../../components/Work/DisplayWorks';
import constant from '../../../constant';
import i18n from '../../langs/i18n';

function Works(): React.ReactElement {
  document.title = `${i18n.work.projects.fr} - ${constant.PAGE_DEFAULT_NAME}`;

  return (
    <>
      {DisplayWorks({ admin: false })}
    </>
  );
}

export default Works;
