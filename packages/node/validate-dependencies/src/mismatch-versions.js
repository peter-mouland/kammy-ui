/* eslint-disable no-console */
const path = require('path');

const listPackages = require('./libs/list-packages');
const listDepsInProject = require('./libs/list-deps-in-project');
const { readFile } = require('./libs/json');

const project = process.cwd();
const packages = listPackages({ dir: path.resolve(project) }).map(readFile);

const getVersions = (dep) => packages.reduce((prev, { content, file }) => {
  const { [dep]: pack } = {
    ...(content.devDependencies || {}),
    ...(content.dependencies || {}),
    ...(content.peerDependencies || {}),
  };
  return pack
    ? {
      ...prev,
      [pack.replace('^', '')]: [...(prev[pack] || []), file],
    }
    : prev;
}, {});

const deps = listDepsInProject();

const getMismatch = () => {
  const mismatches = Object.keys(deps)
    .map((dep) => {
      const versions = getVersions(dep);
      return Object.keys(versions).length > 1
        ? `There are mixed versions of ${dep}:\n${Object.keys(versions)
          .map((version) => `${version} * ${versions[version].length}`)
          .join('\n')}`
        : undefined;
    })
    .filter(Boolean);
  if (mismatches.length > 0) console.log(mismatches.join('\n'));
  return Promise.resolve(mismatches);
};

module.exports = getMismatch;
