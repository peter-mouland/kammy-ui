import React from 'react';
import Chance from 'chance';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import Errors from './src/Errors';

const chance = new Chance();
const errors = [{
  message: chance.sentence()
}];

storiesOf('Components', module)
  .add('Errors', () => (
    <Errors errors={ object('errors', errors) } />
  ));
