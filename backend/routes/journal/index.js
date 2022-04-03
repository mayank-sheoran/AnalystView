const express = require('express');
const journalController = require('../../controller/journal');

const router = express.Router();

router.post('/saveToJournal', journalController.saveToJournal);
router.post('/getAllTrades', journalController.getAllTrades);

module.exports = router;
