import React from 'react';
import '../../styles/Home/Stacks.scss';

function MyStacks(): React.ReactElement {
  const stacks = [{
    name: 'NodeJS',
    url: 'https://nodejs.org/',
    icon: '../assets/nodejs.png'
  }, {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    icon: '../assets/typescript.png'
  }, {
    name: 'Discord API',
    url: 'https://discord.com/developers/docs/intro',
    icon: '../assets/discord.png'
  }, {
    name: 'DiscordJS',
    url: 'https://discord.js.org/',
    icon: '../assets/discordjs.png'
  }, {
    name: 'MongoDB',
    url: 'https://www.mongodb.com/',
    icon: '../assets/mongodb.png'
  }, {
    name: 'ReactJS',
    url: 'https://reactjs.org/',
    icon: '../assets/react.png'
  }, {
    name: 'Docker',
    url: 'https://www.docker.com/',
    icon: '../assets/docker.png'
  }, {
    name: 'HTML',
    url: 'https://developer.mozilla.org/fr/docs/Web/HTML',
    icon: '../assets/html5.png'
  }, {
    name: 'CSS',
    url: 'https://developer.mozilla.org/fr/docs/Web/CSS',
    icon: '../assets/css3.png'
  }, {
    name: 'VSCode',
    url: 'https://code.visualstudio.com/',
    icon: '../assets/vscode.png'
  }];

  return (
    <div className="stacks-container">
      <h1 className='stacks-text'>Mes stacks</h1>
      <div className='stacks-grid'>
        {stacks.map((stack, index) => (
          <div key={index} className='stacks-grid-item'>
            <a href={stack.url} target='_blank' rel='noreferrer'>
              <img src={stack.icon} alt={stack.name} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyStacks;
