const jwt = require('jsonwebtoken');

module.exports = (router) => {

  router.use('/auth/login', (req, res) => {
    const payload = {
      sub: 'sub',
      email: 'email',
      isAdmin: true,
      mustChangePassword: false,
      loggedIn: true,
      name: 'name'
    };

    // create a token string
    const token = jwt.sign(payload, 'demo-secret');
    res.json({ token });
  });

  router.use('/auth/updatePassword', (req, res) => {
    const payload = {
      sub: 'sub',
      email: 'email',
      isAdmin: true,
      mustChangePassword: false,
      loggedIn: true,
      name: 'name'
    };

    // create a token string
    const token = jwt.sign(payload, 'demo-secret');
    res.json({ token });
  });
};
