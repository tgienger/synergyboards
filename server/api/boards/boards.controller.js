'use strict';

var _ = require('lodash');
var db = require('../../config/mysql');
var bbcode = require('bbcode');


// Get list of boardss
exports.index = function(req, res) {
  db.query('SELECT * FROM mybb_forums', function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};


exports.threads = function(req, res) {
  db.query('SELECT * FROM mybb_threads', function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};


exports.id = function(req, res) {

  var id = req.params.id;

  db.query('SELECT * FROM mybb_forums WHERE fid = ?', [id], function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};


exports.threadId = function(req, res) {

  var id = req.params.id;

  db.query('SELECT * FROM mybb_threads WHERE tid = ?', [id], function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};


exports.postId = function (req, res) {
  var id = req.params.id;

  db.query('SELECT * FROM mybb_posts WHERE tid = ?', [id], function(err, data) {
    if (err) throw err;
    // console.log(data);
    data.forEach(function(post) {
      bbcode.parse(post.message, function(msg) {
        post.message = msg;
      });
    });
    res.send(data);
  });
};
