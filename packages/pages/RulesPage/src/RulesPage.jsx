import React from 'react';

import '@kammy-ui/bootstrap';

import './styles.scss';

const src = 'https://docs.google.com/document/d/e/2PACX-1vTFlrJtsgbHsNScMLEDyAy1KnSclQmghRXLMdZV7T3L0phP2gp4r71GCzaAGPs6Z4kyw8UvyhD3axmr/pub';

const RulesPage = () => (
  <section id="rules-page" data-b-layout="container" className='rules-container'>
    <div data-b-layout="row vpad">
      <iframe src={src} className='rules-frame' />
    </div>
  </section>
);

export default RulesPage;
