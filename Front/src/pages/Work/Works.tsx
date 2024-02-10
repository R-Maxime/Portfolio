import React from 'react';
import DisplayWorks from '../../components/Work/DisplayWorks';
import WorkMeta from '../../components/Meta/Work';
import useAnalyticsEventTracker from '../../AnalyticsEventTracker';

function Works(): React.ReactElement {
  useAnalyticsEventTracker('Works')('View', 'Works');
  return (
    <>
      <WorkMeta />
      {DisplayWorks({ admin: false })}
    </>
  );
}

export default Works;
