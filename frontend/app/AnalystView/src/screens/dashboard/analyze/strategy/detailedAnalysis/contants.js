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
    heading: 'Win %',
    unit: '%',
    unitType: UNIT_TYPE.suffix,
  },
  lossPerc: {
    heading: 'Lose %',
    unit: '%',
    unitType: UNIT_TYPE.suffix,
  },
  stratCount: {
    heading: 'Strategy Count',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgProfitPerTrade: {
    heading: 'Average Profit / Trade',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgLossPerTrade: {
    heading: 'Average Loss / Trade',
    unit: '',
    unitType: UNIT_TYPE.prefix,
  },
  avgR2R: {
    heading: 'Average R2R Ratio',
    unit: '',
  },
};
