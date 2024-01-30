import React from 'react';

function PageTextHeader(props: { text: string }): React.ReactElement {
  return (
    <div className='page-text-header'>
      <h1>{props.text}</h1>
    </div>
  );
}

export default PageTextHeader;
