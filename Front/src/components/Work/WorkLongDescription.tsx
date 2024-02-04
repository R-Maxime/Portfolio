import React from 'react';

function WorkLongDescription({ longDescription }: { longDescription: string }): React.ReactElement {
  if (!longDescription) {
    return <></>;
  }

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const paragraphs = longDescription.split('\\n').map((paragraph, index) => {
    let lastIndex = 0;
    const elements = [];

    paragraph.replace(linkRegex, (match, text, link, offset) => {
      elements.push(<span key={lastIndex}>{paragraph.substring(lastIndex, offset)}</span>);

      elements.push(<a key={offset} href={link} target='__blank' style={{ textDecoration: 'underline' }}>{text}</a>);

      lastIndex = offset + match.length;

      return match;
    });

    elements.push(<span key={lastIndex}>{paragraph.substring(lastIndex)}</span>);

    return <p key={index}>{elements}<br /></p>;
  });

  return (
    <div className='work__long-description content-container'>
      {paragraphs}
    </div>
  );
}

export default WorkLongDescription;
