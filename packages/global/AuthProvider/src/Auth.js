import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

export function sendXhr({ data, url }, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const { response } = xhr;
    // JSON.parse needed for ie11.
    const jsonResponse = (typeof response === 'string') ? JSON.parse(response) : response;
    if (xhr.status === 200) {
      cb({ authenticated: true, token: jsonResponse.token, message: jsonResponse.message });
    } else {
      cb({ errors: jsonResponse.errors });
    }
  });
  xhr.send(data);
}

class Auth {
  constructor({ cookieToken, ctx }) {
    const cookie = new Cookies(ctx ? ctx.request.universalCookies : null);
    this.ctx = ctx;
    this.cookie = cookie;
    this.cookieToken = cookieToken;
    this.subscriptions = [];
    return this;
  }

  subscribe(func) {
    this.subscriptions.push(func);
  }

  responseCallback(res, cb) {
    if (res.authenticated && res.token) { // prevent undefined getting saved
      this.saveToken(res.token);
      if (cb) cb(false, { message: res.message });
      this.onChange(true);
    } else {
      if (cb) cb(res.errors);
      this.onChange(false);
    }
  }

  onChange() {
    this.subscriptions.forEach((func) => func());
  }

  saveToken(token) {
    if (this.ctx) {
      this.ctx.session.authorization = `Bearer ${token}`;
    }
    this.cookie.set(this.cookieToken, token, { path: '/' });
  }

  validateToken() {
    if (!this.getToken()) return false; // do this first to stop ie11 breaking
    try {
      return jwtDecode(this.getToken());
    } catch (e) {
      this.removeToken();
      return false;
    }
  }

  removeToken() {
    if (this.ctx && this.ctx.session) {
      this.ctx.session.authorization = false;
    }
    this.cookie.remove(this.cookieToken, { path: '/' });
  }

  getToken() {
    const authHeader = this.ctx && this.ctx.session && this.ctx.session.authorization;
    return authHeader
      ? authHeader.split(' ')[1]
      : this.cookie.get(this.cookieToken, { path: '/' });
  }

  isAdmin() {
    const token = this.getToken();
    const decodedToken = token ? jwtDecode(token) : { isAdmin: false };
    return decodedToken.isAdmin;
  }

  user() {
    const token = this.getToken();
    return token ? jwtDecode(token) : { loggedIn: false };
  }

  login(url, user, cb) {
    if (this.getToken()) {
      if (cb) cb();
      this.onChange(true);
      return;
    }
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const data = `email=${email}&password=${password}`;
    sendXhr({ data, url }, (res) => this.responseCallback(res, cb));
  }

  updatePassword(url, password, cb) {
    const user = {
      ...this.user(),
      password,
    };
    const email = encodeURIComponent(user.email);
    const passwordEncoded = encodeURIComponent(user.password);
    const data = `email=${email}&password=${passwordEncoded}`;
    sendXhr({ data, url }, (res) => this.responseCallback(res, cb));
  }

  signUp(url, user, cb) {
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const data = `email=${email}&password=${password}`;
    sendXhr({ data, url }, (res) => this.responseCallback(res, cb));
  }

  logout(cb) {
    this.removeToken();
    if (cb) cb();
    this.onChange(false);
  }
}

export default Auth;
