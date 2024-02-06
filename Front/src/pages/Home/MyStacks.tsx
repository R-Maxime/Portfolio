import React from 'react';
import '../../styles/Home/Stacks.scss';

import nodejs from '/assets/nodejs.webp';
import typescript from '/assets/typescript.webp';
import discord from '/assets/discord.webp';
import discordjs from '/assets/discordjs.webp';
import mongodb from '/assets/mongodb.webp';
import react from '/assets/react.webp';
import docker from '/assets/docker.webp';
import html5 from '/assets/html5.webp';
import css3 from '/assets/css3.webp';
import express from '/assets/express.webp';
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
    name: 'ExpressJS',
    url: 'https://expressjs.com/',
    icon: express
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
