/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Route from 'react-router-dom/Route';
import { Provider } from 'react-redux';

import AppRoute, { Routes } from './AppRoot';

let wrapper;
let props;

describe('<AppRoute />', () => {
  beforeEach(() => {
    props = {
      context: {},
      store: {
        subscribe: jest.fn(),
        getState: jest.fn(),
        dispatch: jest.fn(),
      },
    };
    wrapper = shallow(
      <AppRoute { ...props } />,
    );
  });

  it('renders a <Provider> with store prop', () => {
    expect(wrapper.find(Provider)).toHaveProp('store', props.store);
  });


  it('renders a <Routes> component', () => {
    expect(wrapper.find(Routes)).toHaveLength(1);
  });

  it('renders a route component for each route', () => {
    const Component = () => <div />;
    const appConfig = { routes: [{ name: 'example', Component }] };
    wrapper = shallow(<Routes { ...props } />, { context: { appConfig } });
    expect(wrapper.dive().find(Route)).toHaveLength(appConfig.routes.length);
  });
});
