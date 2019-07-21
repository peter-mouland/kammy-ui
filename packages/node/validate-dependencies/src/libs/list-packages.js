/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

function walkSync({
  dir, fileList = [], file, excludeDir,
}) {
  fs.readdirSync(dir)
    .filter((foundFile) => {
      const foundPath = path.join(dir, foundFile);
      return fs.lstatSync(foundPath).isDirectory()
        ? !excludeDir.reduce((prev, curr) => prev || foundPath.includes(curr), false)
        : foundFile.includes(file);
    })
    .forEach((foundFile) => {
      const dirFile = path.join(dir, foundFile);
      try {
        fileList = walkSync({
          dir: dirFile, fileList, file, excludeDir,
        });
      } catch (err) {
        if (err.code === 'ENOTDIR' || err.code === 'EBUSY') {
          fileList = [...fileList, dirFile];
        } else {
          throw err;
        }
      }
    });
  return fileList;
}

const defaultExcluded = ['.boilerplate', '.idea', '.storybook', '.git', '.ds_store', 'node_modules'];

function listPackages({ file = 'package.json', dir = process.cwd(), excludeDir = [] } = {}) {
  return walkSync({ file, dir, excludeDir: [...defaultExcluded, ...excludeDir] });
}

module.exports = listPackages;
