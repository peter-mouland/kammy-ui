import React from 'react';

export const keysAsCells = (obj) => (
  Object.keys(obj).map((key) => <td key={key}>{obj[key]}</td>)
);
export const keysAsCellHeaders = (obj) => (
  Object.keys(obj).map((key) => <th key={key}>{key}</th>)
);
