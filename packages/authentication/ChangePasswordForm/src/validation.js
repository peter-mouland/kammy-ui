export const text = {
  errors: {
    email: 'Please provide a correct email address.',
    password: 'Password must have at least 8 characters.',
    message: 'Check the form for errors.',
  },
};

export function validateUpdatePassword(payload) {
  const errors = {};
  let isFormValid = true;

  if (!payload || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = text.errors.password;
  }

  const message = (!isFormValid) ? text.errors.message : '';

  return {
    success: isFormValid,
    message,
    errors,
  };
}
