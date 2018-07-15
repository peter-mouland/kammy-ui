/* eslint-env jest */
import Chance from 'chance';

import { fetchGraphQL, fetchUrl } from './index';

let stubUrl;
let stubOptions;

const chance = new Chance();

describe('fetch', () => {
  describe(' URL ', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
      global.fetch = mockFetch.mockImplementation((url, options) => {
        stubUrl = url;
        stubOptions = options;
        return Promise.resolve({
          status: 200,
          text: jest.fn(),
        });
      });
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it('should return url with localhost by default', (done) => {
      const endpoint = `/${chance.word()}`;
      fetchUrl(endpoint).then(() => {
        expect(stubUrl).toEqual(`http://localhost:undefined${endpoint}`);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return url with localhost by default using the supplied port', (done) => {
      const endpoint = `/${chance.word()}`;
      const port = chance.integer();
      fetchUrl(endpoint, { port }).then(() => {
        expect(stubUrl).toEqual(`http://localhost:${port}${endpoint}`);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetchUrl(endpoint).then(() => {
        expect(stubUrl).toEqual(endpoint);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      fetchUrl(endpoint, { data }).then(() => {
        expect(stubOptions.data).toEqual(data);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  describe(' graphQL ', () => {
    const mockFetch = jest.fn();
    let mockData;

    beforeEach(() => {
      mockData = `{"data": "${chance.word()}"}`;
      global.fetch = mockFetch.mockImplementation((url, options) => {
        stubUrl = url;
        stubOptions = options;
        return Promise.resolve({
          status: 200,
          text: jest.fn().mockReturnValue(mockData),
        });
      });
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it('should return request options', (done) => {
      const data = chance.sentence();
      fetchGraphQL(data).then(() => {
        expect(stubOptions.method).toEqual('POST');
        expect(stubOptions.headers['Content-Type']).toEqual('application/graphql');
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const data = chance.sentence();
      fetchGraphQL(data).then(() => {
        expect(JSON.parse(stubOptions.body).query).toEqual(data);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return graphQL request options with params', (done) => {
      const data = chance.sentence();
      const variables = chance.sentence();
      fetchGraphQL(data, variables).then(() => {
        expect(JSON.parse(stubOptions.body).variables).toEqual(variables);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});
