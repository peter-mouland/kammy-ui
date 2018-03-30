const fs = require('fs')
const path = require('path')
const ROOT = path.join(process.cwd())
const PACKAGES = path.join(ROOT, 'packages')

function getDirectories (srcPath) {
  return fs.readdirSync(srcPath)
    .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory())
}


const tests = ({ postfix }) => getDirectories(PACKAGES)
  .map((packageName) => {
    const component = `${PACKAGES}/${packageName}/src/${packageName}.${postfix}.js`
    try {
      return require(component)
    } catch (e) {
      return null
    }
  })
  .filter((entry) => entry)
  .reduce((prev, curr) => Object.assign(prev, curr), {});

const Shutdown = {
  after (browser, done) {
    browser.end().perform(() => done())
  },
}

module.exports = (postfix) => {
  return Object.assign({ }, tests({ postfix }), Shutdown);
}
