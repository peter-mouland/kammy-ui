/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';
import '@kammy-ui/node-local-storage';

import Login from './Login';
import { validateLoginForm, validateSignUpForm } from './validation';

jest.mock('./validation');

const mockValidation = {
  validateLoginForm: jest.fn(() => ({ success: true })),
  validateSignUpForm: jest.fn(() => ({ success: true })),
};

validateLoginForm.mockImplementation(mockValidation.validateLoginForm);
validateSignUpForm.mockImplementation(mockValidation.validateSignUpForm);

const chance = new Chance();
const baseProps = {};
const fakeOnChange = jest.fn();
const fakeOnSubmit = jest.fn();
let fakeLogin = jest.fn();
const fakeSignup = jest.fn();
const auth = { login: fakeLogin, signup: fakeSignup };
const defaultMockProps = {
  onChange: fakeOnChange,
  onSubmit: fakeOnSubmit,
  errors: { },
  successMessage: '',
  user: {
    action: { type: 'login' },
  },
  actions: { signUp: chance.word(), login: chance.word() },
};

let fakeEvent;
let context = { auth };
const fakeUserLogin = { action: { type: 'login', email: chance.email(), password: chance.sentence() } };
// const fakeUserSignup = { action: { type: 'signup', email: chance.email(), password: chance.sentence() } };

describe('Login Page', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    validateLoginForm.mockClear();
    validateSignUpForm.mockClear();
    fakeEvent = {
      target: {
        name: '',
      },
      preventDefault: jest.fn(),
    };
  });

  describe('Auth login without errors', () => {
    it('should have an id of login-page', () => {
      const wrapper = shallow(<Login { ...baseProps } />, { context });
      expect(wrapper.at(0).props()).toHaveProperty('id', 'login-page');
    });

    it('should prevent normal form submission', () => {
      const wrapper = shallow(<Login { ...baseProps } />, { context });
      const loginForm = wrapper.find('form');
      loginForm.props().onSubmit(fakeEvent);
      expect(fakeEvent.preventDefault).toBeCalled();
    });

    it('should call the validation function ', () => {
      const wrapper = shallow(<Login { ...baseProps } />, { context });
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).toEqual(expect.any(Function));
      expect(wrapper.state().redirectTo).toEqual(null);
      loginForm.props().onSubmit(fakeEvent);
      expect(mockValidation.validateLoginForm).toHaveBeenCalled();
    });

    it('should set state ready to redirect to the home page once authorised', (done) => {
      let wrapper;
      fakeLogin = jest.fn((url, user, cb) => {
        cb();
        expect(wrapper.state().redirectTo).toEqual('/');
        done();
      });
      context = { auth: { login: fakeLogin } };
      wrapper = shallow(<Login { ...baseProps } />, { context });
      wrapper.setState({ user: fakeUserLogin });
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).toEqual(expect.any(Function));
      expect(wrapper.state().redirectTo).toEqual(null);
      loginForm.props().onSubmit(fakeEvent);
    });

    it('should redirect to the "from" prop once authorised', (done) => {
      let wrapper;
      const from = chance.word();
      const props = { location: { state: { from } } };
      fakeLogin = jest.fn((url, user, cb) => {
        cb();
        expect(wrapper.state().redirectTo).toEqual(from);
        done();
      });
      context = { auth: { login: fakeLogin } };
      wrapper = shallow(<Login { ...props } />, { context });
      wrapper.setState({ user: fakeUserLogin });
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).toEqual(expect.any(Function));
      expect(wrapper.state().redirectTo).toEqual(null);
      loginForm.props().onSubmit(fakeEvent);
    });
  });

  describe('Auth login with errors', () => {
    const error = chance.word();

    it('should set errors if authorisation returns errors', (done) => {
      let wrapper;
      const from = chance.word();
      const props = { location: { state: { from } } };
      fakeLogin = jest.fn((url, user, cb) => {
        cb(error);
        expect(wrapper.state().redirectTo).toEqual(null);
        expect(wrapper.state().errors).toEqual(error);
        done();
      });
      context = { auth: { login: fakeLogin } };
      wrapper = shallow(<Login { ...props } />, { context });
      wrapper.setState({ user: fakeUserLogin });
      const loginForm = wrapper.find('form');
      expect(loginForm.props().onSubmit).toEqual(expect.any(Function));
      expect(wrapper.state().redirectTo).toEqual(null);
      loginForm.props().onSubmit(fakeEvent);
    });
  });
});

describe('LoginForm', () => {
  it('has an email field that updates state', () => {
    const wrapper = shallow(<Login {...defaultMockProps} />, { context });
    fakeEvent.target.name = 'email';
    fakeEvent.target.value = chance.word();
    wrapper.find('input[type="email"]').simulate('change', fakeEvent);
    expect(wrapper.state().user.email).toBe(fakeEvent.target.value);
  });

  it('has an password field that updates state', () => {
    const wrapper = shallow(<Login {...defaultMockProps} />, { context });
    fakeEvent.target.name = 'password';
    fakeEvent.target.value = chance.word();
    wrapper.find('input[type="password"]').simulate('change', fakeEvent);
    expect(wrapper.state().user.password).toBe(fakeEvent.target.value);
  });

  // functionality hidden
  it.skip('has an action field with value login that updates state', () => {
    const action = defaultMockProps.actions.login;
    const wrapper = shallow(<Login {...defaultMockProps} />, { context });
    wrapper.find(`input[value="${action}"]`).simulate('change', fakeEvent);
    expect(wrapper.state()).toBe(fakeEvent);
  });

  it.skip('has an action field with value signUp that updates state', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const action = defaultMockProps.actions.signUp;
    const wrapper = shallow(<Login {...mockProps} />, { context });
    wrapper.find(`input[value="${action}"]`).simulate('change', fakeEvent);
    expect(wrapper.state()).toBe(fakeEvent);
  });
});
