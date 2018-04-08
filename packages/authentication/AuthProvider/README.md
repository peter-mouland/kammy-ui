# AuthProvider

One-stop-shop for any 'auth-related' functions

`yarn add @kammy/auth-provider`

## React <AuthProvider>

This will initiate the `auth` class and give you access to it's functions on React Context. 

```jsx
import { AuthProvider } from '@kammy/auth-provider';

//clientside
<AuthProvider cookieToken='my-token'>
...
</AuthProvider>
```

This will initiate the `auth` class and give you access to it's functions on Koa's `ctx`. 

```jsx
//serverside
<AuthProvider cookieToken='my-token' ctx={ctx}>
...
</AuthProvider>

```

# Koa Auth Middleware

This middleware is to rendering of 'private routes' on the server.

It uses 'universal-cookie' to ensure a cookies on the client can be read by the server.

It put's an instance of the `auth` class on to Koa `ctx` object.  

```jsx
import authMiddleware from '@kammy/koa-auth-middleware';

server.use(authMiddleware({ cookieToken: 'my-token' }));

```
