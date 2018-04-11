/* eslint-env jest */
import React from 'react';
import { mount, render } from 'enzyme';
import Redirect from 'react-router-dom/Redirect';
import StaticRouter from 'react-router-dom/StaticRouter';

import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  let Auth;
  let fakeValidateToken;

  beforeEach(() => {
    Auth = {
    };
  });

  it('checks user is authenticated if the router requires authentication', () => {
    Auth.validateToken = jest.fn();
    render(<StaticRouter><PrivateRoute Component={() => <div /> } path="/" /></StaticRouter>);
    expect(fakeValidateToken).to.be.calledWith();
  });

  it.skip('does a redirect if route requires authentication and user is not authenticated', () => {
    // fakeValidateToken = sandbox.stub(Auth, 'validateToken').returns(false);
    Auth.validateToken = jest.fn();
    const fakeComponent = () => <div />;
    const component = render(<StaticRouter><PrivateRoute path={'/'} Component={fakeComponent}/></StaticRouter>);
    expect(component.find(Redirect).length).toEqual(1);
    expect(component.find(fakeComponent).length).toEqual(0);
  });

  it('renders a component if route does require authentication and user is authenticated', () => {
    // fakeValidateToken = sandbox.stub(Auth, 'validateToken').returns(true);
    Auth.validateToken = jest.fn();
    const fakeComponent = () => <div />;
    const component = mount(<StaticRouter><PrivateRoute path={'/'} Component={fakeComponent} /></StaticRouter>);
    expect(component.find(fakeComponent).length).toEqual(1);
  });
});
