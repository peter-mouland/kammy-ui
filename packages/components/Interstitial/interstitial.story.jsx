import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Interstitial from './src/Interstitial';

storiesOf('Components', module)
  .add('Interstitial', () => (
    <Interstitial
      message={text('message', '')}
    />
  ));
