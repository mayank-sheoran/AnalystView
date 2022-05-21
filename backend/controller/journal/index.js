const { successResponse, errorResponse } = require('../../utils/response');
const { filterTradesByStrategy } = require('../../utils/filter');
const { getStrategyAnalysis } = require('../../utils/strategyAnalysis');
const JournalDB = require('../../db/journal');
const UserStrategiesDB = require('../../db/strategies');

exports.saveToJournal = (req, res) => {
  const journalData = new JournalDB(req.body);
  journalData.save().then(() => {
    successResponse(res, 'Added to Journal');
  }).catch(() => errorResponse(res, 'Failed to add in journal'));
};

exports.getAllTrades = async (req, res) => {
  const { userId } = req.body;
  JournalDB.find({ userId }, (err, userTrades) => {
    if (err) {
      errorResponse(res, 'Failed to fetch user trades');
    }
    successResponse(res, userTrades);
  });
};

exports.getAllFilteredTrades = (req, res) => {
  const {
    userId, strategiesUsed, tradeType, trade, pnlRange, pnlPercRange, bookmark,
  } = req.body;
  const strategiesArr = Object.keys(strategiesUsed);
  JournalDB.find({
    userId,
    // date: date === 'any' ? { $ne: null } : date,
    tradeType: tradeType === 'both' ? { $ne: null } : tradeType,
    trade: trade === 'both' ? { $ne: null } : trade,
    pnlPerc: { $gt: pnlPercRange[0], $lt: pnlPercRange[1] },
    pnl: { $gt: pnlRange[0], $lt: pnlRange[1] },
    bookmark,
  }, (err, userTrades) => {
    if (err) {
      errorResponse(res, 'Failed to fetch user trades');
    }
    const filteredUserTrades = filterTradesByStrategy(userTrades, strategiesArr);
    successResponse(res, filteredUserTrades);
  });
};

exports.getAllStrategies = (req, res) => {
  const { userId } = req.body;
  UserStrategiesDB.findOne({ userId }, (err, data) => {
    if (err) {
      errorResponse(res, 'Failed to fetch user strategies');
      return;
    }
    if (!data) {
      successResponse(res, []);
      return;
    }
    successResponse(res, data.strategies);
  });
};

exports.addStrategy = (req, res) => {
  const { userId, strategy } = req.body;
  UserStrategiesDB.findOne({ userId }, async (err, data) => {
    if (err) {
      errorResponse(res, 'Failed to fetch user strategies');
    }
    if (data !== null) {
      if (data.strategies.includes(strategy)) {
        errorResponse(res, 'strategy_already_exists');
        return;
      }
      UserStrategiesDB.findOneAndUpdate({ userId }, { $push: { strategies: strategy } }).then(() => successResponse(res, 'New strategy Added')).catch((error) => errorResponse(res, error));
      return;
    }
    const userStrategies = new UserStrategiesDB({ userId, strategies: [strategy] });
    userStrategies.save().then(async () => {
      successResponse(res, 'New strategy Added');
    }).catch((error) => errorResponse(res, error));
  });
};

exports.getUserStrategyAnalysis = async (req, res) => {
  const { userId, strategy } = req.body;
  try {
    const userTrades = await JournalDB.find({ userId });
    const strategyAnalysis = getStrategyAnalysis(userTrades, strategy);
    successResponse(res, strategyAnalysis);
  } catch (error) {
    errorResponse(res, error);
  }
};
