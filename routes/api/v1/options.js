const express = require('express');
const router = express.Router();
const optionsController = require('../../../controller/options_controller');
router.post('/:id/create', optionsController.create);
router.get('/:id/add_vote', optionsController.add_vote);
router.delete('/delete/:id',optionsController.delete);
module.exports = router;