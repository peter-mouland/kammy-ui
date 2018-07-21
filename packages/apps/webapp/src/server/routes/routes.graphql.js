import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import graphQL from '@kammy-ui/graphql';
import handleError from '@kammy-ui/koa-middleware-handler-error';

export default () => {
  const router = Router({ prefix: '/graphql' });

  router.use(handleError());
  router.use(bodyparser({
    enableTypes: ['text'],
    extendTypes: {
      text: ['application/graphql'], // will parse application/x-javascript type body as a JSON string
    },
  }));

  router.get('/', (ctx) => {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.response.body = { status: 'healthy' };
  });

  router.post('/', async (ctx) => {
    const { request } = ctx;
    const { query, variables } = JSON.parse(request.body);

    console.log(`Fetching ${query}`);

    await graphQL({ query, variables })
      .then((result) => {
        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = result;

        if (result.errors) {
          ctx.status = 500;
          ctx.body = result.errors;
        }
      })
      .catch((error) => {
        console.log(error);
        ctx.status = 500;
        ctx.type = 'json';
        ctx.body = error;
      });
  });
  return router;
};
