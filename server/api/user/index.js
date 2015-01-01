'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.userId);
router.get('/search/:username', controller.userName);

module.exports = router;
