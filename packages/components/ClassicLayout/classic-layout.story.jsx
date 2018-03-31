import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import BrowserRouter from 'react-router-dom/BrowserRouter';

import ClassicLayout from './src/ClassicLayout';

storiesOf('Components', module)
  .add('ClassicLayout', () => (
    <BrowserRouter>
      <ClassicLayout
        name={text('name', 'name')}
        isUserAuthenticated={boolean('isUserAuthenticated', false)}
      >
        DEMO LAYOUT CONTENT
      </ClassicLayout>
    </BrowserRouter>
  ));
