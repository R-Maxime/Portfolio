import React from 'react';
import Auth from '../../datas/Auth';
import MainCard from '../../components/MainCard';
import ImageCard from '../../components/ImageCard';

function Index(): React.ReactElement {
  const birthdayDate = new Date('1999-08-08');
  const age = Math.floor((Date.now() - birthdayDate.getTime()) / 1000 / 60 / 60 / 24 / 365.25);

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' }
  ];

  if (Auth.isAuthenticated()) {
    pages.push({ name: 'Admin', path: '/admin' });
    pages.push({ name: 'Works', path: '/admin/works' });
  }

  return (
    <>
      <div className='main-cards'>
        <MainCard
          title='Maxime R.'
          description={`Developpeur Full Stack JS/TS de ${age} ans`}
          color='#009688'
          image='https://faareoh.fr/favicon.ico'
          link='https://github.com/R-Maxime/Portfolio'
          linkText='Ce site ↗️'
        />
        <MainCard
          title='Github personnel'
          description='Mes projets personnels'
          color='#24292e'
          image='/assets/github-mark-white.png'
          link='https://github.com/Faareoh'
        />
        <ImageCard
          image='/assets/discord.png'
          backgroundColor='#5865F2'
          link='discord://-/users/211543250438193152'
        />
        <MainCard
          title='Projets'
          description='Tous mes projets (professionnels et personnels)'
          color='#8424e3'
          link='/projects'
        />
      </div>
    </ >
  );
}

export default Index;
