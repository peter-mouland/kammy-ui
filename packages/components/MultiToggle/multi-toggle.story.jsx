import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Chance from 'chance';

import MultiToggle from './src/MultiToggle';

const chance = new Chance();

const options = [chance.word(), chance.word(), chance.word()];

storiesOf('Components', module)
  .add('MultiToggle', () => (
    <MultiToggle
      id={text('id', 'id')}
      checked={text('checked', '')}
      options={array('options', options)}
      onChange={action('onChange')}
    />
  ));
