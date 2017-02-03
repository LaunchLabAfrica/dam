const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

routes.add('file', 'file/:slug', 'index');

