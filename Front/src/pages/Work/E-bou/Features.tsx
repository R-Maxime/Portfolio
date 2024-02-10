/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import '../../../styles/Work/Ebou.scss';

import Item from '/img/item.webp';
import Monster from '/img/monster.webp';
import Spell from '/img/spell.webp';
import Almanax from '/img/almanax.webp';
import Breed from '/img/breed.webp';
import Dungeon from '/img/dungeon.webp';
import Help from '/img/help.webp';
import Collapsible from 'react-collapsible';
import i18n from '../../../langs/i18n';

const EbouFeatures: { title: string, description: string, image?: string }[] = [
  {
    title: 'Item',
    description: 'Retourne des informations sur un item ou une liste d\'items.\\nAffiche ses effets, ses caractéristiques, ses moyens d\'obtention, ses recettes, etc.',
    image: Item
  },
  {
    title: 'Monstre',
    description: 'Retourne des informations sur un monstre ou une liste de monstres.\\nAffiche ses caractéristiques, ses drops, ses sorts, les zones où il se trouve, etc.',
    image: Monster
  },
  {
    title: 'Sort',
    description: 'Retourne des informations sur un sort ou une liste de sorts.\\nAffiche ses effets, son niveau d\'obtention quand il s\'agit d\'un sort de classe, les monstres qui l\'utilisent, et dispose d\'une interface avancée pour permettre d\'obtenir des détails technique sur le sort.',
    image: Spell
  },
  {
    title: 'Almanax',
    description: 'L\'Almanax est un événement journalier commun à tous les serveurs de jeux DOFUS.\\n\\nLes utilisateurs ont la possibilité d\'effectuer manuellement une commande pour obtenir le bonus du jour, ou bien, à l\'aide de la commande "Almanax-Setup", de configurer un envoi automatique de l\'Almanax chaque jour à minuit.\\n\\nPrès de 500 serveurs différents reçoit quotidiennement l\'Almanax automatiquement.',
    image: Almanax
  },
  {
    title: 'Classe',
    description: 'Retourne des informations sur une classe, chacun de ses sorts, les mécaniques de classes ainsi que sa panoplie.',
    image: Breed
  }, {
    title: 'Donjon',
    description: 'Retourne des informations sur un donjon ou une liste de donjons.\\nLes monstres présents dans chaque salle, les succès liés au donjon, ainsi que la possibilité de visualiser l\'ensemble des cartes du donjon.',
    image: Dungeon
  }, {
    title: 'Et bien plus encore...',
    description: 'Le bot dispose d\'un tas d\'autres commandes, toutes aussi complète les unes que les autres ... !',
    image: Help
  }
];

function Features(): React.ReactElement {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string, image?: string } | null>(null);

  const openModal = (feature: { title: string, image?: string }) => {
    setImageOpen(true);
    setSelectedFeature(feature);

    setTimeout(() => {
      document.querySelector('.modal')?.classList.add('open');
      document.querySelector('.modal-backdrop')?.classList.add('open');
    }, 10);
  };

  const closeModal = () => {
    document.querySelector('.modal')?.classList.remove('open');
    document.querySelector('.modal-backdrop')?.classList.remove('open');

    setTimeout(() => {
      setImageOpen(false);
      setSelectedFeature(null);
    }, 300);
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

  useEffect(() => {
    const imgToPreload = [Item, Monster, Spell, Almanax, Breed, Dungeon, Help];

    imgToPreload.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  return (
    <>
      {imageOpen && selectedFeature && (
        <>
          <div className='modal-backdrop' onClick={closeModal}></div>
          <div className={'modal'}>
            <div className='modal-content'>
              {selectedFeature.image && <img src={selectedFeature.image} alt={`Image de la commande "${selectedFeature.title}"`} />}
            </div>
          </div>
        </>
      )}
      <div className='work__long-description content-container features__container'>
        <h3>{i18n.work.Ebou.features.fr}</h3>
        <p>Le bot dispose de tout un tas de fonctionnalités, autant pour permettre de récupérer des informations en lien avec le jeu, que pour fournir des informations en temps réel sur l'activité d'Ankama.</p>
        <Collapsible trigger={i18n.work.Ebou.features.fr} transitionTime={200}>
          <ul>
            {EbouFeatures.map((feature, index) => (
              <li key={index}>
                {feature.image && <h4 className='features__title' onClick={() => openModal(feature)}>{feature.title}</h4>}
                {!feature.image && <h4>{feature.title}</h4>}
                {feature.description.split('\\n').map((paragraph, ind) => (
                  <p key={ind}>{paragraph}<br /></p>
                ))}
              </li>
            ))}
          </ul>
        </Collapsible>
        <p>L'ensemble des commandes sont totalement interactives et reliées entre elles, si la commande en cours va avoir un quelconque lien avec une des fonctionnalités du bot, il est possible grâce à un menu déroulant ou des boutons de naviguer vers la fonctionnalité en question, sans aucune difficulté.</p>
      </div>
    </>
  );
}

export default Features;
