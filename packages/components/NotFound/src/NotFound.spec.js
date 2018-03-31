/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

describe('NotFound', () => {
  it('should render with an id', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('#not-found').length).toEqual(1);
  });
});
