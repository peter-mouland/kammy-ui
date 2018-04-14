/* eslint-env jest */
import React from 'react';
import { shallow, render } from 'enzyme';
import Chance from 'chance';

import AuthProvider from './AuthProvider';

const chance = new Chance();

let children;
let context;
let cookieToken

describe('Provider', () => {
  beforeEach(() => {
    children = chance.word();
    cookieToken = chance.word();
    context = {
      svgCache: {
        subscribe: jest.fn(),
        symbols: jest.fn(),
      },
    };
  });

  it('Passes props through', () => {
    const component = shallow(<AuthProvider cookieToken={cookieToken}>{children}</AuthProvider>);
    expect(component).toBeDefined();
  });

  it('Create a auth object which gets saved on to the context', () => {
    const component = shallow(<AuthProvider cookieToken={cookieToken}>{children}</AuthProvider>);
    const wrapperInstance = component.instance();
    expect(wrapperInstance.auth).toBeDefined();
  });
});
