const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse } = require('../../utils/response');
const JournalDB = require('../../db/journal');

exports.saveToJournal = (req, res) => {
  const {
    userId,
    date,
    strategy,
    tradeType,
    trade,
    amount,
    percentage,
    description,
    bookmark,
  } = req;
  const journalData = new JournalDB({
    userId,
    tradeId: uuidv4(),
    date,
    strategy,
    tradeType,
    trade,
    amount,
    percentage,
    description,
    bookmark,
  });
  journalData.save().then(() => {
    successResponse(res, 'Added to Journal');
  }).catch(() => errorResponse(res, 'Failed to add in journal'));
};

exports.getAllTrades = (req, res) => {
  const { userId } = req;
  JournalDB.find({ userId }, (err, userTrades) => {
    if (err) {
      errorResponse(res, 'Failed to fetch user trades');
    }
    successResponse(res, userTrades);
  });
};
