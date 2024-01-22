import React from 'react';

function SpanBoldText(props: { text: string }): React.ReactElement {
  return (
    <span style={{ fontWeight: 'bold' }}>{props.text}</span>
  );
}

export default SpanBoldText;
