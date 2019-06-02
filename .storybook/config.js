import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';

// require("babel-polyfill");

function addBrowserClassToDocument () {
  var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
  }
  if(M[1]==='Chrome'){
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if(tem!==null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=(ua.match(/version\/(\d+)/i))!==null)) M.splice(1, 1, tem[1]);
  document.documentElement.setAttribute('class', M[0].toLowerCase() + ' ' + M.join('-').toLowerCase())
}

addDecorator((story) => {
  addBrowserClassToDocument();
    return (
        <div>
            {story()}
        </div>
    )
});

// addon-backgrounds
const backgrounds = [
  { name: 'White', value: 'white', default: true },
  { name: 'twitter', value: '#00aced' },
  { name: 'facebook', value: '#3b5998' },
];

// addon-knobs
addDecorator(withKnobs);

addParameters({
  options: {
    theme: create({
      brandTitle: 'Components',
      brandUrl: 'https://github.com/peter-mouland/kammy-ui',
    }),
    sortStoriesByKind: true,
  },
  backgrounds: backgrounds,
});

const req = require.context(
  '../packages',   // path where stories live
  true,            // recursive?
  /^((?!node_modules).)*\.story.jsx$/   // story files excluding node_modules
);

function loadStories () {
  // require('./index.story.jsx');
  req.keys().sort().forEach((module) => {
    req(module)
  })
}

configure(loadStories, module);
