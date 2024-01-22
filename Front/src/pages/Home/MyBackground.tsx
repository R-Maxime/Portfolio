import React from 'react';
import i18n from '../../langs/i18n';
import SpanBoldText from '../../components/SpanBoldText';
import '../../styles/Home/Background.scss';

function MyBackground(): React.ReactElement {
  return (
    <div className='background-container'>
      <h1 className='background-title'>
        {i18n.home.background.fr}
      </h1>
      <ul className='background-contents'>
        <li>
          <SpanBoldText text="07-2023" /> / <SpanBoldText text="02-2024" /> - Formation de développeur web avec <a style={{ textDecoration: 'underline' }} href='https://openclassrooms.com/fr/paths/899-developpeur-web'><SpanBoldText text='OpenClassrooms' /></a>
        </li>
        <li>
          <SpanBoldText text='2018' /> / <SpanBoldText text='2022' /> - Employés de libre-service en grande surface
        </li>
        <li>
          <SpanBoldText text='2014' /> / <SpanBoldText text='2017' /> - Baccalauréat Professionnel - Systèmes Électroniques et Numériques (SEN) - Lycée Sacré Coeur Béziers
        </li>
      </ul>
    </div>
  );
}

export default MyBackground;
