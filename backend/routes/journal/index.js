const express = require('express');
const journalController = require('../../controller/journal');

const router = express.Router();

router.post('/saveToJournal', journalController.saveToJournal);
router.post('/addStrategy', journalController.addStrategy);
router.post('/getAllTrades', journalController.getAllTrades);
router.post('/getAllFilteredTrades', journalController.getAllFilteredTrades);
router.post('/getAllStrategies', journalController.getAllStrategies);

module.exports = router;
