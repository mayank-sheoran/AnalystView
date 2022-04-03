const { successResponse, errorResponse } = require('../../utils/response');
const JournalDB = require('../../db/journal');

exports.saveToJournal = (req, res) => {
  const journalData = new JournalDB(req.body);
  journalData.save().then(() => {
    successResponse(res, 'Added to Journal');
  }).catch((err) => errorResponse(res, err));
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
