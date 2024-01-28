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
        Ma spécialité se situe principalement dans le domaine du Back-End, où je me concentre sur la création de programmes sans interface graphique tels que des API, des applications en lignes de commandes ou bien des bots Discord.
      </p>
      <br />
      <p>
        Bien que mon cœur de métier soit le Back-End, je suis également compétent dans la conception de sites web. Cela me permet d'avoir une vision globale du développement, allant de la création de fonctionnalités complexes en Back-End à la mise en place d'expériences utilisateur fluides en Front-End.
      </p>
    </div>
  );
}

export default AboutMe;
