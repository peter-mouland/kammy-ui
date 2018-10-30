/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');
const path = require('path');

const commonConfig = require('./webpack.common');

const ROOT = path.join(process.cwd());
const PACKAGES = path.join(ROOT, 'packages');

const CATEGORIES = ['components', 'global', 'helpers', 'pages', 'redux', 'server'];

function getPackages(category) {
  const srcPath = path.join(PACKAGES, category);
  return fs.readdirSync(srcPath)
    .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory())
    .map((packageName) => ({ packageName, category }));
}

function getPackagesJson({ packageName, category }) {
  try {
    return require(`./packages/${category}/${packageName}/package.json`);
  } catch (e) {
    return {};
  }
}

function getPackage({ packageName, category }) {
  const pkg = getPackagesJson({ packageName, category });
  return pkg.src || pkg.main;
}

function getPackageInfo({ packageName, category }) {
  const { main, src, version } = getPackagesJson({ packageName, category });
  const file = src || main;
  const fileName = file.replace('src', '').replace(/\.jsx?/, '');
  const name = `${category}/${packageName}/dist${fileName}.min`;
  const entry = { [name]: `${PACKAGES}/${category}/${packageName}/${file}` };
  return {
    entry, packageName, file, category, version, context: PACKAGES,
  };
}

const entries = CATEGORIES
  .reduce((prev, category) => prev.concat(getPackages(category)), [])
  .filter(getPackage)
  .map(getPackageInfo);


module.exports = commonConfig(entries);
