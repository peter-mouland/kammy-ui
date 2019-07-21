/* eslint-disable no-console */
const checkDeps = require('./unused-missing-deps');
const getMismatch = require('./mismatch-versions');

Promise.all([checkDeps(), getMismatch()]).then(([invalidDeps, invalidVersions]) => {
  if (invalidDeps.length > 0) {
    console.log(`There are ${invalidDeps.length} package(s) with missing or unused dependencies`);
  }
  if (invalidVersions.length > 0) {
    console.log(`There are ${invalidVersions.length} dependencies with mismatched versions`);
  }
  if (invalidDeps.length > 0 || invalidVersions.length > 0) {
    process.exit(1);
  }
});
