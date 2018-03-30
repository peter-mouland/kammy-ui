import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Modal from './src/Modal';

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
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
