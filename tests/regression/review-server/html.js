const head = require('./head');
const body = require('./body');
const foot = require('./foot');

const showWarning = (images) => {
  if (images.length > 0) return '';
  return (
    `<div class="row expanded"><p class="columns small-12">
        There seem to be no new images to compare. Please run '<code>npm run regression:compare</code>'
    </p></div>`
  );
};

module.exports = ({ images }) => {
  return `${head}
  <body>
    ${showWarning(images)}
    ${images.map(body).join('')}
    ${foot}
  </body>
  `;
};
