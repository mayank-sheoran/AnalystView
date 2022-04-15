/* eslint-disable arrow-body-style */
const { TRADE, TRADE_TYPE } = require('../enums/journal');

const filterTradesByStrategy = (userTrades, strategy) => {
  return userTrades.filter((trade) => {
    return trade.strategiesUsed.includes(strategy);
  });
};

const filterTradesByTradeType = (userTrades) => {
  const paperTrades = userTrades.filter((trade) => {
    return trade.tradeType === TRADE_TYPE.PAPER_TRADE;
  });
  const realTrades = userTrades.filter((trade) => {
    return trade.tradeType === TRADE_TYPE.REAL_TRADE;
  });
  return { realTrades, paperTrades };
};

const getAnalysis = (userTrades) => {
  let totalProfit = 0; let totalLoss = 0;
  let avgRewardPerc = 0; let avgRiskPerc = 0;
  const stratCount = userTrades.length; let wins = 0;
  userTrades.forEach((userTrade) => {
    const { trade, pnl, pnlPerc } = userTrade;
    if (trade === TRADE.PROFIT) {
      totalProfit += pnl;
      avgRewardPerc += pnlPerc;
      wins += 1;
    } else {
      totalLoss += pnl;
      avgRiskPerc += pnlPerc;
    }
  });
  return {
    totalProfit,
    totalLoss,
    netPnl: totalProfit - totalLoss,
    winPerc: 100 * (wins / stratCount),
    lossPerc: 100 - (100 * (wins / stratCount)),
    stratCount,
    avgProfitPerTrade: totalProfit / stratCount,
    avgLossPerTrade: totalLoss / stratCount,
    avgR2R: avgRiskPerc / avgRewardPerc,
  };
};

const getStrategyAnalysis = (userTrades, strategy) => {
  const filteredTrades = filterTradesByStrategy(userTrades, strategy);
  const { realTrades, paperTrades } = filterTradesByTradeType(filteredTrades);
  return {
    realTrades: getAnalysis(realTrades),
    paperTrades: getAnalysis(paperTrades),
    both: getAnalysis(filteredTrades),
  };
};

module.exports = { getStrategyAnalysis };
