const realFetch = require('node-fetch'); // eslint-disable-line global-require

if (global && !global.fetch) {
  global.fetch = realFetch;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}


function checkStatus(response) {
  if (response.status < 200 || response.status >= 500) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: data && JSON.stringify(data),
});

const fetchUrl = (url, opts = {}) => {
  return fetch(url, { ...opts })
    .then(checkStatus)
    .then((response) => response.text())
    .catch((error) => {
      throw new Error(`request failed ${error}`);
    });
};

const getJSON = (url, options) =>
  fetchUrl(url, jsonOpts('GET', null, options)).then((data) => JSON.parse(data));

const postJSON = (url, data, options) =>
  fetchUrl(url, jsonOpts('POST', data, options));

module.exports = {
  getJSON, postJSON
};
