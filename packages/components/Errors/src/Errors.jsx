import React from 'react';
import bemHelper from '@kammy/bem';

const bem = bemHelper({ name: 'message' });
const Error = ({ error }) => <p>{ error.message }</p>;

export default ({ errors, small = false }) => (
  <div { ...bem(null, { error: true, small }) }>
    <p>Error!</p>
    {errors.map((error, i) => <Error error={error} key={i} />)}
  </div>
);
