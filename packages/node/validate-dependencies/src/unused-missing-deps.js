/* eslint-disable no-console */
/**
 * Loops through all package.json files and updates dependencies to match current lerna ls versions
 */
const path = require('path');
const depcheck = require('depcheck');

const listPackages = require('./libs/list-packages');

const packages = listPackages().filter((file) => file !== `${process.cwd()}/package.json`);

// filter function to exclude certain files form the missing deps check
const excludeFiles = (file) => !file.endsWith('.test.js') && !file.endsWith('.stories.js');

const depsCheckOptions = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignoreDirs: [
    // folder with these names will be ignored
    'dist',
    'tests',
    'test-resources',
    'cypress',
    'storybook',
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    '@redux/cs-provider',
    'enzyme',
    '@svgr/webpack',
    '*webpack*',
    '*-loader',
    'grunt-*',
    'request',
    'final-form',
    '@storybook/*',
    '@babel/runtime',
    '@clearscore/config.assemble',
    '@clearscore/fabric',
    '@clearscore/webapp.vendor',
    '@clearscore/partner.vendor',
    '@clearscore/nova.vendor',
    'aws-sdk',
  ],
  parsers: {
    // the target parsers
    '*.js': depcheck.parser.jsx,
    '*.jsx': depcheck.parser.jsx,
  },
  detectors: [
    // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration,
  ],
  specials: [
    // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack,
  ],
};

const checkDeps = async () => {
  const depsCheckPromises = packages.map(
    (filePath) => new Promise((resolve) => depcheck(filePath.replace('/package.json', ''), depsCheckOptions, (unused) => resolve({ unused, filePath }),
    ),
    ),
  );
  const depsCheckResults = await Promise.all(depsCheckPromises);
  const invalidDeps = depsCheckResults.filter(({ filePath, unused }) => {
    const missing = Object.keys(unused.missing).reduce((prev, dep) => {
      // exclude test files from missing deps search
      const nonTestFiles = unused.missing[dep].filter(excludeFiles);
      return [...prev, nonTestFiles.length ? dep : null].filter(Boolean);
    }, []);
    const valid = unused.dependencies.length === 0 && unused.devDependencies.length === 0 && missing.length === 0;
    const packageDir = filePath.replace(path.resolve(__dirname, '..', '..'), '');
    if (Object.keys(unused.invalidFiles).length) {
      console.log('INVALID: ', packageDir);
      console.log(unused.invalidFiles);
    }
    if (unused.dependencies.length) {
      console.log(`Unused dependencies:  ${packageDir}`);
      console.log(unused.dependencies);
    }
    if (unused.devDependencies.length) {
      console.log(`Unused devDependencies:  ${packageDir}`);
      console.log(unused.devDependencies);
    }
    if (missing.length) {
      console.log(`missing dependencies:  ${packageDir}`);
      console.log(missing);
    }
    // console.log('invalidDirs'); // an array containing the unused dependencies
    // console.log(unused.invalidDirs); // directories that cannot access
    return !valid;
  });
  return invalidDeps;
};

module.exports = checkDeps;
