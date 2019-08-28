const cache = {};

export function setCache(key, value) {
  cache[key] = value;
}

export function getCache(key) {
  return key ? cache[key] : cache;
}

export function resetCache(key) {
  delete cache[key];
}
