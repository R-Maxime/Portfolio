import React from 'react';
import DisplayWorks from '../../components/Work/DisplayWorks';

function Works(): React.ReactElement {
  return (
    <>
      {DisplayWorks({ admin: false })}
    </>
  );
}

export default Works;
