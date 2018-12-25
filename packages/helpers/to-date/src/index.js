import parse from 'date-fns/parse';

export default (string = '') => {
  if (!string) return string;
  return parse(string);
};
