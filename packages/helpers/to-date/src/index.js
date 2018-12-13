
export default (string = '') => {
  if (!string) return string;
  const SEPARATOR = '-';
  try {
    const newDateString = String(string).replace(/\//g, SEPARATOR);
    const dateTimeString = newDateString.split(' ').length > 2 ? newDateString : newDateString.replace(/ /g, 'T');
    const dateWithTwoDigits = dateTimeString
      .split(SEPARATOR)
      .map((part) => (part.length === 1 ? `0${part}` : part))
      .join(SEPARATOR);
    if (String(new Date(dateWithTwoDigits)) === 'Invalid Date') {
      throw Error(dateWithTwoDigits);
    }
    return new Date(dateWithTwoDigits); // needed to fix safari
  } catch (e) {
    console.error(e);
    console.log(string);
    return string;
  }
};
