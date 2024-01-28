/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import '../../../styles/Work/Ebou.scss';

import Item from '/item.jpg';
import Monster from '/monster.jpg';
import Spell from '/spell.jpg';
import Almanax from '/almanax.jpg';
import Breed from '/breed.jpg';
import Dungeon from '/dungeon.jpg';
import Help from '/help.jpg';
import Collapsible from 'react-collapsible';

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
    description: 'L\'Almanax est un événement journalier commun à tous les serveurs de jeux DOFUS.\\nChaque jour, à minuit, un nouveau bonus est disponibles. Les utilisateurs, on soit le choix de lancer chaque jour la commande eux même pour obtenir le nouveau bonus ainsi que l\'offrande à faire, soit de configurer grâce à la commande "Almanax-Setup" un envoi automatique de l\'Almanax chaque jour à minuit.\\nPrès de 500 serveurs différents reçoit chaque jour l\'Almanax automatiquement.',
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
              {selectedFeature.image && <img src={selectedFeature.image} alt={selectedFeature.title} />}
            </div>
          </div>
        </>
      )}
      <div className='work__long-description content-container features__container'>
        <h3>Fonctionnalitées</h3>
        <p>Le bot dispose de tout un tas de fonctionnalités, autant pour permettre de récupérer des informations en lien avec le jeu, que pour fournir des informations en temps réel sur l'activité d'Ankama.</p>
        <Collapsible trigger="Fonctionnalités" transitionTime={200}>
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
