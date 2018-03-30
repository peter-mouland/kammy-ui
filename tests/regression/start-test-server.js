#!/usr/bin/env node
const express = require('express');
const path = require('path');

const regressionSetup = require('./setup');

const envIndex = process.argv.findIndex(item => item==='--env');
let server;

const startAppServer = () => new Promise((resolve) => {
  console.log('starting app server...')
  const app = express();
  const router = express.Router();
  app.use(express.static(path.join(process.cwd(), 'public')));

  // add storybook middle ware used for fixtures
  const middleware = require('../../.storybook/middleware');
  middleware(router);

  app.use(router);
  server = app.listen(3210);
  resolve()
});

const stopAppServer = () => new Promise((resolve) => {
  console.log('stopping app server...')
  server.close();
  resolve();
});

if (envIndex < 0) {
  startAppServer().then(() => {
    console.log('app server started on http://local.argos.co.uk:3210...')
  })
} else {
  regressionSetup({ setup: startAppServer, tearDown: stopAppServer })
    .catch(e => { console.log('Regression Error'); console.log(e) });
}
