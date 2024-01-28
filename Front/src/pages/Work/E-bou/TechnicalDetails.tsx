/* eslint-disable max-len */
import React from 'react';

function TechnicalDetails(): React.ReactElement {
  return (
    <div className='work__long-description content-container'>
    <h2>Détails techniques</h2>
    <p>Le bot est à ce jour développé en Javascript, à l'aide du runtime <a href='https://nodejs.org/' target='_blank'>Node.js</a></p>
    <p>Il utilise la librairie <a href='https://discord.js.org/' target='_blank'>Discord.js</a> pour interagir avec l'API Discord.</p>
    <p>Les données utilisateurs, guildes et permettant le fonctionnalités de diverses fonctionnalités sont stockés dans une base de données <a href='https://www.mongodb.com/' target='_blank'>MongoDB</a>.</p>
    <h3>Processus de mise à jour et données relatives à DOFUS</h3>
    <p>Les données relatives au jeu sont récupérées à l'aide d'un programme de mise à jour personnalisé qui, de lui-même, télécharge automatiquement les nouveaux clients de jeu lorsqu'ils sont déployés par Ankama, puis extrait toutes les données nécessaires.</p>
    <p>Ankama utilise un format propriétaire pour les données statiques, les <strong>D2O</strong> (Dofus 2 Object) et <strong>D2I</strong> (Dofus 2 i18n), ces données sont automatiquement converties en JSON.</p>
    <p>Une fois les données converties en JSON, un second traitement est effectué (nommé <strong>post-processing</strong>) afin de générer des données supplémentaires et de manière à ce que de gros traitements ne soient pas effectués par le Bot Discord lorsqu'elles sont nécessaires.</p>
    <p>Certaines images sont aussi automatiquement générées lors d'une mise à jour, Ankama utilise des données dans le format <strong>SWF</strong>, la librairie <a href='https://github.com/H3r3zy/Jeff' target='_blank'>Jeff</a> est utilisée pour extraire les images de ces fichiers.</p>
    <br />
  </div>
  );
}

export default TechnicalDetails;
