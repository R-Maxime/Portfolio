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
import ContactForm from './Contact';

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
          description={`Développeur Full Stack JS/TS de ${Utils.getAge()} ans`}
          color='#009688'
          link='https://github.com/R-Maxime/Portfolio'
          linkText='Github de ce site/Api ↗️'
          external={true}
        />
        <MainCard
          title={i18n.home.github.fr}
          description='Mes projets personnels'
          color='#24292e'
          image='/assets/github-mark-white.webp'
          link='https://github.com/Faareoh'
          external={true}
        />
        <AboutMe />
        <MyBackground />
        <MyStacks />
        <MainCard
          title={i18n.work.projects.fr}
          description='Tous mes projets (professionnels et personnels)'
          image='/assets/dev.webp'
          color='#8424e3'
          link='/works'
          external={false}
        />
      </div>
      {<ContactForm />}
    </div>
  );
}

export default Index;
