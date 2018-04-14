/* eslint-env jest */
import Chance from 'chance';

import { validateUpdatePassword, text } from './validation';

const chance = new Chance();
let result;

describe('validation', () => {
  describe('validateUpdatePassword', () => {
    describe('with no payload', () => {
      beforeEach(() => {
        result = validateUpdatePassword();
      });

      it('should return an password error', () => {
        expect(result.errors.password).toEqual(text.errors.password);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(text.errors.name);
      });
      it('should return an error message', () => {
        expect(result.message).toEqual(text.errors.message);
      });
      it('should return success = false', () => {
        expect(result.success).toEqual(false);
      });
    });

    describe('with a valid password', () => {
      beforeEach(() => {
        result = validateUpdatePassword({ password: chance.word({ length: 8 }) });
      });

      it('should return an password error', () => {
        expect(result.errors.password).toEqual(undefined);
      });
      it('should return an name error', () => {
        expect(result.errors.name).toEqual(text.errors.name);
      });
      it('should return an empty message', () => {
        expect(result.message).toEqual('');
      });
      it('should return success = true', () => {
        expect(result.success).toEqual(true);
      });
    });
  });
});
