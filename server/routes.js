/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');


module.exports = function(app) {


  // Authentication Check
  var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    }
    else {
      next();
    }
  };



  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/boards', require('./api/boards'));
  app.use('/api/users', require('./api/user'));



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
