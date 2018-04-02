/* eslint-env jest */
import Chance from 'chance';

import { validateLoginForm, validateLoginResponse, text } from './validation';

const chance = new Chance();
let result;

describe('auth-validation', () => {
  describe('validateLoginForm', () => {
    describe('with no payload', () => {
      beforeEach(() => {
        result = validateLoginForm();
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.loginForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.loginForm.errors.password);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    describe('with a valid email', () => {
      beforeEach(() => {
        result = validateLoginForm({ email: chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.loginForm.errors.password);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateLoginForm({ password: chance.word({ length: 8 }) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.loginForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    describe('with a valid details', () => {
      beforeEach(() => {
        result = validateLoginForm({
          password: chance.word({ length: 8 }),
          name: chance.word(),
          email: chance.email(),
        });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal('');
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(true);
      });
    });
  });

  describe('validateLoginResponse', () => {
    it('returns a successful 200 status with token and userData if no error is passed', () => {
      const fakeToken = chance.apple_token();
      const fakeUserData = chance.word();
      const response = validateLoginResponse(false, fakeToken, fakeUserData);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal(text.loginResponse.success);
      expect(response.body.token).to.equal(fakeToken);
      expect(response.body.user).to.equal(fakeUserData);
    });

    it('returns a 409 status for IncorrectCredentialsError', () => {
      const message = chance.word();
      const response = validateLoginResponse({ name: 'IncorrectCredentialsError', message });
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal(message);
    });

    it('returns a 400 status for other errors', () => {
      const response = validateLoginResponse({ name: chance.word() });
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal(text.loginResponse.error400);
    });
  });
});
