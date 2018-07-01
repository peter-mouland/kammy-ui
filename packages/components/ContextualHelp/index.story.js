import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, number, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ContextualHelp from './src/ContextualHelp';

const sampleText = `The position of this popover box should automatically fit into the screen without any instruction. 
It should not overflow the window.`;

const ContextualHelpComponent = () => (
  <ContextualHelp
    header={text('header', '@molecule/contextual-help')}
    body={text('body', sampleText)}
    width={number('width', 310)}
    cutoffDistance={number('cutoffDistance', 250)}
    cutoffFadePercentage={number('cutoffFadePercentage', 0.4)}
    buttonSize={number('buttonSize', 32)}
    clickToClose={boolean('clickToClose', true)}
    handleClick={action('handleClick')}
  />
);

storiesOf('Atomic|@molecule/contextual-help', module)
  .addDecorator(withKnobs)
  .add('Default', () => (<ContextualHelpComponent />))
  .add('Demo - Overflow Edges', () => {
    const rowStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row',
    };

    const wrapperStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    };

    return (
      <div style={wrapperStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ ...rowStyle, flex: '1 1 0' }}>
            <ContextualHelpComponent />
            <ContextualHelpComponent />
            <ContextualHelpComponent />
          </div>
          <div style={{ ...rowStyle }}>
            <ContextualHelpComponent />
            <ContextualHelpComponent />
            <ContextualHelpComponent />
          </div>
        </div>
      </div>
    );
  });
