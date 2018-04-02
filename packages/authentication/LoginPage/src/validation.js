// const isEmail = require('validator/lib/isEmail');

export const text = {
  loginForm: {
    errors: {
      email: 'Please provide your email address.',
      password: 'Please provide your password (has at least 8 characters).',
      message: 'Check the form for errors.',
    },
  },
  loginResponse: {
    success: 'You have successfully logged in!',
    error400: 'Could not process the form.',
  },
};


export function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = text.loginForm.errors.email;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = text.loginForm.errors.password;
  }

  const message = (!isFormValid) ? text.loginForm.errors.message : '';

  return {
    success: isFormValid,
    message,
    errors,
  };
}

export function validateLoginResponse(err, token, userData) {
  const res = {
    status: 200,
    body: {
      success: true,
      message: text.loginResponse.success,
      token,
      user: userData,
    },
  };
  if (err) {
    if (err.name === 'IncorrectCredentialsError') {
      res.status = 400;
      res.body = {
        success: false,
        message: err.message,
      };
    } else {
      res.status = 400;
      res.body = {
        success: false,
        message: text.loginResponse.error400,
      };
    }
  }
  return res;
}

