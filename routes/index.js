const express = require('express');
const router = express.Router();
const questionController = require('../controller/questions_controller');

console.log('router loaded');

router.get('/', questionController.home);

// this is the entry point of all the api named urls
router.use('/api', require('./api/index'));

module.exports = router;