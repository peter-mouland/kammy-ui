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
        expect(result.errors.email).to.equal(text.signUpForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(text.signUpForm.errors.password);
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.signUpForm.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateUpdatePassword({ password: chance.word({ length: 8 }) });
      });

      it('should return an email error', () => {
        expect(result.errors.email).to.equal(text.signUpForm.errors.email);
      });
      it('should return an password error', () => {
        expect(result.errors.password).to.equal(undefined);
      });
      it('should return an name error', () => {
        expect(result.errors.name).to.equal(text.signUpForm.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).to.equal(text.signUpForm.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).to.equal(false);
      });
    });
  });
});
