/* eslint-env jest */
/* eslint-disable no-global-assign */
import Chance from 'chance';

import { sendXhr } from './Auth';

const chance = new Chance();

let fakeXhr;
let fakeFormData;
let fakeUrl;
let fakeCallback;
let savedXhrResposne;

describe('auth-helper', () => {
  describe('sendXhr', () => {
    beforeEach(() => {
      savedXhrResposne = XMLHttpRequest;
      fakeXhr = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn(),
      };
      fakeCallback = jest.fn();
      fakeFormData = chance.word();
      fakeUrl = chance.url();
    });

    afterEach(() => {
      XMLHttpRequest = savedXhrResposne;
    });

    it('should call the open function POSTing the given url', () => {
      XMLHttpRequest = jest.fn().returns(fakeXhr);
      sendXhr(fakeFormData, fakeUrl, fakeCallback);
      expect(fakeXhr.open).to.be.calledWith('post', fakeUrl);
    });

    it('should call the send function with the given data', () => {
      XMLHttpRequest = jest.fn().returns(fakeXhr);
      sendXhr(fakeFormData, fakeUrl, fakeCallback);
      expect(fakeXhr.send).to.be.calledWith(fakeFormData);
    });

    it('should call the setRequestHeader function to send form data', () => {
      XMLHttpRequest = jest.fn().returns(fakeXhr);
      sendXhr(fakeFormData, fakeUrl, fakeCallback);
      expect(fakeXhr.setRequestHeader).to.be.calledWith('Content-type', 'application/x-www-form-urlencoded');
    });

    it('should call addEventListener function ready to receive data', (done) => {
      fakeXhr.addEventListener = (event, cb) => {
        expect(event).to.equal('load');
        expect(typeof cb).to.equal('function');
        done();
      };
      XMLHttpRequest = jest.fn().returns(fakeXhr);
      sendXhr(fakeFormData, fakeUrl, fakeCallback);
    });

    it('should expect a json response', () => {
      XMLHttpRequest = jest.fn().returns(fakeXhr);
      sendXhr(fakeFormData, fakeUrl, fakeCallback);
      expect(fakeXhr.responseType).to.equal('json');
    });

    describe('when status=200', () => {
      beforeEach(() => {
        fakeXhr.status = 200;
      });

      it('should return a valid authenticated response', (done) => {
        const jsonResponse = {
          [chance.word()]: chance.word(),
          token: chance.word(),
          message: chance.sentence(),
        };
        fakeXhr.response = jsonResponse;
        fakeXhr.addEventListener = (event, cb) => {
          cb();
          expect(fakeCallback).to.be.calledWith({
            authenticated: true,
            token: jsonResponse.token,
            message: jsonResponse.message,
          });
          done();
        };
        XMLHttpRequest = jest.fn().returns(fakeXhr);
        sendXhr(fakeFormData, fakeUrl, fakeCallback);
      });

      it('should return parse a response string as json to make sure ie11 + phantomJS works', (done) => {
        const jsonResponse = {
          [chance.word()]: chance.word(),
          token: chance.word(),
          message: chance.sentence(),
        };
        fakeXhr.response = JSON.stringify(jsonResponse);
        fakeXhr.addEventListener = (event, cb) => {
          cb();
          expect(fakeCallback).to.be.calledWith({
            authenticated: true,
            token: jsonResponse.token,
            message: jsonResponse.message,
          });
          done();
        };
        XMLHttpRequest = jest.fn().returns(fakeXhr);
        sendXhr(fakeFormData, fakeUrl, fakeCallback);
      });
    });

    describe('when status != 200', () => {
      beforeEach(() => {
        fakeXhr.status = 500;
      });

      it('should return a response with errors json', (done) => {
        const error = chance.word();
        const errors = { [error]: chance.word() };
        const jsonResponse = {
          [chance.word()]: chance.word(),
          errors,
          message: chance.sentence(),
        };
        fakeXhr.response = jsonResponse;
        fakeXhr.addEventListener = (event, cb) => {
          cb();
          expect(fakeCallback).to.be.calledWith({ errors: { [error]: errors[error], summary: jsonResponse.message } });
          done();
        };
        XMLHttpRequest = jest.fn().returns(fakeXhr);
        sendXhr(fakeFormData, fakeUrl, fakeCallback);
      });

      it('should return parse a response string as json to make sure ie11 + phantomJS works with error responses', (done) => {
        const error = chance.word();
        const errors = { [error]: chance.word() };
        const jsonResponse = {
          [chance.word()]: chance.word(),
          errors,
          message: chance.sentence(),
        };
        fakeXhr.response = JSON.stringify(jsonResponse);
        fakeXhr.addEventListener = (event, cb) => {
          cb();
          expect(fakeCallback).to.be.calledWith({ errors: { [error]: errors[error], summary: jsonResponse.message } });
          done();
        };
        XMLHttpRequest = jest.fn().returns(fakeXhr);
        sendXhr(fakeFormData, fakeUrl, fakeCallback);
      });
    });
  });
});