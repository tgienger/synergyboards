/**
* Using Rails-like standard naming convention for endpoints.
* GET     /things              ->  index
* POST    /things              ->  create
* GET     /things/:id          ->  show
* PUT     /things/:id          ->  update
* DELETE  /things/:id          ->  destroy
*/

'use strict';

var _ = require('lodash');

var db = require('../../config/mysql');

// Get list of users
exports.index = function(req, res) {
  db.query('SELECT uid, username, email, avatar FROM mybb_users', function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};

// Get individual user by id
exports.userId = function(req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM mybb_users WHERE uid = ?', [id], function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};

// Search by username
exports.userName = function (req, res) {
  var username = req.params.username;
  db.query('SELECT * FROM mybb_users WHERE username LIKE ?', ["%"+username+"%"], function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};
