const rootPath = (asset) => (asset.charAt(0) === '/' ? asset : `/${asset}`);

function mapWebpackAssets(assetsObj) {
  const assets = { js: [], css: [] };
  Object.keys(assetsObj)
    .filter((key) => !!key) // no key means dynamic import
    .forEach((key) => {
      const { js, css } = assetsObj[key];
      if (js && key.indexOf('polyfills') > -1) {
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
        assets.js.unshift(`<script src="${rootPath(js)}"></script>`);
      } else if (js && key) { // empty keys are promised imports
        assets.js.push(`<script src="${rootPath(js)}"></script>`);
      }
      if (css) assets.css.push(`<link href="${rootPath(css)}" rel="stylesheet" />`);
    });
  return assets;
}


exports = module.exports = function reactAssets({ assetsConfig }) { // eslint-disable-line no-multi-assign
  const assets = mapWebpackAssets(assetsConfig);
  return {
    js: assets.js.join(''),
    css: assets.css.join(''),
  };
};
