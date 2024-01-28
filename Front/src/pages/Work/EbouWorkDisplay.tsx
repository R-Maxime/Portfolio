/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import IWork from '../../datas/Models/Work';
import WorkCard from '../../components/Work/WorkCard';
import Collapsible from 'react-collapsible';
import '../../styles/Collapse.scss';

import Item from '/item.jpg';
import Monster from '/monster.jpg';

const EbouFeatures: { title: string, description: string, image?: string }[] = [
  {
    title: 'Item',
    description: 'Retourne des informations sur un item ou une liste d\'items. Ses effets, ses caractéristiques, ses moyens d\'obtention, ses recettes, etc.',
    image: Item
  },
  {
    title: 'Monstre',
    description: 'Retourne des informations sur un monstre ou une liste de monstres. Ses caractéristiques, ses drops, ses sorts, les zones où il se trouve, etc.',
    image: Monster
  },
  {
    title: 'Sort',
    description: 'Retourne des informations sur un sort ou une liste de sorts. Ses effets, son niveau d\'obtention quand il s\'agit d\'un sort de classe, les monstres qui l\'utilisent, et dispose d\'une interface avancée pour permettre d\'obtenir des détails technique sur le sort.'
  }, {
    title: 'Almanax',
    description: 'L\'Almanax est un événement journalier commun à tous les serveurs de jeux DOFUS. Chaque jour, à minuit, un nouveau bonus est disponibles. Les utilisateurs, on soit le choix de lancer chaque jour la commande eux même pour obtenir le nouveau bonus ainsi que l\'offrande à faire, soit de configurer grâce à la commande "Almanax-Setup" un envoi automatique de l\'Almanax chaque à jour à minuit. Près de 500 serveurs différents reçoit chaque jour l\'Almanax automatiquement." un envoi automatique de l\'Almanax chaque à jour à minuit. Près de 500 serveurs Discord différents recoivent chaque jour l\'Almanax automatiquement.'
  }
];

function EbouWorkDisplay({ workData }: { workData: IWork }): React.ReactElement {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string, image?: string } | null>(null);

  const openModal = (feature: { title: string, image?: string }) => {
    setImageOpen(true);
    setSelectedFeature(feature);

    setTimeout(() => {
      document.querySelector('.modal')?.classList.add('open');
    }, 10);
  };

  const closeModal = () => {
    setImageOpen(false);
    setSelectedFeature(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (imageOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className='work__ebou-container'>
      <WorkCard key={workData.id} admin={false} {...workData} />
      <div className='work__long-description content-container'>
        <h1>E-bou est un bot Discord relatif au MMORPG DOFUS.</h1>
        <p>Sa principale fonction est de fournir des informations en lien avec le jeu à ses utilisateurs.</p>
        <p>Ce projet a été initié en avril 2023 et, est, à ce jour, maintenu quotidiennement.</p>
        <p>Il s'agit de l'encyclopédie DOFUS la plus complète sur Discord permettant d'accéder à la quasi-totalité des informations disponibles en jeu.</p>
        <p>Le bot est disponible entièrement en français ainsi qu'en anglais, et partiellement en espagnol, Portugais, Allemand et Italien.</p>
      </div>
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
      {imageOpen && selectedFeature && (
        <>
          <div className='modal-backdrop' onClick={closeModal}></div>
          <div className={'modal'}>
            <div className='modal-content'>
              {selectedFeature.image && <img src={selectedFeature.image} alt={selectedFeature.title} />}
            </div>
          </div>
        </>
      )}
      <div className='work__long-description content-container'>
        <h3>Fonctionnalitées et statistiques</h3>
        <p>Le bot dispose de tout un tas de fonctionnalités, autant pour permettre de récupérer des informations en lien avec le jeu, que pour fournir des informations en temps réel sur l'activité d'Ankama.</p>
        <Collapsible trigger="Fonctionnalités" transitionTime={200}>
          <ul>
            {EbouFeatures.map((feature, index) => (
              <li key={index}>
                {feature.image && <h4 style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => openModal(feature)}>{feature.title}</h4>}
                {!feature.image && <h4>{feature.title}</h4>}
                <p>{feature.description}</p>
              </li>
            ))}
          </ul>
        </Collapsible>
      </div>
    </div >
  );
}

export default EbouWorkDisplay;
