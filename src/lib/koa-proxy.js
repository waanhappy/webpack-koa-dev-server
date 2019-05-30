const Router = require('koa-router');
const httpProxy = require('http-proxy');

function koaProxy(options) {
  // use router to match path(s)
  const router = new Router();
  if (options) {
    if (Array.isArray(options)) {
      options.forEach(proxyConfig => setProxy(router, proxyConfig));
    } else {
      Object.keys(options).forEach(path => setProxy(router, Object.assign({ path }, options[path])));
    }
  }
  return router;
}

function setProxy(koaRouter, proxyConfig) {
  const { path, onProxyReq, onProxyRes, ...createProxy } = proxyConfig;
  const proxyInstance = httpProxy.createProxy(createProxy);

  if (onProxyReq) {
    proxyInstance.on('proxyReq', onProxyReq);
  }

  if (onProxyRes) {
    proxyInstance.on('proxyReqWs', onProxyRes);
  }

  koaRouter.all(path, (ctx) => {
    // To bypass Koa's built-in response handling, you may explicitly set ctx.respond = false;. Use this if you want to write to the raw res object instead of letting Koa handle the response for you.

    ctx.respond = false;
    const req = ctx.req;
    const koaReq = ctx.request;
    req.body = koaReq.rawBody;
    proxyInstance.web(req, ctx.res);
  });
}

module.exports = koaProxy;
