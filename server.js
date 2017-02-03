// const express = require('express')
// const next = require('next')
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({dev});
// const routes = require('./routes');
//
// app.prepare().then(() => {
//   const server = express()
//     .use(routes.getRequestHandler(app))
//     .listen(3000);
// });
//

const  { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route('/file/:fileName');

app.prepare()
  .then(()=> {
    createServer((req, res) => {
      const { pathname } = parse(req.url);
      const params = match(pathname);
      if (params === false) {
        handle(req, res);
        return;
      }
      app.render(req, res, '/file', params)
    })
    .listen(3000, (error) => {
      if (error) throw error;
      console.log('> Ready on http://localhost:3000');
    })
  
});


