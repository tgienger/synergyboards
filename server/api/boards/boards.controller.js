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


exports.thread = function(req, res) {

  var id = req.params.id;

  db.query('SELECT * FROM mybb_posts WHERE tid = ?', [id], function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};


/**
 * Grab thread based on thread id [tid] or post id [pid]
 * Todo: grab forums based on forum id [fid]
 */
exports.getThread = function (req, res) {
  var tid = req.query.tid;
  var pid = req.query.pid;
  var fid = req.query.fid;

  var query = '';
  var input;

  if (!pid || !isNaN(pid)) {
    query = 'SELECT * FROM synergyBoard.mybb_posts where tid = (SELECT tid FROM synergyBoard.mybb_posts WHERE pid = ?)';
    input = pid;
  } else {
    query = 'SELECT * FROM synergyBoard.mybb_posts WHERE tid = ?';
    input = tid;
  }

  db.query(query, input, function(err, data) {
    if (err) throw err;

    data.forEach(function(post) {
      bbcode.parse(post.message, function(msg) {
        post.message = msg;
      });
    });
    res.send(data);
  });
};

exports.getForum = function(req, res) {
  var fid = req.params.fid;

  if (!fid || isNaN(fid)) {
    res.send(401);
  }

  db.query('SELECT * FROM synergyBoard.mybb_threads WHERE fid = ?', fid, function(err, results) {
    if (err) throw err;
    res.send(results);
  });

};

exports.findPost = function(req, res) {

  var pid = req.query.pid;

  if (!pid || isNaN(pid))
    res.send(401);

  db.query('SELECT * FROM synergyBoard.mybb_posts where tid = (SELECT tid FROM synergyBoard.mybb_posts WHERE pid = ?', [pid], function(err, data) {
    if (err) throw err;

    res.send(data);
  });

};
