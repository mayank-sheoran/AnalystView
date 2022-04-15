export const UNIT_TYPE = {
  prefix: 'prefix',
  suffix: 'suffix',
};

export const DETAILS_MAPPING = {
  totalProfit: {
    heading: 'Total Profit',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  totalLoss: {
    heading: 'Total Loss',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  netPnl: {
    heading: 'Net Profit / Loss',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  winPerc: {
    heading: 'Win Percentage',
    unit: '%',
    unitType: UNIT_TYPE.suffix,
  },
  lossPerc: {
    heading: 'Lose Percentage',
    unit: '%',
    unitType: UNIT_TYPE.suffix,
  },
  stratCount: {
    heading: 'Strategy Count',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgProfitPerTrade: {
    heading: 'Average Profit Per Trade',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgLossPerTrade: {
    heading: 'Average Loss Per Trade',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgR2R: {
    heading: 'Average Risk To Reward Ratio',
    unit: '',
  },
};
