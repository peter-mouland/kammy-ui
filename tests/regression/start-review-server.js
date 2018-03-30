const opn = require('opn');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const resemble = require('node-resemble');

const html = require('./review-server/html');

const app = express();
app.use('/screenshots', express.static('tests/regression/screenshots'));
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  baselineImageDirectory: `${__dirname}/screenshots/base`,
  newImageDirectory: `${__dirname}/screenshots/new`,
  resemblejsThreshold: 0.01,
  port: 3456,
};
const dataImg = f => `data:image/png;base64,${f}`;

const getImage = (imgPath) => {
  try {
    return fs.readFileSync(imgPath);
  } catch (e) {
    return false;
  }
};

const compareImages = ({ currentImage, baseImg, newImg }) => {
  const results = {
    fileName: currentImage,
    baseImg: baseImg ? dataImg(baseImg.toString('base64')) : false,
    newImg: newImg ? dataImg(newImg.toString('base64')) : false,
  };
  return new Promise((resolve) => {
    if (!baseImg || !newImg) {
      resolve(results);
    } else {
      resemble(newImg)
        .compareTo(baseImg)
        .onComplete((data) => {
          results.diffImg = (Number(data.misMatchPercentage) >= options.resemblejsThreshold)
            ? data.getImageDataUrl()
            : null;
          resolve(results);
        });
    }
  });
};

const compareAllImages = (images) => {
  const promises = Object.keys(images).map((image) => {
    return compareImages({
      currentImage: image,
      baseImg: images[image].baseImg,
      newImg: images[image].newImg,
    });
  });
  return Promise.all(promises);
};

const getImages = () => {
  return new Promise((resolve, reject) => {
    const images = {};
    let newImages;
    try {
      newImages = fs.readdirSync(options.newImageDirectory);
    } catch (e) {
      reject('There seem to be no new images to compare. Please run \'<code>npm run regression</code>\'');
    }
    newImages
      .filter((img => img.indexOf('.delta') === -1)) // ignore saved delta's
      .filter((img => img.indexOf('.') !== 0)) // ignore .ds_store etc
      .forEach((currentImage) => {
        const baseImg = getImage(path.join(options.baselineImageDirectory, currentImage));
        const newImg = getImage(path.join(options.newImageDirectory, currentImage));
        images[currentImage] = { currentImage, newImg, baseImg };
      });
    resolve(images);
  });
};

app.get('/', (req, res) => {
  getImages()
    .then(compareAllImages)
    .then((images) => {
      res.send(html({ images: images.filter(data => data) }));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/choose-image', (req, res) => {
  const { image, file } = req.body;
  const basePath = path.join(options.baselineImageDirectory, file);
  const newPath = path.join(options.newImageDirectory, file);

  if (image === 'new') {
    try {
      fs.mkdirSync(options.baselineImageDirectory);
    } catch (e) {
      // dir already exists
    }
    fs.renameSync(newPath, basePath);
  }
  res.send('done');
});

app.listen(options.port, () => {
  console.log(`Review app running on http://localhost:${options.port}`); // eslint-disable-line no-console
  opn(`http://localhost:${options.port}`);
});
