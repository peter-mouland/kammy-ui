import { configure, addDecorator } from '@storybook/react';
import {setOptions} from '@storybook/addon-options';
import {setDefaults} from '@storybook/addon-info';
import React from 'react';

require('./reset.css');

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


setOptions({
  name: 'Kammy UI',
  url: 'https://github.com/peter-mouland/kammy-ui',
  downPanelInRight: false
});

addDecorator((story) => {
  addBrowserClassToDocument();
    return (
        <div style={{fontFamily: 'AktivGrotesk'}}>
            {story()}
        </div>
    )
});

setDefaults({
    header: true,
    inline: false,
    source: true
});

const req = require.context(
  '../packages',   // path where stories live
  true,            // recursive?
  /^((?!node_modules).)*\.story.jsx$/   // story files excluding node_modules
);

function loadStories () {
  // require('./index.story.jsx');
  req.keys().forEach((module) => {
    req(module)
  })
}

configure(loadStories, module);
