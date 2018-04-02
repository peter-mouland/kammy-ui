/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import LogOut from './LogOut';

describe('LogOut', () => {
  it('call auth.logout on mount', () => {
    const fakeLogout = jest.fn();
    const auth = { logout: fakeLogout };
    mount(<LogOut />, { auth });
    expect(fakeLogout).to.be.calledWith();
  });
});
