import React from 'react';
import '../../styles/Home/Stacks.scss';

import nodejs from '../../../public/assets/nodejs.png';
import typescript from '../../../public/assets/typescript.png';
import discord from '../../../public/assets/discord.png';
import discordjs from '../../../public/assets/discordjs.png';
import mongodb from '../../../public/assets/mongodb.png';
import react from '../../../public/assets/react.png';
import docker from '../../../public/assets/docker.png';
import html5 from '../../../public/assets/html5.png';
import css3 from '../../../public/assets/css3.png';
import vscode from '../../../public/assets/vscode.png';

function MyStacks(): React.ReactElement {
  const stacks = [{
    name: 'NodeJS',
    url: 'https://nodejs.org/',
    icon: nodejs
  }, {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    icon: typescript
  }, {
    name: 'Discord API',
    url: 'https://discord.com/developers/docs/intro',
    icon: discord
  }, {
    name: 'DiscordJS',
    url: 'https://discord.js.org/',
    icon: discordjs
  }, {
    name: 'MongoDB',
    url: 'https://www.mongodb.com/',
    icon: mongodb
  }, {
    name: 'ReactJS',
    url: 'https://reactjs.org/',
    icon: react
  }, {
    name: 'Docker',
    url: 'https://www.docker.com/',
    icon: docker
  }, {
    name: 'HTML',
    url: 'https://developer.mozilla.org/fr/docs/Web/HTML',
    icon: html5
  }, {
    name: 'CSS',
    url: 'https://developer.mozilla.org/fr/docs/Web/CSS',
    icon: css3
  }, {
    name: 'VSCode',
    url: 'https://code.visualstudio.com/',
    icon: vscode
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
