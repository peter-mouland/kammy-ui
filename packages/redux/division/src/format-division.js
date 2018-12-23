const upperfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const formatDivision = (division) => division.split('-').map(upperfirst).join('');

export default formatDivision;
