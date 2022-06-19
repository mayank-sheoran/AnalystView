const express = require('express');
const errorHandlingController = require('../../controller/error_handling');

const router = express.Router();

router.post('/saveError', errorHandlingController.saveError);

module.exports = router;
