/* eslint-disable max-len */
import React from 'react';

function Info(): React.ReactElement {
  return (
    <div className='work__long-description content-container'>
      <h1>E-bou est un bot Discord relatif au <a href='https://www.dofus.com/fr/prehome' target='_blank' style={{ fontSize: 'unset' }}><strong>MMORPG DOFUS</strong></a>.</h1>
      <p>Sa principale fonction est de fournir des informations en lien avec le jeu à ses utilisateurs.</p>
      <p>Ce projet a été initié en avril 2023 et, est, à ce jour, maintenu quotidiennement.</p>
      <p>Il s'agit de l'encyclopédie DOFUS la plus complète sur Discord permettant d'accéder à la quasi-totalité des informations disponibles en jeu.</p>
      <p>Le bot est disponible entièrement en français ainsi qu'en anglais, et partiellement en espagnol, Portugais, Allemand et Italien.</p>
    </div>
  );
}

export default Info;
