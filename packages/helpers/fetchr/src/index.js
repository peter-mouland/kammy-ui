const { getLocalUrl } = require('./localUrl');

function queryParams(params) {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
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

const graphQLOpts = (data, params) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/graphql',
    credentials: 'same-origin',
  },
  body: data,
  params,
});

const fetchUrl = (endpoint, opts = {}) => {
  let url = endpoint.indexOf('//') > -1 ? endpoint : `${getLocalUrl(opts.port)}${endpoint}`;

  if (opts.params) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(opts.params);
  }

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

const fetchGraphQL = (data, variables) =>
  fetchUrl('/graphql', graphQLOpts(data, variables)).then((response) => JSON.parse(response));

module.exports = {
  checkStatus,
  fetchUrl,
  getJSON,
  postJSON,
  fetchGraphQL,
};
