import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Toggle from './src/Toggle';

storiesOf('Components', module)
  .add('Toggle', () => (
    <Toggle
      id={text('id', 'id')}
      checked={boolean('checked', false)}
      onClick={action('onClick')}
    />
  ));
