import React from 'react';
import DisplayWorks from '../../components/Work/DisplayWorks';
import constant from '../../../constant';

function Works(): React.ReactElement {
  document.title = `Projets - ${constant.PAGE_DEFAULT_NAME}`;

  return (
    <>
      {DisplayWorks({ admin: false })}
    </>
  );
}

export default Works;
