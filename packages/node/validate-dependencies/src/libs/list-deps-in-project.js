const path = require('path');

const listPackages = require('./list-packages');
const { readFile } = require('./json');

const project = process.cwd();
const packages = listPackages({ dir: path.resolve(project) }).map(readFile);

const getInternalDeps = () => packages.reduce((prev, { content }) => ({
  ...prev,
  [content.name]: project,
}));

module.exports = () => packages.reduce((prev, { content }) => {
  const deps = {
    ...(content.devDependencies || {}),
    ...(content.dependencies || {}),
    ...(content.peerDependencies || {}),
  };
  const internalDeps = getInternalDeps();
  const depsWithCount = Object.keys(deps).reduce(
    (prevDepWithCount, dep) => ({
      ...prevDepWithCount,
      [dep]: {
        count: prev[dep] ? prev[dep].count + 1 : 1,
        isInternal: !!internalDeps[dep],
        version: deps[dep],
      },
    }),
    {},
  );
  return { ...prev, ...depsWithCount };
}, {});
