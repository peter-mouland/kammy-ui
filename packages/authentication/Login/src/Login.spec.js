/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';

import Login from './Login';

const chance = new Chance();
const baseProps = {};
// const Auth = {
//   login: jest.fn(),
//   signup: jest.fn(),
// };
const fakeOnChange = jest.fn();
const fakeOnSubmit = jest.fn();
const defaultMockProps = {
  onChange: fakeOnChange,
  onSubmit: fakeOnSubmit,
  errors: { },
  successMessage: '',
  user: {},
  actions: { signUp: chance.word(), login: chance.word() },
};

const fakeEvent = {
  preventDefault: jest.fn(),
};

describe('Login Page', () => {
  describe('Auth login without errors', () => {
    it('should have an id of login-page', () => {
      const wrapper = shallow(<Login { ...baseProps } />);
      expect(wrapper.at(0)).to.have.prop('id', 'login-page');
    });

    it('should prevent normal form submission', () => {
      const wrapper = shallow(<Login { ...baseProps } />);
      const loginForm = wrapper.find('form');
      loginForm.props().onSubmit(fakeEvent);
      expect(fakeEvent.preventDefault).to.be.calledWith();
    });

    it('should set state ready to redirect to the home page once authorised', () => {
      const wrapper = shallow(<Login { ...baseProps } />);
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectTo).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectTo).to.equal('/');
    });

    it('should redirect to the "from" prop once authorised', () => {
      const from = chance.word();
      const props = { location: { state: { from } } };
      const wrapper = shallow(<Login { ...props } />);
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectTo).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectTo).to.equal(from);
    });
  });

  describe('Auth login with errors', () => {
    const error = chance.word();

    it('should set errors if authorisation returns errors', () => {
      const from = chance.word();
      const props = { location: { state: { from } } };
      const wrapper = shallow(<Login { ...props } />);
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectTo).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectTo).to.equal(false);
      expect(wrapper.state().errors).to.equal(error);
    });
  });
});

describe('LoginForm', () => {
  it('has an email field that call onChange', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<Login {...mockProps} />);
    component.find('input[type="email"]').simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('has an password field that call onChange', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<Login {...mockProps} />);
    component.find('input[type="password"]').simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  // functionality hidden
  it.skip('has an action field with value login that call onChange', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const fakeLogin = defaultMockProps.actions.login;
    const component = shallow(<Login {...mockProps} />);
    component.find(`input[value="${fakeLogin}"]`).simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('has an action field with value signUp that call onChange', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const fakeSignUp = defaultMockProps.actions.signUp;
    const component = shallow(<Login {...mockProps} />);
    component.find(`input[value="${fakeSignUp}"]`).simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('call onSubmit', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<Login {...mockProps} />);
    component.simulate('submit');
    expect(fakeOnSubmit).to.be.calledWith();
  });
});
