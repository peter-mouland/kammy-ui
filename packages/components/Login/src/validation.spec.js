/* eslint-env jest */
import Chance from 'chance';

import {
  validateSignUpForm,
  validateLoginForm,
  validateSignUpResponse,
  validateLoginResponse,
  text,
} from './validation';

const chance = new Chance();
let result;

describe('auth-validation', () => {
  describe('validateSignupForm', () => {
    describe('with no payload', () => {
      beforeEach(() => {
        result = validateSignUpForm();
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(text.signUpForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.signUpForm.errors.password);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(text.signUpForm.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid email', () => {
      beforeEach(() => {
        result = validateSignUpForm({ email: chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.signUpForm.errors.password);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(text.signUpForm.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid name', () => {
      beforeEach(() => {
        result = validateSignUpForm({ name: chance.word() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(text.signUpForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.signUpForm.errors.password);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateSignUpForm({ password: chance.word({ length: 8 }) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(text.signUpForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(undefined);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(text.signUpForm.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid details', () => {
      beforeEach(() => {
        result = validateSignUpForm({
          password: chance.word({ length: 8 }),
          name: chance.word(),
          email: chance.email(),
        });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(undefined);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual('');
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(true);
      });
    });
  });

  describe('validateLoginForm', () => {
    describe('with no payload', () => {
      beforeEach(() => {
        result = validateLoginForm();
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(text.loginForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.loginForm.errors.password);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid email', () => {
      beforeEach(() => {
        result = validateLoginForm({ email: chance.email() });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.loginForm.errors.password);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateLoginForm({ password: chance.word({ length: 8 }) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).toEqual(text.loginForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.loginForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
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
        expect(result.errors.email).toEqual(undefined);
      });
      it('should return an password error', () => {
        expect(result.errors.password).toEqual(undefined);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual('');
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(true);
      });
    });
  });

  describe('validateSignupResponse', () => {
    it('returns a successful 200 status if no error is passed', () => {
      const successResponse = validateSignUpResponse();
      expect(successResponse.status).toEqual(200);
      expect(successResponse.body.success).toEqual(true);
      expect(successResponse.body.message).toEqual(text.signUpResponse.success);
    });

    it('returns a 409 status for MongoError 11000', () => {
      const successResponse = validateSignUpResponse({ name: 'MongoError', code: 11000 });
      expect(successResponse.status).toEqual(409);
      expect(successResponse.body.success).toEqual(false);
      expect(successResponse.body.message).toEqual(text.signUpResponse.errors.message);
      expect(successResponse.body.errors.email).toEqual(text.signUpResponse.errors.email);
    });

    it('returns a 400 status for other errors', () => {
      const successResponse = validateSignUpResponse({ name: chance.word() });
      expect(successResponse.status).toEqual(400);
      expect(successResponse.body.success).toEqual(false);
      expect(successResponse.body.message).toEqual(text.signUpResponse.error400);
    });
  });

  describe('validateLoginResponse', () => {
    it('returns a successful 200 status with token and userData if no error is passed', () => {
      const fakeToken = chance.apple_token();
      const fakeUserData = chance.word();
      const response = validateLoginResponse(false, fakeToken, fakeUserData);
      expect(response.status).toEqual(200);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual(text.loginResponse.success);
      expect(response.body.token).toEqual(fakeToken);
      expect(response.body.user).toEqual(fakeUserData);
    });

    it('returns a 409 status for IncorrectCredentialsError', () => {
      const message = chance.word();
      const response = validateLoginResponse({ name: 'IncorrectCredentialsError', message });
      expect(response.status).toEqual(400);
      expect(response.body.success).toEqual(false);
      expect(response.body.message).toEqual(message);
    });

    it('returns a 400 status for other errors', () => {
      const response = validateLoginResponse({ name: chance.word() });
      expect(response.status).toEqual(400);
      expect(response.body.success).toEqual(false);
      expect(response.body.message).toEqual(text.loginResponse.error400);
    });
  });
});
