'use strict';

// ROOT PASSWORD
// Dd28vYHJslpKZ8B9mdsvmofNHxZi

var mysql = require('mysql');

// DigitalOcean
// if (process.env.NODE_ENV === 'production') {
//
//   var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'elkmeat1',
//     database: 'mybb'
//   });
//
// }
// local
if (process.env.NODE_ENV === 'development') {

  var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'synergyBoard',
    port: 3306
  });

}
// if (process.env.NODE_ENV === 'development') {
//
//   var pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'elkmeat1',
//     database: 'mybb',
//     port: 33060
//   });
//
// }


exports.getConnection = function (callback) {
  pool.getConnection(function(err, connection ) {
    callback(err, connection);
  });
};

exports.query = function(sel, inserts, callback) {
  pool.query(sel, inserts, callback);
};
