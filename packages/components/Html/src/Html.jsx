/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const HTML = ({
  initialState, body, js, css, links,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <div id="links" dangerouslySetInnerHTML={{ __html: links }} />
      <div id="stylesheets" dangerouslySetInnerHTML={{ __html: css }} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-144222833-1" />
      <script dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-144222833-1');
      `,
      }} />
    </head>
    <body>
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${initialState}` }}/>
      <div id="html" dangerouslySetInnerHTML={{ __html: body }} />
      <div id="scripts" dangerouslySetInnerHTML={{ __html: js }} />
    </body>
  </html>
);

HTML.propTypes = {
  initialState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  body: PropTypes.string.isRequired,
  js: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
};

export default HTML;
