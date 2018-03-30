const tick = require('./tick');

const containerP = '<div class="row expanded"><p class="matched columns small-12">';
const endCntainerP = '</p></div>';

const showImage = ({ href, src, className }) => {
  return src
    ? `<a href="${href}" target="_blank" class="${className}"><img src="${src}" alt=""></a>`
    : 'no image to compare';
};

const showButton = ({ label, src, type }) => {
  return src
    ? `<button class="button large hollow expanded" data-image="${type}">${label}</button>`
    : '';
};

const showComparisons = image => (`
    <div class="row expanded choices" data-file="${image.fileName}">
      <h3 class="columns small-12">${image.fileName}</h3>
      <div class="columns small-3 image-container image-container--base">
          <div style="text-align:left;" class="image-label image-label--base">Base image </div>
          ${showImage({ href: `/screenshots/base/${image.fileName}`, src: image.baseImg, className: 'base-image' })}
      </div>
      <div class="columns small-6 overlay-container">
          <div style="text-align:center;">Delta image</div>
          ${showImage({ href: image.diffImg, src: image.diffImg, className: 'delta-image' })}
          <div>
            <a style="text-align:center; display: inline-block; width:49%;" data-overlay>
               View Overlay >
            </a>
            <a style="text-align:center; display: inline-block; width:49%;" data-delta>
               View Delta >
            </a>
          </div>
             <div class="overlay-block">
                <img src="${image.newImg}" alt="" class="overlay-base">
                <div class="overlay-compare">
                    <img src="${image.baseImg}" alt="" >
                </div>
              <span class="overlay-handle"></span>
             </div>
      </div>
      <div class="columns small-3 image-container image-container--new">
          <div style="text-align:right;" class="image-label image-label--new">New image</div>
          ${showImage({ href: `/screenshots/new/${image.fileName}`, src: image.newImg, className: 'new-image' })}
          ${showButton({ label: 'Accept new screenshot', src: image.newImg, type: 'new' })}
          ${tick}
      </div>
    </div>
`);

const body = (image) => {
  return (image.baseImg && image.newImg && !image.diffImg)
    ? `${containerP}<strong>${image.fileName}</strong> matched! ${tick}${endCntainerP}`
    : showComparisons(image);
};

module.exports = body;
