const lowerfirst = (string) => string.charAt(0).toLowerCase() + string.slice(1);
const upperfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const formatDivision = (division) => lowerfirst(division.split('-').map(upperfirst).join(''));

export default formatDivision;
