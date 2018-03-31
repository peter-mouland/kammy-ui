/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';

const baseProps = {};

describe('Settings Container', () => {
  it('should have an id of home-page', () => {
    const wrapper = shallow(<HomePage { ...baseProps } />);
    expect(wrapper.at(0).props().id).toEqual('home-page');
  });
  //  unit testing goes here
});
