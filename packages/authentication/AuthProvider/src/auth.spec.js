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
      savedXhrResposne = global.XMLHttpRequest;
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
      global.XMLHttpRequest = savedXhrResposne;
    });

    it('should call the open function POSTing the given url', () => {
      global.XMLHttpRequest = jest.fn(() => fakeXhr);
      sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
      expect(fakeXhr.open).toHaveBeenCalledWith('post', fakeUrl);
    });

    it('should call the send function with the given data', () => {
      global.XMLHttpRequest = jest.fn(() => fakeXhr);
      sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
      expect(fakeXhr.send).toHaveBeenCalledWith(fakeFormData);
    });

    it('should call the setRequestHeader function to send form data', () => {
      global.XMLHttpRequest = jest.fn(() => fakeXhr);
      sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
      expect(fakeXhr.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/x-www-form-urlencoded');
    });

    it('should call addEventListener function ready to receive data', (done) => {
      fakeXhr.addEventListener = (event, cb) => {
        expect(event).toEqual('load');
        expect(typeof cb).toEqual('function');
        done();
      };
      global.XMLHttpRequest = jest.fn(() => fakeXhr);
      sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
    });

    it('should expect a json response', () => {
      global.XMLHttpRequest = jest.fn(() => fakeXhr);
      sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
      expect(fakeXhr.responseType).toEqual('json');
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
          expect(fakeCallback).toHaveBeenCalledWith({
            authenticated: true,
            token: jsonResponse.token,
            message: jsonResponse.message,
          });
          done();
        };
        global.XMLHttpRequest = jest.fn(() => fakeXhr);
        sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
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
          expect(fakeCallback).toHaveBeenCalledWith({
            authenticated: true,
            token: jsonResponse.token,
            message: jsonResponse.message,
          });
          done();
        };
        global.XMLHttpRequest = jest.fn(() => fakeXhr);
        sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
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
          expect(fakeCallback).toHaveBeenCalledWith({ errors });
          done();
        };
        global.XMLHttpRequest = jest.fn(() => fakeXhr);
        sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
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
          expect(fakeCallback).toHaveBeenCalledWith({ errors });
          done();
        };
        global.XMLHttpRequest = jest.fn(() => fakeXhr);
        sendXhr({ data: fakeFormData, url: fakeUrl }, fakeCallback);
      });
    });
  });
});
