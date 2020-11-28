import React from 'react';
import Header from '../components/layout/header';
import NotesList from '../components/notesList';

const Home = () => {
  return (
    <div>
      <Header />
      <NotesList />
    </div>
  );
};

export default Home;
