/* eslint-env jest */
import Chance from 'chance';

import {
  validateUpdatePassword,
  text,
} from './validation';

const chance = new Chance();
let result;

describe('validation', () => {
  describe('validateUpdatePassword', () => {
    describe('with no payload', () => {
      beforeEach(() => {
        result = validateUpdatePassword();
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

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateUpdatePassword({ password: chance.word({ length: 8 }) });
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
  });
});
