const express = require('express');
const router = express.Router();

const questionsController = require('../../../controller/questions_controller');

router.post('/create', questionsController.create);
router.get('/view/:id', questionsController.showDetails);
router.delete('/delete/:id',questionsController.deleteQues);


router.use('/options', require('./options'));


module.exports = router;
