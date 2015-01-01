'use strict';

var express = require('express');
var controller = require('./boards.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.id);
router.get('/threads', controller.threads);
router.get('/threads/:id', controller.threadId);

module.exports = router;
