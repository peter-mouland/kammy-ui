import { isBrowser } from './localUrl';

if (!isBrowser) {
  const realFetch = require('node-fetch'); // eslint-disable-line global-require

  if (global && !global.fetch) {
    global.fetch = module.exports;
    global.Response = realFetch.Response;
    global.Headers = realFetch.Headers;
    global.Request = realFetch.Request;
  }

  module.exports = (url, options) => {
    const secureUrl = (/^\/\//.test(url))
      ? `https:${url}`
      : url;
    return realFetch.call(this, secureUrl, options);
  };
}

