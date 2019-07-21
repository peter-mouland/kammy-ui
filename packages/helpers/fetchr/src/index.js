import { getLocalUrl } from './localUrl';

function queryParams(params) {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export function checkStatus(response) {
  if (response.status < 200 || response.status >= 500) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data, options = {}) => ({
  port: options.port,
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: data && JSON.stringify(data),
});

const graphQLOpts = (query, variables, opts) => ({
  ...opts,
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/graphql',
    credentials: 'same-origin',
  },
  body: JSON.stringify({ query, variables }),
});

export const fetchUrl = (endpoint, opts = {}) => {
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

const parseJson = (url, json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.info(url);
    console.error(e);
    return {};
  }
};

export const getJSON = (url, options) => fetchUrl(url, jsonOpts('GET', null, options)).then((response) => parseJson(url, response));

export const postJSON = (url, data, options) => fetchUrl(url, jsonOpts('POST', data, options));

export const fetchGraphQL = (data, variables, opts) => fetchUrl('/graphql', graphQLOpts(data, variables, opts)).then((response) => parseJson(data, response));

export const fetchSpreadsheet = (doc, worksheet, opts) => getJSON(`/google-spreadsheet/${doc}/${worksheet}`, opts);

export const fetchSkySports = (url, options) => getJSON(`/skysports/${url}`, options);
