import React from 'react';
import '../../styles/Home/Stacks.scss';

import nodejs from '/assets/nodejs.png';
import typescript from '/assets/typescript.png';
import discord from '/assets/discord.png';
import discordjs from '/assets/discordjs.png';
import mongodb from '/assets/mongodb.png';
import react from '/assets/react.png';
import docker from '/assets/docker.png';
import html5 from '/assets/html5.png';
import css3 from '/assets/css3.png';
import vscode from '/assets/vscode.png';
import i18n from '../../langs/i18n';

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
      <h1 className='stacks-text'>{i18n.home.stacks.fr}</h1>
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
