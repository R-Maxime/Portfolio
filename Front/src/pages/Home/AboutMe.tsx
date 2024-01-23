/* eslint-disable max-len */
import React from 'react';
import Utils from '../../datas/utils';
import i18n from '../../langs/i18n';
import '../../styles/Home/About.scss';

function AboutMe(): React.ReactElement {
  return (
    <div className='about-container'>
      <h1 className='about-title'>
        {i18n.home.about.fr}
      </h1>
      <p>
        Je m'appelle Maxime, J'ai <span style={{ fontWeight: 'bold' }}>{Utils.getAge()}</span> ans, je suis un développeur Full Stack JS/TS basé en France.
      </p>
      <br />
      <p>
        Ma spécialité se situe principalement dans le domaine du Back-End, où je me concentre sur la création de programmes sans interface graphique tels que des interfaces en ligne de commande (CLI) ou des bots Discord. Cependant, mes compétences ne se limitent pas là, car je suis également capable de concevoir des sites web.
      </p>
    </div>
  );
}

export default AboutMe;
