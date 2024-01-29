import React from 'react';
import DisplayWorks from '../../components/Work/DisplayWorks';
import WorkMeta from '../../components/Meta/Work';

function Works(): React.ReactElement {
  return (
    <>
      <WorkMeta />
      {DisplayWorks({ admin: false })}
    </>
  );
}

export default Works;
