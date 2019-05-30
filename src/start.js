const fs = require('fs');
const Koa = require('koa');
const open = require('open');
const path = require('path');
const send = require('koa-send');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const koaProxy = require('./lib/koa-proxy');

module.exports = function(config) {

  const webpackDevConfig = config.webpackConfig;
  const devServer = config.devServer;
  const host = devServer.host || 'localhost';
  const port = devServer.port || 3000;
  const origin = `http://${host}:${port}`;

  // webpack
  const compile = webpack([webpackDevConfig]);
  if (devServer.openBrowserOnDev) {
    // 只需要执行一次
    let hasBeenOpened = false;
    // 监听编译完成
    compile.hooks.done.tap('openBrowser', () => {
      if (!hasBeenOpened) {
        open(origin);
        hasBeenOpened = true;
      }
    });
  }

  // use webpack middleware
  const devMiddleware = (compiler, opts) => {
    const middleware = webpackDevMiddleware(compiler, opts);
    return async (ctx, next) => {
      // ctx.respond = false;
      await middleware(
        ctx.req,
        {
          end: (content) => {
            ctx.body = content;
          },
          setHeader: (name, value) => {
            ctx.set(name, value);
          },
        },
        next,
      );
    };
  };

  // api proxy
  if (devServer.proxy) {
    const proxy = koaProxy(devServer.proxy);
    app.use(proxy.routes());
    app.use(proxy.allowedMethods());
  }

  const app = new Koa();

  app.use(
    devMiddleware(compile, {
      publicPath: webpackDevConfig.publicPath,
      logLevel: 'info',
      index: 'index.html',
      logTime: true,
      serverSideRender: true,
      // writeToDisk: true,
    }),
  );

  const root = config.outputPath;

  app.use(async (ctx, next) => {
    if (ctx.method !== 'GET') {
      next();
      return;
    }
    if (ctx.path === '/') {
      await send(ctx, 'index.html', { root });
      return;
    }
    const fileIsExists = await new Promise((resolve) => {
      fs.access(path.resolve(root, ctx.path), fs.constants.R_OK, (err) => {
        resolve(!err);
      });
    });
    if (fileIsExists) {
      await send(ctx, ctx.path, { root });
    } else {
      await send(ctx, 'index.html', { root });
    }
  });

  app.listen(devServer.port);

  console.log(`listen port ${devServer.port}`);
};
