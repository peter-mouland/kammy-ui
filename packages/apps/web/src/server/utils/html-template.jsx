/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const HTML = ({
  initialState, js, css, body,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    </head>
    <body>
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${initialState}` }}/>
      <div id="stylesheets" dangerouslySetInnerHTML={{ __html: css }} />
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
};

export default HTML;
