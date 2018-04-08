import Cookies from 'universal-cookie';
import Auth from './Auth';

export default function initAuthMiddleware({ cookieToken }) {
  return (ctx, next) => {
    ctx.request.universalCookies = new Cookies(
      ctx.request.headers.cookie || '',
      {
        onSet(name, value, options) {
          ctx.cookies.set(name, value, options);
        },
        onRemove(name) {
          ctx.cookies.set(name, null);
        },
      },
    );

    ctx.auth = new Auth({ cookieToken, ctx });
    return next();
  };
}
