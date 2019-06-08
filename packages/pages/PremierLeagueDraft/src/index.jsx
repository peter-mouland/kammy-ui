import React from 'react';

import '@kammy-ui/bootstrap';

import './styles.scss';

const src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3amNkTAxhpVu1Y1fBhEqDCV0r6J3PBLuNpHlhvmoaJQ7UIfgcOgSd9YKGsTsQfdXzZOLCsJwHnAk/pubhtml?gid=0&single=true';

const Index = () => (
  <section id="premier-league-draft-page" data-b-layout="container" className='frame-container'>
    <div data-b-layout="row vpad">
      <iframe src={src} className='frame' />
    </div>
  </section>
);

export default Index;
