import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array } from '@storybook/addon-knobs';
import Chance from 'chance';

import MultiToggle from './src/MultiToggle';

const chance = new Chance();

class DemoToggle extends React.Component {
  state = { checked: '' };
  options = [chance.word(), chance.word(), chance.word()];
  onChange = (checked) => this.setState({ checked });
  render() {
    return (
      <MultiToggle
        label={text('label', 'label')}
        id={text('id', 'id')}
        checked={text('checked', this.state.checked)}
        options={array('options', this.options)}
        onChange={this.onChange}
      />
    );
  }
}

storiesOf('Components', module)
  .add('MultiToggle', () => <DemoToggle />);
