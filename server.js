require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const next = require('next');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.DEVELOPMENT || false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(
      helmet.contentSecurityPolicy({
        directives: {
          'default-src': [
            "'self'",
            "'unsafe-inline'",
            '*.filestackapi.com',
            '*.filestackcontent.com',
            '*.amazonaws.com',
            'data:',
            'blob:',
          ],
          'img-src': ['*', 'data:', 'blob:'],
          'connect-src': [
            "'self'",
            'api.8base.com',
            'sentry.io',
            '*.8base.com',
            '*.filestackapi.com',
            '*.filestackcontent.com',
            '*.amazonaws.com',
            'blob:',
          ],
          // 'style-src-elem': [
          //   "'self'",
          //   "'unsafe-inline'",
          //   '*.filestackapi.com',
          //   '*.filestackcontent.com',
          //   '*.amazonaws.com',
          //   'fonts.googleapis.com',
          // ],
          'style-src': [
            "'self'",
            "'unsafe-inline'",
            '*.filestackapi.com',
            '*.filestackcontent.com',
            '*.amazonaws.com',
            'fonts.googleapis.com',
          ],
          'font-src': ["'self'", 'fonts.gstatic.com'],
        },
      }),
    );

    // Cache the following:
    // - All assets in the public folder
    // - All icons in the static folder
    // - The favicon.
    // - The site.webmanifest
    server.get(
      ['/assets/*', '/static/icons/*', '/favicon.ico', '/site.webmanifest'],
      (req, res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        return handle(req, res);
      },
    );

    server.all('/api/*', (req, res) => {
      return handle(req, res);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });