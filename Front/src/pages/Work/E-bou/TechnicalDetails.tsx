import React from 'react';
import i18n from '../../../langs/i18n';

function TechnicalDetails(): React.ReactElement {
  return (
    <div className='work__long-description content-container'>
      <h2>{i18n.work.Ebou.technicalDetails.fr}</h2>
      <p>L'application est, à ce jour, développée en TypeScript, à l'aide du runtime <a href='https://bun.sh/' target='_blank'>Bun</a></p>
      <p>Elle utilise la librairie <a href='https://discord.js.org/' target='_blank'>Discord.js</a> pour interagir avec l'API Discord.</p>
      <p>Les donnés utilisateurs, guildes, ainsi que les informations nécessaires au bon fonctionnement de diverses fonctionnalités sont stockés dans une base de données <a href='https://www.mongodb.com/' target='_blank'>MongoDB</a> propulsée par <a href='https://mongoosejs.com/' target='_blank'>Mongoose</a>.</p>
    </div>
  );
}

export default TechnicalDetails;
