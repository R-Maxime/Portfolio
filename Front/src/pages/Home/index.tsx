/* eslint-disable max-len */
import React from 'react';
import Auth from '../../datas/Auth';
import MainCard from '../../components/MainCard';
import Utils from '../../datas/utils';
import AboutMe from './AboutMe';
import MyStacks from './MyStacks';
import MyBackground from './MyBackground';
import constant from '../../../constant';
import i18n from '../../langs/i18n';
import HomeMeta from '../../components/Meta/Home';

function Index(): React.ReactElement {
  document.title = `Accueil - ${constant.PAGE_DEFAULT_NAME}`;
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' }
  ];

  if (Auth.isAuthenticated()) {
    pages.push({ name: 'Admin', path: '/admin' });
    pages.push({ name: 'Works', path: '/admin/works' });
  }

  return (
    <div style={{
      display: 'grid',
      gap: '25px'
    }}>
      <HomeMeta />
      <div className='main-cards anim'>
        <MainCard
          title={i18n.home.name}
          description={`Developpeur Full Stack JS/TS de ${Utils.getAge()} ans`}
          color='#009688'
          image='https://faareoh.fr/favicon.ico'
          link='https://github.com/R-Maxime/Portfolio'
          linkText='Github de ce site/Api ↗️'
          external={true}
        />
        <MainCard
          title={i18n.home.github.fr}
          description='Mes projets personnels'
          color='#24292e'
          image='/assets/github-mark-white.png'
          link='https://github.com/Faareoh'
          external={true}
        />
        <AboutMe />
        <MyBackground />
        <MyStacks />
        <MainCard
          title={i18n.work.projects.fr}
          description='Tous mes projets (professionnels et personnels)'
          image='/assets/dev.png'
          color='#8424e3'
          link='/works'
          external={false}
        />
      </div>
      <div className='contact-card anim'>
        <MainCard
          title={i18n.home.contact.fr}
          description="​"
          image='/assets/contact.png'
          color='#5865F2'
          link='/contact'
          external={false}
        />
      </div>
    </div>
  );
}

export default Index;
