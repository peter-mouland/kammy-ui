import React, { Fragment } from 'react';

export const pairedKeysAsCells = (objA = {}, objB = {}) => (
  Object.keys(objA).map((key) => (
    <Fragment key={key}>
      <td className={`cell cell--${key}`}>{objA[key]}</td>
      <td className={`cell cell--pair cell--${key}`}>{objB[key]}</td>
    </Fragment>
  ))
);

export const keysAsCells = (obj = {}) => (
  Object.keys(obj).map((key) => <td key={key} className={`cell cell--${key}`}>{obj[key]}</td>)
);

export const keysAsCellHeaders = (obj = {}, attrs = {}) => (
  Object.keys(obj).map((key) => <th key={key} className={`cell cell--${key}`} { ...attrs}>{key}</th>)
);
