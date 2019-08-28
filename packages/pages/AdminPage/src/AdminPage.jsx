/* eslint-disable react/no-deprecated */
import React from 'react';
import { instanceOf } from 'prop-types';
import NamedLink from '@kammy-ui/named-link';
import '@kammy-ui/bootstrap';
import { withCookies, Cookies } from 'react-cookie';

const AdminPage = ({ cookies }) => {
  cookies.set('is-admin', true, { path: '/' });
  return (
    <section id="admin-page">
      <h1>Admin Homepage</h1>
      <ul>
        <li><NamedLink to="admin-players"/></li>
        <li><NamedLink to="admin-cup" /></li>
        <li><a href="/google-spreadsheet/cache/reset">Reset Spreadsheet Cache</a></li>
      </ul>
    </section>
  );
};

AdminPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};
export default withCookies(AdminPage);
