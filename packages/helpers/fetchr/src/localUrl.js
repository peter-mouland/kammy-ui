const navigator = global.navigator && global.navigator.userAgent;

// hasWindow = true for tests + client
export const hasWindow = typeof window !== 'undefined';

// isBrowser = true for client only
export const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('jsdom/') === -1 && navigator.indexOf('Node.js') === -1;

export const getLocalUrl = (port) => {
  if (isBrowser) {
    const { location } = window;
    return location.origin;
  }
  return `http://localhost:${port}`;
};
