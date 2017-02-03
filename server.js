const express = require('express')
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60
});

app.prepare()
  .then(() => {
    const server = express()

    server.get('/file/:fileName', (req, res) => {
      const queryParams = { fileName: req.params.fileName }
      renderAndCache(req, res, '/file', queryParams) 
    })
    
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (error) => {
      if(error) throw error
      console.log('> Ready on http://localhost:3000')
    })
  
});

function renderAndCache(req, res, pagePath, queryParams) {
  if(ssrCache.has(req.url)) {
    console.log(`CACHE HIT: ${req.url}`);
    res.send(ssrCache.get(req.url))
    return
  }

  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      console.log(`CACHE MISS: ${req.url}`);
      ssrCache.set(req.url, html)
      res.send(html);
    })
    .catch((error) => {
      app.renderError(error, req, res, pagePath, queryParams)
    });
}
