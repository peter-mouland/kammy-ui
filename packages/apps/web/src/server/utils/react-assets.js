function mapWebpackAssets(assetsObj) {
  const assets = { js: [], css: [] };
  Object.keys(assetsObj).forEach((key) => {
    const { js, css } = assetsObj[key];
    if (js && key === 'polyfills') {
      assets.js.unshift(`
        <script>
        // synchronously polyfill stuff needed for the app in old browsers
        if (!window.location.origin || !window.Promise || !Array.prototype.find) {
          let js = document.createElement('script');
          js.src = '${js}'
          document.body.appendChild(js);
        }
        </script>
      `);
    } else if (js && key === 'vendor') {
      assets.js.unshift(`<script src="/${js}"></script>`);
    } else if (js) {
      assets.js.push(`<script src="/${js}"></script>`);
    }
    if (css) assets.css.push(`<link href="/${css}" rel="stylesheet" />`);
  });
  return assets;
}


exports = module.exports = function reactAssets() { // eslint-disable-line no-multi-assign
  const assetsObj = require('../../../dist/webpack-assets.json'); // eslint-disable-line global-require
  const assets = mapWebpackAssets(assetsObj);
  return {
    js: assets.js.join(''),
    css: assets.css.join(''),
  };
};
