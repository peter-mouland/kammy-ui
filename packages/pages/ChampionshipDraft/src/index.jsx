import React from 'react';

import '@kammy-ui/bootstrap';

import './styles.scss';

const src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLwqJA5bCMEeBr6N8IUQK-F2Cmx_-O-yBkp6JlnyKiuy08bPWyEEXSJa2ErJgS-OkcMkZgIZGntmB5/pubhtml?gid=0&single=true';

const Index = () => (
  <section id="championship-draft-page" data-b-layout="container" className='frame-container'>
    <div data-b-layout="row vpad">
      <iframe src={src} className='frame' />
    </div>
  </section>
);

export default Index;
