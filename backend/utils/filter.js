/* eslint-disable arrow-body-style */
const filterTradesByStrategy = (allTrades, neededStrategies) => {
  return allTrades.filter((trade) => {
    return neededStrategies.every((strategy) => trade.strategiesUsed.includes(strategy));
  });
};

module.exports = { filterTradesByStrategy };
