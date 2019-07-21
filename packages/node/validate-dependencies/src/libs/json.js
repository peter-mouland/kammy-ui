const fs = require('fs');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

const formatJSON = (content) => `${JSON.stringify(content, null, 2)}
`;

/**
 * Function to read a JSON file
 * @return {Buffer | string}
 */
function readFile(file) {
  return { file, content: require(file) }; // eslint-disable-line import/no-dynamic-require, global-require
}

/**
 * Function to write a JSON file
 * @param file
 * @param content
 */
function writeFile(file, content) {
  fs.writeFileSync(file, formatJSON(content));
}

function writeFileAsync(file, content) {
  writeFilePromise(file, formatJSON(content));
}

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.writeFileAsync = writeFileAsync;
