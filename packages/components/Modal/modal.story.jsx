import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Modal from './src/Modal';

storiesOf('Components', module)
  .add('Modal', () => (
    <Modal
      id={text('id', 'id')}
      title={text('title', 'title')}
      open={boolean('open', true)}
      onClose={action('onClose')}
    >
      DEMO MODAL
    </Modal>
  ));
