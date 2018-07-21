/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Route from 'react-router-dom/Route';
import { Provider } from 'react-redux';

import AppRoute from './AppRoot';

let wrapper;
let props;

describe('<AppRoute />', () => {
  beforeEach(() => {
    const Component = () => <div />;
    props = {
      context: {},
      routesConfig: [{ name: 'example', Component }],
      store: {
        subscribe: jest.fn(),
        getState: jest.fn(),
        dispatch: jest.fn(),
      },
    };
    wrapper = mount(<AppRoute { ...props } />);
  });

  it('renders a <Provider> with store prop', () => {
    expect(wrapper.find(Provider)).toHaveProp('store', props.store);
  });

  it('renders a components passed by routesConfig', () => {
    expect(wrapper.find(Route)).toHaveLength(props.routesConfig.length);
  });
});
