import React from 'react';

import '@kammy-ui/bootstrap';

import './styles.scss';

const src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTd7NQ2Iu4P7zzjwpHtHwLFacDKTwpmLO08R90fFdYurxEh-LJlYFGjoNM79sPi6iBpV3owLf7mXwOm/pubhtml?gid=0&single=true';

const Index = () => (
  <section id="league-one-draft-page" data-b-layout="container" className='frame-container'>
    <div data-b-layout="row vpad">
      <iframe src={src} className='frame' />
    </div>
  </section>
);

export default Index;
