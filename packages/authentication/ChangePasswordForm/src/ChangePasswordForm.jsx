import React from 'react';
import PropTypes from 'prop-types';

import './change-password-form.scss';
import { validateUpdatePassword } from './validation';

class ChangePasswordPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
    };
  }

  inputs = {};

  processForm = (event) => {
    event.preventDefault();
    const { auth } = this.context;
    const validationResponse = validateUpdatePassword({ password: this.inputs.password.value });

    if (!validationResponse.success) {
      this.setState({ errors: validationResponse.errors });
    } else {
      auth.updatePassword('/auth/updatePassword', this.inputs.password.value, (errors) => {
        const { location } = this.props;
        if (errors) {
          this.setState({ errors });
        } else if (location && location.state && location.state.from) {
          this.setState({ redirectToReferrer: location.state.from });
        } else {
          this.setState({ redirectToReferrer: '/', message: 'You have now updated your password' });
        }
      });
    }
  }

  render() {
    const { errors, message } = this.state;
    return (
      <form action="/nojs-save-password" onSubmit={this.processForm} method="post" className="form">
        <div className="bg"/>
        <fieldset>
          <legend>Update Your Password</legend>
          {errors.summary && <p className="form__error">{errors.summary}</p>}
          {message && <p className="form__success">{message}</p>}
          <p className="form__text">You are required to change your password.</p>
          <p className="form__text">Please ensure your new password has at least 8 characters.</p>
          <div className="field-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              ref={(input) => { this.inputs.password = input; }}
              defaultValue={''}
            />
            <label htmlFor="password" className="animated-label">New Password</label>
            <span className="separator"> </span>
            <p className="field__error">{errors.password}</p>
          </div>
          <div className="field form__bottom">
            <input type="submit" className="form__action" value="Update Password"/>
          </div>
        </fieldset>
      </form>
    );
  }
}

ChangePasswordPage.propTypes = {
  location: PropTypes.object,
};

ChangePasswordPage.contextTypes = {
  auth: PropTypes.object,
};

export default ChangePasswordPage;
